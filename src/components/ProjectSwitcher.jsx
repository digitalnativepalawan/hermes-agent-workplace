import { useHermesStore } from '../store/useHermesStore';
import { Plus } from 'lucide-react';

export function ProjectSwitcher({ onAddProject }) {
  const { projects, activeProjectId, setActiveProject } = useHermesStore();

  return (
    <section id="projects" className="px-6 lg:px-10 py-6 border-b border-line">
      <div className="flex items-center justify-between mb-3">
        <div className="label flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-crimson" />
          <span className="text-crimson">/ PROJECTS</span>
        </div>
        <button
          onClick={onAddProject}
          className="flex items-center gap-1.5 px-2.5 py-1 border border-line hover:border-gold text-[10px] tracking-[0.14em] uppercase mono text-muted hover:text-gold transition-colors"
        >
          <Plus className="w-3 h-3" />
          New Project
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {projects.map((p) => {
          const active = p.id === activeProjectId;
          return (
            <button
              key={p.id}
              onClick={() => setActiveProject(p.id)}
              className={`corner border px-4 py-2.5 text-left transition-colors relative ${
                active
                  ? 'border-crimson bg-crimson/5'
                  : 'border-line hover:border-gold/60'
              }`}
            >
              <span className="c1" /><span className="c2" />
              <div className={`mono text-[10px] tracking-[0.14em] uppercase ${active ? 'text-crimson' : 'text-muted'}`}>
                {p.status || 'BUILDING'}
              </div>
              <div className={`text-sm mt-0.5 ${active ? 'text-foreground' : 'text-muted'}`}>
                {p.name}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
