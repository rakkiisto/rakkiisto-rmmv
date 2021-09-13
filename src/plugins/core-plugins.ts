export const skipTitle = () => {
  Scene_Boot.prototype.start = function () {
    Scene_Base.prototype.start.call(this)
    SoundManager.preloadImportantSounds()
    this.checkPlayerLocation()
    DataManager.setupNewGame()
    SceneManager.goto(Scene_Map)
    //   Window_TitleCommand.initCommandPosition()
    this.updateDocumentTitle()
  }
}

export const forceCanvas = () => {
  SceneManager.preferableRendererType = function () {
    return 'canvas'
  }
}

export const skipModifyZIndex = () => {
  Graphics._modifyExistingElements = function () {
    return
  }
}

export const disableDash = () => {
  Game_Map.prototype.isDashDisabled = function () {
    return true
  }
}

export const disableMouse = () => {
  Game_Temp.prototype.setDestination = function (x, y) {
    return
  }
}
