/// <reference types="vite/client" />

import type { AppInfo } from '../../preload'

declare global {
  interface Window {
    agentForge: {
      getAppInfo: () => Promise<AppInfo>
    }
  }
}

export {}
