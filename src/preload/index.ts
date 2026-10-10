import { contextBridge, ipcRenderer } from 'electron'

export interface AppInfo {
  name: string
  version: string
  platform: NodeJS.Platform
  electron: string
}

contextBridge.exposeInMainWorld('agentForge', {
  getAppInfo: (): Promise<AppInfo> => ipcRenderer.invoke('app:get-info')
})
