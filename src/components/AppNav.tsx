import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { FileText, Paintbrush, Eye, BarChart3, Sparkles } from "lucide-react";

const tabs = [
  { to: "/brief", label: "Brief", icon: FileText },
  { to: "/create", label: "Create", icon: Paintbrush },
  { to: "/review", label: "Review", icon: Eye },
  { to: "/status", label: "Status", icon: BarChart3 },
];

const AppNav = () => {
  return (
    <nav className="h-12 flex items-center px-4 shrink-0" style={{ background: "hsl(240 15% 13%)" }}>
      <div className="flex items-center gap-2.5 mr-8">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "hsl(262 83% 58%)" }}>
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-white">Canva Teams</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium"
            style={{ background: "hsla(262, 83%, 58%, 0.2)", color: "hsl(262 83% 75%)" }}>
            AI Copilot
          </span>
        </div>
      </div>
      <div className="flex items-center gap-0.5">
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors",
                isActive
                  ? "text-white"
                  : "hover:text-white"
              )
            }
            style={({ isActive }) => ({
              background: isActive ? "hsla(262, 83%, 58%, 0.2)" : "transparent",
              color: isActive ? "white" : "hsl(240 5% 60%)",
            })}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </NavLink>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-3">
        <span className="text-[11px] font-medium" style={{ color: "hsl(240 5% 50%)" }}>
          Q2 Gen Z Summer Drop
        </span>
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white" style={{ background: "hsl(262 83% 58%)" }}>
          T
        </div>
      </div>
    </nav>
  );
};

export default AppNav;
