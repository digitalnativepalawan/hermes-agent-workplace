import { Github, Triangle, Instagram, Twitter, Linkedin, ArrowUpRight, Building, Globe, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-line mt-12 px-6 lg:px-10 py-10 mono">
      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-12 md:col-span-3">
          <div className="serif text-foreground text-lg">HERMES.AGENT</div>
          <div className="label mt-1">WORK STATION / V1</div>
        </div>

        <FooterItem icon={<Building className="w-3 h-3" />} title="BUILDING" line="IN PARADISE" />
        <FooterItem icon={<Globe className="w-3 h-3" />} title="OPERATING" line="WORLDWIDE" />
        <FooterItem icon={<Mail className="w-3 h-3" />} title="CONNECT" line="WITH US" arrow />

        <div className="col-span-12 md:col-span-3 md:text-right">
          <div className="label text-foreground">© 2026 HERMES.AGENT</div>
          <div className="label mt-1">ALL SYSTEMS RESERVED</div>
        </div>
      </div>

      <div className="border-t border-line mt-8 pt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-muted">
          <Github className="w-3.5 h-3.5 hover:text-crimson cursor-pointer" />
          <Triangle className="w-3.5 h-3.5 hover:text-crimson cursor-pointer" />
          <Instagram className="w-3.5 h-3.5 hover:text-crimson cursor-pointer" />
          <Twitter className="w-3.5 h-3.5 hover:text-crimson cursor-pointer" />
          <Linkedin className="w-3.5 h-3.5 hover:text-crimson cursor-pointer" />
        </div>
        <div className="flex items-center gap-4 label">
          <a href="#" className="hover:text-crimson">HOME</a>
          <a href="#projects" className="hover:text-crimson">PROJECTS</a>
          <a href="#" className="hover:text-crimson">PRIVACY</a>
          <a href="#" className="hover:text-crimson">TERMS</a>
        </div>
      </div>
    </footer>
  );
}

function FooterItem({ icon, title, line, arrow }) {
  return (
    <div className="col-span-6 md:col-span-2">
      <div className="label flex items-center gap-1.5">
        {icon}
        {title}
      </div>
      <div className="text-foreground text-xs uppercase tracking-[0.1em] mt-1 flex items-center gap-1">
        {line}
        {arrow && <ArrowUpRight className="w-3 h-3 text-crimson" />}
      </div>
    </div>
  );
}
