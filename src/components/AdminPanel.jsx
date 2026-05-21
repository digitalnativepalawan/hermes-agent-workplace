import { useState, useEffect } from 'react';
import { useHermesStore } from '../store/useHermesStore';
import { Lock, X, Plus, Trash2, Upload } from 'lucide-react';

export function AdminPanel() {
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState('');

  const {
    projects,
    activeProjectId,
    setActiveProject,
    updateProject,
    addProject,
    removeProject,
    addTask,
    updateTask,
    removeTask,
  } = useHermesStore();

  const project = projects.find((p) => p.id === activeProjectId) || projects[0];

  // Simple password gate — change to whatever you want
  const ADMIN_PWD = 'hermes';

  const submitPwd = (e) => {
    e.preventDefault();
    if (pwd === ADMIN_PWD) setAuthed(true);
    else alert('Wrong password');
  };

  // Convert uploaded file to base64 so it survives reloads via localStorage
  const handleScreenshotUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !project) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateProject(project.id, { screenshot: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 border border-line bg-surface/95 px-3 py-2 mono text-[10px] uppercase tracking-[0.14em] text-foreground hover:border-crimson hover:text-crimson transition-colors backdrop-blur"
      >
        <Lock className="w-3.5 h-3.5" />
        Admin Login
      </button>

      {open && (
        <div className="fixed inset-0 z-[900] bg-black/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4">
          <div className="bg-surface border border-line w-full max-w-4xl my-8 relative">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <div>
                <div className="label text-crimson">/ ADMIN</div>
                <div className="serif text-xl text-foreground">Work Station Console</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-muted hover:text-crimson"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5">
              {!authed ? (
                <form onSubmit={submitPwd} className="max-w-sm mx-auto py-8 space-y-3">
                  <div className="label">ENTER PASSWORD</div>
                  <input
                    type="password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    className="w-full bg-bg border border-line px-3 py-2 mono text-sm text-foreground focus:border-crimson outline-none"
                    placeholder="••••••"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="w-full border border-crimson text-crimson hover:bg-crimson hover:text-foreground py-2 mono text-[11px] tracking-[0.14em] uppercase transition-colors"
                  >
                    Unlock
                  </button>
                  <div className="label text-center text-[9px]">DEFAULT: hermes</div>
                </form>
              ) : (
                <AdminBody
                  projects={projects}
                  project={project}
                  setActiveProject={setActiveProject}
                  updateProject={updateProject}
                  addProject={addProject}
                  removeProject={removeProject}
                  addTask={addTask}
                  updateTask={updateTask}
                  removeTask={removeTask}
                  handleScreenshotUpload={handleScreenshotUpload}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function AdminBody({
  projects,
  project,
  setActiveProject,
  updateProject,
  addProject,
  removeProject,
  addTask,
  updateTask,
  removeTask,
  handleScreenshotUpload,
}) {
  const [newTask, setNewTask] = useState('');

  if (!project) {
    return (
      <div className="text-center py-8">
        <p className="text-muted mb-4">No projects yet.</p>
        <button
          onClick={() => addProject({ name: 'New Project' })}
          className="border border-crimson text-crimson hover:bg-crimson hover:text-foreground px-4 py-2 mono text-[11px] tracking-[0.14em] uppercase transition-colors"
        >
          Create First Project
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Project picker */}
      <div>
        <div className="label mb-2">EDITING PROJECT</div>
        <div className="flex flex-wrap gap-2">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveProject(p.id)}
              className={`px-3 py-1.5 border mono text-[10px] tracking-[0.14em] uppercase transition-colors ${
                p.id === project.id
                  ? 'border-crimson text-crimson'
                  : 'border-line text-muted hover:border-gold hover:text-gold'
              }`}
            >
              {p.name}
            </button>
          ))}
          <button
            onClick={() =>
              addProject({
                id: `proj-${Date.now()}`,
                name: 'New Project',
              })
            }
            className="px-3 py-1.5 border border-line text-muted hover:border-gold hover:text-gold mono text-[10px] tracking-[0.14em] uppercase flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> Add
          </button>
        </div>
      </div>

      {/* Project fields */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Project Name" value={project.name} onChange={(v) => updateProject(project.id, { name: v })} />
        <Field label="Tagline" value={project.tagline} onChange={(v) => updateProject(project.id, { tagline: v })} />
        <Field label="Current Stage" value={project.stage} onChange={(v) => updateProject(project.id, { stage: v })} />
        <Field label="Status" value={project.status} onChange={(v) => updateProject(project.id, { status: v })} />
        <Field label="Next Milestone" value={project.nextMilestone} onChange={(v) => updateProject(project.id, { nextMilestone: v })} />
        <div>
          <div className="label mb-1">Progress: {project.progress}%</div>
          <input
            type="range"
            min={0}
            max={100}
            value={project.progress}
            onChange={(e) => updateProject(project.id, { progress: Number(e.target.value) })}
            className="w-full accent-crimson"
          />
        </div>
      </div>

      <Textarea
        label="Goal"
        value={project.goal}
        rows={3}
        onChange={(v) => updateProject(project.id, { goal: v })}
      />

      <Textarea
        label="Description"
        value={project.description}
        rows={2}
        onChange={(v) => updateProject(project.id, { description: v })}
      />

      {/* URLs */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="GitHub URL" value={project.githubUrl} onChange={(v) => updateProject(project.id, { githubUrl: v })} />
        <Field label="Vercel URL" value={project.vercelUrl} onChange={(v) => updateProject(project.id, { vercelUrl: v })} />
        <Field label="Live URL" value={project.liveUrl} onChange={(v) => updateProject(project.id, { liveUrl: v })} />
      </div>

      {/* Screenshot */}
      <div>
        <div className="label mb-2">SCREENSHOT</div>
        <div className="flex items-start gap-4">
          <div className="w-48 h-32 border border-line bg-bg flex items-center justify-center overflow-hidden">
            {project.screenshot ? (
              <img src={project.screenshot} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <span className="label">NO IMAGE</span>
            )}
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 border border-line hover:border-crimson hover:text-crimson text-muted px-3 py-2 mono text-[10px] tracking-[0.14em] uppercase cursor-pointer transition-colors w-fit">
              <Upload className="w-3.5 h-3.5" />
              Upload Image
              <input type="file" accept="image/*" className="hidden" onChange={handleScreenshotUpload} />
            </label>
            <input
              type="text"
              placeholder="...or paste image URL"
              value={project.screenshot?.startsWith('data:') ? '' : (project.screenshot || '')}
              onChange={(e) => updateProject(project.id, { screenshot: e.target.value })}
              className="w-full bg-bg border border-line px-3 py-1.5 mono text-xs text-foreground focus:border-crimson outline-none"
            />
            {project.screenshot && (
              <button
                onClick={() => updateProject(project.id, { screenshot: '' })}
                className="text-muted hover:text-crimson mono text-[10px] tracking-[0.14em] uppercase"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="label">TASKS</div>
        </div>
        <div className="space-y-1.5">
          {project.tasks.map((t) => (
            <div key={t.id} className="flex items-center gap-2 border border-line px-2.5 py-1.5">
              <select
                value={t.status}
                onChange={(e) => updateTask(project.id, t.id, { status: e.target.value })}
                className="bg-bg border border-line-soft mono text-[10px] tracking-[0.14em] uppercase px-1.5 py-1 text-foreground focus:border-crimson outline-none"
              >
                <option value="todo">TODO</option>
                <option value="in-progress">IN PROGRESS</option>
                <option value="done">DONE</option>
              </select>
              <input
                value={t.description}
                onChange={(e) => updateTask(project.id, t.id, { description: e.target.value })}
                className="flex-1 bg-transparent text-sm text-foreground focus:outline-none"
              />
              <button
                onClick={() => removeTask(project.id, t.id)}
                className="text-muted hover:text-crimson"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (newTask.trim()) {
              addTask(project.id, newTask.trim());
              setNewTask('');
            }
          }}
          className="flex gap-2 mt-2"
        >
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New task description…"
            className="flex-1 bg-bg border border-line px-3 py-2 text-sm text-foreground focus:border-crimson outline-none"
          />
          <button
            type="submit"
            className="border border-crimson text-crimson hover:bg-crimson hover:text-foreground px-4 mono text-[10px] tracking-[0.14em] uppercase transition-colors"
          >
            Add
          </button>
        </form>
      </div>

      {/* Danger zone */}
      <div className="border-t border-line pt-4">
        <button
          onClick={() => {
            if (confirm(`Delete project "${project.name}"?`)) removeProject(project.id);
          }}
          className="text-muted hover:text-crimson mono text-[10px] tracking-[0.14em] uppercase flex items-center gap-1.5"
        >
          <Trash2 className="w-3 h-3" />
          Delete this project
        </button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div>
      <div className="label mb-1">{label}</div>
      <input
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-bg border border-line px-3 py-2 mono text-xs text-foreground focus:border-crimson outline-none"
      />
    </div>
  );
}

function Textarea({ label, value, rows = 3, onChange }) {
  return (
    <div>
      <div className="label mb-1">{label}</div>
      <textarea
        rows={rows}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-bg border border-line px-3 py-2 text-sm text-foreground focus:border-crimson outline-none resize-y"
      />
    </div>
  );
}
