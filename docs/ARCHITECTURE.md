# Architecture notes

This document turns the first milestone into a learning map rather than hiding everything inside a scaffold.

## 1. Electron process model

AgentForge has three JavaScript execution contexts:

```text
Renderer (React UI)
        │ window.agentForge.getAppInfo()
        ▼
Preload (contextBridge)
        │ ipcRenderer.invoke("app:get-info")
        ▼
Main process (Electron + Node.js)
```

### Main process

`src/main/index.ts` owns the application lifecycle and creates `BrowserWindow`. It is trusted code with Node.js and operating-system access. Future file, Git, terminal and database operations belong here or in services called from here.

### Preload

`src/preload/index.ts` is the security boundary. It exposes individual capabilities instead of forwarding the entire `ipcRenderer`. Each new renderer capability should have a small typed method, validated arguments and a matching main-process handler.

### Renderer

`src/renderer` is an ordinary React application. `nodeIntegration` is disabled, context isolation is enabled and the renderer is sandboxed. Treat renderer input as untrusted even though the files are local.

## 2. Development flow

Electron Forge starts the application and coordinates its Vite plugin. The plugin runs three build targets:

1. the Electron main process;
2. the sandboxed preload script;
3. the React renderer, served by Vite with hot reload during development.

During development, Forge injects `MAIN_WINDOW_VITE_DEV_SERVER_URL`. A packaged build loads the renderer generated under `.vite/renderer/main_window`. The generated `.vite` directory is an implementation detail and is not committed.

## 3. Packaging flow

```text
TypeScript typecheck
        ↓
Electron Forge Vite plugin
        ↓
.vite/build + .vite/renderer
        ↓
Electron Forge Packager
        ↓
Electron Forge Makers
        ↓
DMG + ZIP (macOS) / Squirrel (Windows) / DEB + RPM (Linux)
```

`forge.config.ts` is the single packaging entry point. It configures Electron Packager, platform-specific Makers, Vite builds and Electron security fuses. The first milestone intentionally produces unsigned local packages. Signing, notarization, CI releases and automatic updates are separate concerns and should be learned after local packaging is stable.

Electron Forge is maintained by the Electron ecosystem and is the packaging tool recommended by Electron's official documentation. Its Vite plugin is currently marked experimental, so all Forge packages are pinned to the same exact version to avoid surprise upgrades.

## 4. Why React

Electron does not require a specific UI framework. React is used because installation-package analyses of the current Codex desktop renderer point to React and React-oriented UI libraries, and because it has a strong ecosystem for editors, terminals and complex workbench interfaces. AgentForge remains an independent implementation.

## 5. Planned boundaries

- Workspace API: select, validate and remember local project folders.
- Terminal service: own `node-pty` in the main process; stream scoped output through IPC.
- Git service: execute allowlisted Git operations and return structured data.
- Agent adapter: communicate with Codex `app-server` over its documented protocol.
- Persistence: store UI preferences separately from agent conversation data.
- Approval model: renderer requests an operation; main process validates scope before execution.

Keeping these boundaries explicit prevents the React UI from becoming a privileged monolith.
