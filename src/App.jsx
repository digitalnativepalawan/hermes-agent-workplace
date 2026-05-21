import { Header } from './components/Header';
import { ProjectSwitcher } from './components/ProjectSwitcher';
import { HermesWorkArea } from './components/HermesWorkArea';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { useHermesStore } from './store/useHermesStore';

export default function App() {
  const addProject = useHermesStore((s) => s.addProject);
  const setActiveProject = useHermesStore((s) => s.setActiveProject);

  const handleAddProject = () => {
    const id = `proj-${Date.now()}`;
    addProject({ id, name: 'New Project' });
    setActiveProject(id);
  };

  return (
    <main className="min-h-screen bg-bg text-foreground">
      <Header />
      <ProjectSwitcher onAddProject={handleAddProject} />
      <HermesWorkArea />
      <Footer />
      <AdminPanel />
    </main>
  );
}
