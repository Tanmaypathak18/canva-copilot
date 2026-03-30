import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { FileText, Paintbrush, Eye, BarChart3 } from "lucide-react";

const tabs = [
  { to: "/brief", label: "Brief", icon: FileText },
  { to: "/create", label: "Create", icon: Paintbrush },
  { to: "/review", label: "Review", icon: Eye },
  { to: "/status", label: "Status", icon: BarChart3 },
];

const AppNav = () => {
  return (
    <nav className="h-12 border-b border-border bg-card flex items-center px-4 shrink-0">
      <div className="flex items-center gap-2 mr-8">
        <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
          <span className="text-primary-foreground text-xs font-bold">C</span>
        </div>
        <span className="font-semibold text-sm text-foreground">Copilot</span>
        <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded-full">
          Context-Aware Copilot
        </span>
      </div>
      <div className="flex items-center gap-1">
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )
            }
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default AppNav;
