import { useHermesStore } from '../store/useHermesStore';
import {
  ArrowUpRight,
  CheckCircle2,
  Circle,
  Loader2,
  Cpu,
  Github,
  ExternalLink,
  Globe,
  Target,
  ImageIcon,
} from 'lucide-react';

function ProgressBar({ value }) {
  return (
    <div className="w-full bg-line h-1.5 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-crimson via-crimson-bright to-gold transition-all duration-1000 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function TaskIcon({ status }) {
  if (status === 'done')
    return <CheckCircle2 className="w-3.5 h-3.5 text-crimson shrink-0" />;
  if (status === 'in-progress')
    return <Loader2 className="w-3.5 h-3.5 text-gold shrink-0 animate-spin" />;
  return <Circle className="w-3.5 h-3.5 text-muted shrink-0" />;
}

function StatusBadge({ status }) {
  const map = {
    done: { label: 'DONE', cls: 'border-crimson/60 text-crimson' },
    'in-progress': { label: 'IN PROGRESS', cls: 'border-gold/60 text-gold' },
    todo: { label: 'TODO', cls: 'border-line-soft text-muted' },
  };
  const v = map[status] || map.todo;
  return (
    <span className={`mono text-[9px] tracking-[0.14em] uppercase px-1.5 py-0.5 border ${v.cls}`}>
      {v.label}
    </span>
  );
}

export function HermesWorkArea() {
  const project = useHermesStore((s) => s.getActiveProject());

  if (!project) {
    return (
      <section className="px-6 lg:px-10 py-12">
        <div className="text-center text-muted">No project selected. Add one from the admin panel.</div>
      </section>
    );
  }

  return (
    <section id="workstation" className="px-6 lg:px-10 pt-10 pb-6">
      {/* Section header */}
      <div className="border-t border-line pt-5">
        <div className="grid grid-cols-12 gap-3 items-end pb-5">
          <div className="col-span-12 lg:col-span-6">
            <div className="label flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-crimson pulse-dot" />
              <span className="text-crimson">/ WORKING AREA</span>
            </div>
            <h2 className="serif text-3xl md:text-4xl text-foreground mt-1.5 leading-tight">
              HERMES AGENT WORK STATION
            </h2>
            <p className="text-muted text-[11px] uppercase tracking-[0.1em] mt-2 max-w-xl mono">
              Live development zone — Hermes Agent ships interfaces, user flows, and experimental webapps with your team in real time.
            </p>
          </div>

          {/* Stage label */}
          <div className="hidden lg:block col-span-3 mono text-[10px] uppercase tracking-[0.14em] text-muted leading-relaxed text-right">
            <div>DEVELOPMENT</div>
            <div className="text-crimson mt-0.5">{project.stage}</div>
          </div>

          {/* Progress */}
          <div className="hidden lg:flex col-span-3 items-center gap-3 justify-end">
            <div className="mono text-[10px] uppercase tracking-[0.14em] text-muted text-right">
              <div>PROGRESS</div>
              <div className="text-foreground">{project.progress}%</div>
            </div>
            <div className="w-32">
              <ProgressBar value={project.progress} />
            </div>
          </div>
        </div>

        {/* Main grid: Stage card + 3 preview cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* Stage card */}
          <div className="corner border border-line p-5 relative bg-surface/40 min-h-[280px] flex flex-col">
            <span className="c1" /><span className="c2" />
            <div className="flex items-start gap-3 mb-5">
              <Cpu className="w-5 h-5 text-crimson mt-0.5 shrink-0" />
              <div>
                <div className="label">CURRENT STAGE</div>
                <div className="text-foreground text-xs uppercase tracking-[0.1em] mt-0.5 mono">
                  {project.stage}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-end mb-2">
                <span className="label">OVERALL PROGRESS</span>
                <span className="mono text-[11px] text-foreground">{project.progress}%</span>
              </div>
              <ProgressBar value={project.progress} />
            </div>

            <div className="mt-auto pt-3 border-t border-line">
              <div className="label">NEXT MILESTONE</div>
              <div className="text-foreground text-xs uppercase tracking-[0.1em] flex items-center gap-1.5 mt-1 mono">
                {project.nextMilestone || '—'}
                <ArrowUpRight className="w-3 h-3 text-crimson" />
              </div>
            </div>
          </div>

          {/* Goal card */}
          <div className="corner border border-line p-5 relative bg-surface/40 min-h-[280px] flex flex-col">
            <span className="c1" /><span className="c2" />
            <div className="flex items-start gap-3 mb-4">
              <Target className="w-5 h-5 text-gold mt-0.5 shrink-0" />
              <div>
                <div className="label">PROJECT GOAL</div>
                <div className="text-foreground text-xs uppercase tracking-[0.1em] mt-0.5 mono">
                  {project.name}
                </div>
              </div>
            </div>
            <p className="text-foreground/90 text-sm leading-relaxed serif">
              {project.goal || 'No goal set. Open admin to add one.'}
            </p>
            {project.tagline && (
              <div className="mt-auto pt-3 border-t border-line label text-gold/80">
                {project.tagline}
              </div>
            )}
          </div>

          {/* Screenshot / live preview card */}
          <div className="corner border border-line relative bg-surface/40 min-h-[280px] flex flex-col overflow-hidden">
            <span className="c1" /><span className="c2" />
            <div className="flex-1 bg-bg flex items-center justify-center overflow-hidden relative scanlines">
              {project.screenshot ? (
                <img
                  src={project.screenshot}
                  alt={`${project.name} preview`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-6">
                  <ImageIcon className="w-10 h-10 text-crimson/30 mx-auto mb-2" />
                  <div className="label">NO SCREENSHOT</div>
                  <div className="label text-[9px] text-muted mt-1">UPLOAD VIA ADMIN</div>
                </div>
              )}
            </div>
            <div className="p-3 border-t border-line">
              <div className="label">LIVE PREVIEW</div>
              <div className="text-foreground text-[11px] flex items-center gap-1.5 mono uppercase">
                {project.liveUrl ? (
                  <>
                    DEPLOYED <span className="inline-block w-1.5 h-1.5 rounded-full bg-crimson pulse-dot" />
                  </>
                ) : (
                  <span className="text-muted">NOT DEPLOYED</span>
                )}
              </div>
            </div>
          </div>

          {/* Links card */}
          <div className="corner border border-line p-5 relative bg-surface/40 min-h-[280px] flex flex-col">
            <span className="c1" /><span className="c2" />
            <div className="label mb-4">RESOURCES</div>

            <div className="space-y-2.5 mono text-[11px]">
              <ResourceLink
                icon={<Github className="w-3.5 h-3.5" />}
                label="GITHUB REPO"
                href={project.githubUrl}
              />
              <ResourceLink
                icon={<ExternalLink className="w-3.5 h-3.5" />}
                label="VERCEL DEPLOY"
                href={project.vercelUrl}
              />
              <ResourceLink
                icon={<Globe className="w-3.5 h-3.5" />}
                label="LIVE URL"
                href={project.liveUrl}
              />
            </div>

            <div className="mt-auto pt-3 border-t border-line">
              <div className="label">STATUS</div>
              <div className="text-crimson text-xs mono uppercase tracking-[0.1em] mt-1">
                {project.status || 'BUILDING'}
              </div>
            </div>
          </div>
        </div>

        {/* Task table */}
        <div className="border border-line mt-3 bg-surface/30">
          <div className="grid grid-cols-12 gap-3 items-center px-4 py-2.5 border-b border-line bg-surface label text-[9px]">
            <div className="col-span-7 md:col-span-8">TASK</div>
            <div className="col-span-3 md:col-span-2">STATUS</div>
            <div className="col-span-2 text-right">STAGE</div>
          </div>
          {project.tasks.length === 0 ? (
            <div className="px-4 py-6 text-center text-muted text-xs mono">
              No tasks yet — add some from the admin panel.
            </div>
          ) : (
            project.tasks.map((t, idx) => (
              <div
                key={t.id}
                className="grid grid-cols-12 gap-3 items-center px-4 py-2.5 border-b border-line last:border-b-0 text-[12px] hover:bg-surface transition-colors"
              >
                <div className="col-span-7 md:col-span-8 flex items-center gap-2 mono">
                  <TaskIcon status={t.status} />
                  <span className={t.status === 'todo' ? 'text-muted' : 'text-foreground'}>
                    {t.description}
                  </span>
                </div>
                <div className="col-span-3 md:col-span-2">
                  <StatusBadge status={t.status} />
                </div>
                <div className="col-span-2 text-right mono text-[10px] uppercase tracking-[0.1em] text-muted">
                  PHASE {idx + 1}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function ResourceLink({ icon, label, href }) {
  const disabled = !href;
  const Tag = disabled ? 'div' : 'a';
  return (
    <Tag
      href={href || undefined}
      target={disabled ? undefined : '_blank'}
      rel="noreferrer"
      className={`flex items-center justify-between border border-line-soft px-2.5 py-2 transition-colors ${
        disabled
          ? 'opacity-40 cursor-not-allowed'
          : 'hover:border-crimson hover:text-crimson cursor-pointer'
      }`}
    >
      <span className="flex items-center gap-2 text-muted">
        {icon}
        <span className="text-[10px] tracking-[0.14em]">{label}</span>
      </span>
      <ArrowUpRight className={`w-3 h-3 ${disabled ? 'text-muted' : 'text-crimson'}`} />
    </Tag>
  );
}
