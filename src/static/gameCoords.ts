import { V, Vector } from 'rakkiisto-vector'
import { pluginManager } from '../plugins'

export type C = [number, number]
export type coords = C | V | (() => C | V)
export * from 'rakkiisto-vector'

/** call gameCoords.setup() at least once */
export namespace gameCoords {
  export var canvasX = 0
  export var canvasY = 0
  export var canvas: HTMLElement

  type box = [number, number, number, number]
  export const box = (): box => [canvasX, canvasY, Graphics.boxWidth, Graphics.boxHeight]
  export const onResize = () => ([canvasX, canvasY] = [canvas.offsetLeft, canvas.offsetTop])

  /** call gameCoords.setup() at least once */
  export function setup() {
    pluginManager.add(() => {
      var Graphics_createCanvas = Graphics._createCanvas
      Graphics._createCanvas = function () {
        Graphics_createCanvas.apply(this, arguments)
        canvas = document.getElementById('GameCanvas')!
        onResize()
        window.addEventListener('resize', onResize)
      }
    })
  }

  export function parse(coords: coords): C {
    if (typeof coords === 'function') return parse(coords())
    if (coords instanceof Array) return coords
    return Vector(coords).spread()
  }
  export function screenXY(coords: coords, topleft = false): C {
    const [x, y] = parse(coords)
    const d = topleft ? 0 : 0.5
    return [(x - $gameMap.displayX() + d) * 48, (y - $gameMap.displayY() + d) * 48]
  }
}

// var gameCoords: GameCoords
// class GameCoords {
//   constructor() {}
//
//   getPlayerCenter(offsetX = 0, offsetY = 0): [number, number] {
//     return [
//       $gamePlayer.screenX() + this.offsetX - offsetX,
//       $gamePlayer.screenY() - 24 + 5 + this.offsetY - offsetY,
//     ]
//   }
//
//   screenTileXY(x: number, y: number): [number, number] {
//     return [x * 48 + this.offsetX, y * 48 + this.offsetY]
//   }
//
//   getPlayerPos(): [number, number] {
//     return [$gamePlayer.x, $gamePlayer.y]
//   }
//   getPlayerFront(): [number, number] {
//     const [x, y] = this.getPlayerPos()
//     switch ($gamePlayer.direction()) {
//       case 2:
//         return [x, y + 1]
//       case 4:
//         return [x - 1, y]
//       case 6:
//         return [x + 1, y]
//       case 8:
//       default:
//         return [x, y - 1]
//     }
//   }
//   getPlayerNearRange(): [number, number] {
//     const [x, y] = this.getPlayerPos()
//     switch (Math.randomInt(4)) {
//       case 0:
//         return [x, y + 1]
//       case 1:
//         return [x - 1, y]
//       case 2:
//         return [x + 1, y]
//       case 3:
//       default:
//         return [x, y - 1]
//     }
//   }
//
//   screen2tile(x: number, y: number) {
//     return [Math.floor((x - this.offsetX) / 48), Math.floor((y - this.offsetY) / 48)]
//   }
//
//   getPlayerDistance(x: number, y: number) {
//     return Math.sqrt(($gamePlayer.x - x) ** 2 + ($gamePlayer.y - y) ** 2)
//   }
//
//   getGamemapScreenOrigin(): [number, number] {
//     return [this.offsetX - $gameMap.displayX() * 48, this.offsetY - $gameMap.displayY() * 48]
//   }
//
//   gamePlayerXY(rounded = false): [number, number] {
//     if (rounded) return [$gamePlayer.x, $gamePlayer.y]
//     //@ts-ignore
//     return [$gamePlayer._realX, $gamePlayer._realY]
//   }
//
//   screenXY(coords: coords, topleft = false): C {
//     const [x, y] = this.unpack(coords)
//     const d = topleft ? 0 : 0.5
//     return [(x - $gameMap.displayX() + d) * 48, (y - $gameMap.displayY() + d) * 48]
//   }
// }
