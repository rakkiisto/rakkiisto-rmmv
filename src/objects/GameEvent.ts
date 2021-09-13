import { vector, Vector } from 'rakkiisto-vector'
import { gameMap } from '../static'

export class GameEvent {
  static all(tag?: string): GameEvent[] {
    if (tag) return this.all().filter(ev => ev.note.includes(tag))
    return $gameMap.events().map(ev => new GameEvent(ev))
  }
  static fromId(id: number): GameEvent {
    return this.all().filter(ev => ev.id === id)[0]
  }
  constructor(public event: Game_Event) {}

  xy(): vector {
    return Vector([this.event.x, this.event.y])
  }
  realXY(): vector {
    const _event = this.event as any
    return Vector([_event._realX, _event._realY])
  }

  /** returns true if coords (rounded) equals to x y */
  match(x: number, y: number) {
    return this.x === x && this.y === y
  }

  get x() {
    return this.event.x
  }
  get y() {
    return this.event.y
  }

  get id() {
    return this.event.eventId()
  }
  get name() {
    return $dataMap.events[this.id].name
  }
  get note() {
    return $dataMap.events[this.id].note
  }

  get A(): boolean {
    return $gameSelfSwitches.value([$gameMap.mapId(), this.id, 'A'])
  }
  set A(value: boolean) {
    $gameSelfSwitches.setValue([$gameMap.mapId(), this.id, 'A'], value)
  }
  get B(): boolean {
    return $gameSelfSwitches.value([$gameMap.mapId(), this.id, 'B'])
  }
  set B(value: boolean) {
    $gameSelfSwitches.setValue([$gameMap.mapId(), this.id, 'B'], value)
  }
  get C(): boolean {
    return $gameSelfSwitches.value([$gameMap.mapId(), this.id, 'C'])
  }
  set C(value: boolean) {
    $gameSelfSwitches.setValue([$gameMap.mapId(), this.id, 'C'], value)
  }
  get D(): boolean {
    return $gameSelfSwitches.value([$gameMap.mapId(), this.id, 'D'])
  }
  set D(value: boolean) {
    $gameSelfSwitches.setValue([$gameMap.mapId(), this.id, 'D'], value)
  }

  fadeTo(to: number, time = 60) {
    const fr = this.event.opacity()
    let t = 0
    const handler = () => {
      t++
      this.event.setOpacity(lerp(fr, to, t / time))
      if (t >= time) {
        this.event.setOpacity(to)
        gameMap.removeUpdate(handler)
      }
    }
    gameMap.onUpdate(handler)
  }
  fadeIn(time = 60) {
    this.fadeTo(255, time)
  }
  fadeOut(time = 60) {
    this.fadeTo(0, time)
  }

  async jump(dx: number, dy: number) {
    this.event.jump(dx, dy)
    await gameMap.flag(() => !this.event.isJumping())
  }
  async moveForward() {
    this.event.moveForward()
    await gameMap.flag(() => !this.event.isMoving())
  }
  async moveTowardPlayer() {
    this.event.moveTowardPlayer()
    await gameMap.flag(() => !this.event.isMoving())
  }
}

/**
 * @param fr init value
 * @param to final value
 * @param r 0.0 to 1.0
 */
function lerp(fr: number, to: number, r = 0.5) {
  return fr + (to - fr) * r
}
