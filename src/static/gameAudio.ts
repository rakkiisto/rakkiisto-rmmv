export namespace gameAudio {
  export function playBgm(name: string, volume = 90, pitch = 100, pan = 0) {
    return AudioManager.playBgm({ name, volume, pitch, pan } as any)
  }
  export function fadeOutBgm(time = 1) {
    return AudioManager.fadeOutBgm(time)
  }
  export const saveBgm = () => $gameSystem.saveBgm()
  export const replayBgm = () => $gameSystem.replayBgm()

  export function playSe(name: string, volume = 90, pitch = 100, pan = 0) {
    return AudioManager.playSe({ name, volume, pitch, pan } as any)
  }
  export function stopSe() {
    return AudioManager.stopSe()
  }
}
