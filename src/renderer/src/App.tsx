import { useEffect, useState } from 'react'
import {
  Archive,
  CaretDown,
  ChatCircleDots,
  CheckCircle,
  Code,
  GearSix,
  GitBranch,
  House,
  Plus,
  SidebarSimple,
  Sparkle,
  TerminalWindow
} from '@phosphor-icons/react'
import type { AppInfo } from '../../preload'

const tasks = [
  { title: '搭建 Electron 桌面框架', meta: '刚刚', active: true },
  { title: '梳理主进程与 IPC', meta: '学习笔记', active: false },
  { title: '规划终端模块', meta: '待开始', active: false }
]

function App(): React.JSX.Element {
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null)

  useEffect(() => {
    void window.agentForge.getAppInfo().then(setAppInfo)
  }, [])

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="drag-region" />
        <div className="brand-row">
          <div className="brand-mark"><Sparkle weight="fill" /></div>
          <span>AgentForge</span>
          <button className="icon-button" aria-label="收起侧边栏"><SidebarSimple /></button>
        </div>

        <button className="new-task"><Plus weight="bold" /> 新建任务</button>

        <nav className="primary-nav" aria-label="主导航">
          <a className="nav-item active" href="#home"><House /> 首页</a>
          <a className="nav-item" href="#automations"><TerminalWindow /> 自动任务</a>
          <a className="nav-item" href="#skills"><Code /> 技能</a>
        </nav>

        <div className="section-heading"><span>最近任务</span><CaretDown /></div>
        <div className="task-list">
          {tasks.map((task) => (
            <button className={`task-item ${task.active ? 'active' : ''}`} key={task.title}>
              <span>{task.title}</span><small>{task.meta}</small>
            </button>
          ))}
        </div>

        <div className="sidebar-footer">
          <button className="nav-item"><Archive /> 已归档</button>
          <button className="nav-item"><GearSix /> 设置</button>
          <div className="profile"><span>LT</span><div><strong>Local workspace</strong><small>学习模式</small></div></div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div><strong>AgentForge Desktop</strong><span className="status-dot">本地</span></div>
          <button className="branch-button"><GitBranch /> main <CaretDown /></button>
        </header>

        <div className="content">
          <div className="hero">
            <div className="hero-icon"><ChatCircleDots weight="duotone" /></div>
            <p className="eyebrow">OPEN-SOURCE AGENT WORKBENCH</p>
            <h1>今天想构建什么？</h1>
            <p className="subtitle">这是 AgentForge 的第一阶段：一个安全、可打包、便于逐步学习的 Electron 桌面框架。</p>
          </div>

          <section className="composer">
            <textarea aria-label="任务内容" placeholder="描述一个任务，AgentForge 将在你的本地工作区中处理……" />
            <div className="composer-footer">
              <div><button>Agent <CaretDown /></button><button>工作区 <CaretDown /></button></div>
              <button className="send-button"><Plus /></button>
            </div>
          </section>

          <section className="learning-card">
            <div className="learning-title"><CheckCircle weight="fill" /><div><strong>桌面框架已连接</strong><p>Renderer 已通过安全的 Preload Bridge 读取主进程信息。</p></div></div>
            <div className="info-grid">
              <div><span>应用版本</span><strong>{appInfo?.version ?? '读取中…'}</strong></div>
              <div><span>Electron</span><strong>{appInfo?.electron ?? '读取中…'}</strong></div>
              <div><span>平台</span><strong>{appInfo?.platform ?? '读取中…'}</strong></div>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default App
