import { IPluginConfig } from './@Types'
import { skipTitle, disableDash, disableMouse, forceCanvas, skipModifyZIndex } from './core-plugins'

export namespace pluginManager {
  export const plugins: Array<() => void> = []

  export function add(...args: Array<() => void>) {
    args.forEach(e => plugins.push(e))
  }

  export function setup(options: IPluginConfig = {}) {
    PluginManager.setup($plugins)
    if (options.skipTitle) add(skipTitle)
    if (options.disableDash) add(disableDash)
    if (options.disableMouse) add(disableMouse)
    if (options.forceCanvas) add(forceCanvas)
    if (options.skipModifyZIndex) add(skipModifyZIndex)
    plugins.forEach(e => e())
  }
}
