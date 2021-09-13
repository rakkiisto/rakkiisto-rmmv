import { pluginManager } from '../plugins'

export namespace gameMap {
  //#region displayXY(camera)
  export function displayXY(): [number, number]
  export function displayXY(x: number, y: number): void
  export function displayXY(x?: number, y?: number): void | [number, number] {
    const _$gameMap = $gameMap as any
    if (x && y) {
      _$gameMap._displayX = x
      _$gameMap._displayY = y
    } else return [_$gameMap._displayX, _$gameMap._displayY]
  }
  //#endregion

  //#region asynctools (gameMapListeners)

  type eventListener = () => void
  type callback = (...args: any[]) => void

  export const startListeners: eventListener[] = []
  export const updateListeners: eventListener[] = []

  export const onStart = (listener: eventListener) => startListeners.push(listener)
  export const onUpdate = (listener: eventListener) => updateListeners.push(listener)
  export const removeStart = (listener: eventListener) =>
    startListeners.splice(startListeners.indexOf(listener), 1)
  export const removeUpdate = (listener: eventListener) =>
    updateListeners.splice(updateListeners.indexOf(listener), 1)

  export async function timeout(callback: callback, tick = 60, args?: any[]) {
    return new Promise<void>(resolve => {
      const handler = () => {
        tick--
        if (tick <= 0) {
          args ? callback(...args) : callback()
          removeUpdate(handler)
          resolve()
        }
      }
      onUpdate(handler)
    })
  }

  export async function interval(callback: callback, t = 60, terminator?: () => boolean) {
    let tick = t
    if (terminator) {
      return new Promise<void>(resolve => {
        const handler = () => {
          tick--
          if (tick <= 0) {
            callback()
            tick = t
            if (terminator()) {
              removeUpdate(handler)
              resolve()
            }
          }
        }
        onUpdate(handler)
      })
    } else {
      const handler = () => {
        tick--
        if (tick <= 0) {
          callback()
          tick = t
        }
      }
      onUpdate(handler)
      return handler
    }
  }

  /** callbackがtrueを返すまでawait */
  export async function flag(callback: () => boolean, t = 1) {
    return interval(() => {}, t, callback)
  }

  export async function delay(frame: number) {
    return timeout(() => {}, frame)
  }
  //#endregion

  /** call this */
  export function setup() {
    pluginManager.add(() => {
      var Game_Map_prototype_setup = Game_Map.prototype.setup
      Game_Map.prototype.setup = function (mapId) {
        Game_Map_prototype_setup.call(this, mapId)
        startListeners.forEach(f => f())
      }

      var Scene_Map_prototype_update = Scene_Map.prototype.update
      Scene_Map.prototype.update = function () {
        Scene_Map_prototype_update.apply(this, arguments)
        updateListeners.forEach(f => f())
      }
    })
  }
}
