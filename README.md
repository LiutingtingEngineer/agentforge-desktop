# AgentForge Desktop

An open-source Electron desktop workbench for learning and building AI coding agents.

AgentForge Desktop is an educational project inspired by modern agent workbenches such as the Codex desktop app. It does not contain or redistribute OpenAI's proprietary desktop source code and is not affiliated with OpenAI.

## Current milestone

The first milestone establishes a small but production-shaped desktop foundation:

- Electron main process with native window lifecycle
- React + TypeScript renderer powered by Vite
- sandboxed preload script and a typed, narrow IPC bridge
- Codex-inspired static workbench shell
- cross-platform installer configuration with electron-builder
- architecture notes for learning each layer

The task list and composer are visual placeholders. AI execution, terminal, Git, worktrees and persistence will be added incrementally.

## Quick start

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Build the application:

```bash
npm run build
```

Create an unpacked app for fast packaging verification:

```bash
npm run package:dir
```

Create an installer for the current platform:

```bash
npm run package
```

On macOS, `npm run package:mac` creates a DMG under `release/`. Local unsigned builds are suitable for learning and testing; public distribution later requires Apple code signing and notarization.

## Architecture

```text
src/
├── main/       Electron main process: windows, OS access, IPC handlers
├── preload/    secure bridge: exposes a minimal typed API
└── renderer/   React UI: no direct Node.js or Electron access
```

Read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the process model, security boundaries and packaging flow.

## Roadmap

1. Desktop shell and packaging
2. Local workspace selection and persistence
3. Terminal process and streaming output
4. Git status, diffs and worktrees
5. Codex `app-server` integration
6. Multiple tasks, permissions and approval UI
7. Automated tests, signing, releases and updates

## License

MIT
