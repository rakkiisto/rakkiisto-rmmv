import { pluginManager } from './plugins'
import { IRuntimeConfig } from './plugins/@Types'
import { gameCoords, gameMap, gamePlayer } from './static'

export namespace RakkiistoMV {
  export function setupStatic() {
    gameCoords.setup()
    gameMap.setup()
    gamePlayer.setup()
  }

  export function run(options: IRuntimeConfig = {}) {
    PIXI.utils.skipHello()
    setupStatic()
    pluginManager.setup(options)
    //@ts-ignore
    SceneManager.run(Scene_Boot)
    if (options.showFpsByDefault) gameMap.onStart(() => Graphics.showFps())
  }
}
