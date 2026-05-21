import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Default project — replace via admin panel
const DEFAULT_PROJECTS = [
  {
    id: 'merqato-digital',
    name: 'merQato.digital',
    tagline: 'Tropical Digital Infrastructure',
    description: 'Hospitality & community operating system — built from Palawan.',
    goal: 'Ship a v1 with bookings, community feed, and operator dashboards by Q3.',
    stage: 'INTERFACE DESIGN & PROTOTYPING',
    progress: 35,
    nextMilestone: 'LIVE WORKING DEMO',
    status: 'BUILDING',
    githubUrl: 'https://github.com/digitalnativepalawan/tropical-systems-studio',
    vercelUrl: 'https://merqato.digital',
    liveUrl: 'https://merqato.digital',
    screenshot: '',
    tasks: [
      { id: 't1', description: 'Define core interface components', status: 'done' },
      { id: 't2', description: 'Map primary user flows', status: 'in-progress' },
      { id: 't3', description: 'Build working prototype', status: 'todo' },
      { id: 't4', description: 'Integrate with live agent', status: 'todo' },
      { id: 't5', description: 'Deploy demo environment', status: 'todo' },
    ],
  },
];

export const useHermesStore = create(
  persist(
    (set, get) => ({
      projects: DEFAULT_PROJECTS,
      activeProjectId: DEFAULT_PROJECTS[0].id,

      // System status (right-side panel)
      systemStatus: {
        network: 'ONLINE',
        operations: 'ONLINE',
        database: 'ONLINE',
        sync: 'ONLINE',
      },

      setActiveProject: (id) => set({ activeProjectId: id }),

      addProject: (project) =>
        set((state) => ({
          projects: [
            ...state.projects,
            {
              id: project.id || `proj-${Date.now()}`,
              name: 'Untitled Project',
              tagline: '',
              description: '',
              goal: '',
              stage: 'PLANNING',
              progress: 0,
              nextMilestone: '',
              status: 'BUILDING',
              githubUrl: '',
              vercelUrl: '',
              liveUrl: '',
              screenshot: '',
              tasks: [],
              ...project,
            },
          ],
        })),

      updateProject: (id, patch) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...patch } : p
          ),
        })),

      removeProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          activeProjectId:
            state.activeProjectId === id
              ? state.projects.find((p) => p.id !== id)?.id || null
              : state.activeProjectId,
        })),

      addTask: (projectId, description) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  tasks: [
                    ...p.tasks,
                    { id: `t-${Date.now()}`, description, status: 'todo' },
                  ],
                }
              : p
          ),
        })),

      updateTask: (projectId, taskId, patch) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  tasks: p.tasks.map((t) =>
                    t.id === taskId ? { ...t, ...patch } : t
                  ),
                }
              : p
          ),
        })),

      removeTask: (projectId, taskId) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId
              ? { ...p, tasks: p.tasks.filter((t) => t.id !== taskId) }
              : p
          ),
        })),

      getActiveProject: () => {
        const { projects, activeProjectId } = get();
        return projects.find((p) => p.id === activeProjectId) || projects[0];
      },
    }),
    {
      name: 'hermes-workstation-v1',
    }
  )
);
