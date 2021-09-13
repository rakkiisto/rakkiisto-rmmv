export interface IPluginConfig {
  skipTitle?: boolean
  disableDash?: boolean
  disableMouse?: boolean
  forceCanvas?: boolean
  skipModifyZIndex?: boolean
}

export interface IRuntimeConfig extends IPluginConfig {
  showFpsByDefault?: boolean
}
