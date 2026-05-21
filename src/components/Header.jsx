import { useHermesStore } from '../store/useHermesStore';

export function Header() {
  const { systemStatus, getActiveProject } = useHermesStore();
  const project = getActiveProject();

  return (
    <header className="border-b border-line">
      {/* Top nav strip */}
      <div className="flex items-center justify-between px-6 lg:px-10 py-4">
        <div>
          <div className="serif text-foreground text-lg leading-none">HERMES.AGENT</div>
          <div className="label mt-1">WORK STATION / V1</div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.18em] uppercase mono">
          <a href="#workstation" className="text-foreground hover:text-crimson">Workstation</a>
          <a href="#projects" className="text-muted hover:text-crimson">Projects</a>
          <a href="#logs" className="text-muted hover:text-crimson">Logs</a>
        </nav>

        <div className="text-right">
          <div className="label flex items-center justify-end gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-crimson pulse-dot" />
            <span className="text-crimson">LIVE ENVIRONMENT</span>
          </div>
          <div className="label mt-1">PALAWAN, PHILIPPINES</div>
        </div>
      </div>

      {/* Asset / status bar */}
      <div className="grid grid-cols-12 gap-4 px-6 lg:px-10 py-5 border-t border-line bg-surface/40">
        {/* Left — asset metadata */}
        <div className="col-span-12 lg:col-span-5 mono text-[11px] leading-relaxed">
          <div>
            <span className="text-muted">ASSET_ID</span>{' '}
            <span className="text-foreground">2026_HRM_{(project?.id || 'XXXX').slice(0, 6).toUpperCase()}</span>
          </div>
          <div>
            <span className="text-muted">/PROCESS/</span>
            <span className="text-foreground">V01</span>
          </div>
          <div>
            <span className="text-muted">/PROJECT/</span>
            <span className="text-foreground">{(project?.name || 'NONE').toUpperCase()}</span>
          </div>
          <div>
            <span className="text-muted">/STATUS/</span>
            <span className="text-crimson">{project?.status || 'IDLE'}</span>
          </div>
        </div>

        {/* Right — system status block */}
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <div className="border border-line p-3 mono text-[11px] bg-surface">
            <div className="text-foreground mb-2">
              <span className="text-crimson">SYSTEM</span> STATUS
            </div>
            {Object.entries(systemStatus).map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="text-muted uppercase">{k}</span>
                <span>
                  : <span className="text-foreground">{v}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
