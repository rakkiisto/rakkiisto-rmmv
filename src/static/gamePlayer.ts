import { vector, Vector } from 'rakkiisto-vector'
import { pluginManager } from '../plugins'

export namespace gamePlayer {
  //#region canmove

  /** set this to false will prevent arrow moves */
  export var moveByInput = true
  /** call this at least once */
  export function setup() {
    pluginManager.add(() => {
      var Game_Player_prototype_canMove = Game_Player.prototype.canMove
      Game_Player.prototype.canMove = function () {
        return Game_Player_prototype_canMove.apply(this, arguments) && moveByInput
      }
    })
  }

  //#endregion

  export function xy(): vector {
    return Vector([$gamePlayer.x, $gamePlayer.y])
  }
  export function realXY(): vector {
    const _$gamePlayer = $gamePlayer as any
    return Vector([_$gamePlayer._realX, _$gamePlayer._realY])
  }
}
