import { BarChart2, Home, User, Wallet } from "lucide-react";
import { motion } from "motion/react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddClick: () => void;
}

const NAV_ITEMS = [
  { id: "home", label: "Home", Icon: Home },
  { id: "analytics", label: "Analytics", Icon: BarChart2 },
  { id: "budgets", label: "Budgets", Icon: Wallet },
  { id: "profile", label: "Profile", Icon: User },
];

export function BottomNav({
  activeTab,
  onTabChange,
  onAddClick,
}: BottomNavProps) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm">
      <div className="glass-card rounded-2xl px-2 py-2 flex items-center justify-around shadow-card">
        {NAV_ITEMS.slice(0, 2).map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            data-ocid={`bottom_nav.${id}.link`}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all ${
              activeTab === id ? "text-teal" : "text-muted-foreground"
            }`}
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}

        <motion.button
          type="button"
          data-ocid="add_transaction.open_modal_button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddClick}
          className="w-14 h-14 rounded-full teal-gradient flex items-center justify-center shadow-teal -mt-6 text-[#0B1220] font-bold text-2xl leading-none"
        >
          +
        </motion.button>

        {NAV_ITEMS.slice(2).map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            data-ocid={`bottom_nav.${id}.link`}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all ${
              activeTab === id ? "text-teal" : "text-muted-foreground"
            }`}
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
