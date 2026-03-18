import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, Search } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NAV_LINKS = [
  { id: "home", label: "Overview" },
  { id: "analytics", label: "Analytics" },
  { id: "budgets", label: "Budgets" },
  { id: "profile", label: "Reports" },
];

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 glass-card border-b border-white/10 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl teal-gradient flex items-center justify-center shadow-teal">
            <span className="text-[#0B1220] font-bold text-lg">S</span>
          </div>
          <span className="font-semibold text-foreground text-base hidden sm:block">
            Smart Expense
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              data-ocid={`nav.${link.id}.link`}
              onClick={() => onTabChange(link.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === link.id
                  ? "text-teal bg-teal/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            data-ocid="header.search_input"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
          >
            <Search size={18} />
          </button>
          <button
            type="button"
            data-ocid="header.notification.button"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all relative"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal" />
          </button>
          <Avatar className="w-8 h-8 cursor-pointer">
            <AvatarFallback className="bg-teal/20 text-teal text-xs font-semibold">
              RS
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
