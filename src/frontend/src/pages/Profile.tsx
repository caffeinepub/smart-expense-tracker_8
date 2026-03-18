import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { formatINR } from "@/data/transactions";
import { Bell, Download, LogOut, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function Profile() {
  const [notifications, setNotifications] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your account and preferences
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-accent rounded-2xl p-6 flex items-center gap-4"
      >
        <Avatar className="w-16 h-16">
          <AvatarFallback className="bg-teal/20 text-teal text-xl font-bold">
            RS
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xl font-bold">Rahul Sharma</p>
          <p className="text-muted-foreground text-sm">
            rahul.sharma@gmail.com
          </p>
          <span className="inline-block mt-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full bg-teal/20 text-teal">
            Premium Member
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Income", value: formatINR(100000), color: "#2FE6B8" },
          { label: "Total Spent", value: formatINR(25873), color: "#FF6B6B" },
          { label: "Transactions", value: "18", color: "#60A5FA" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card rounded-2xl p-4 text-center"
          >
            <p className="text-lg font-bold" style={{ color: s.color }}>
              {s.value}
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass-card rounded-2xl p-5 space-y-4"
      >
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Settings
        </h2>
        {[
          {
            icon: <Bell size={16} />,
            label: "Push Notifications",
            sub: "Budget alerts & reminders",
            checked: notifications,
            onChange: setNotifications,
            ocid: "profile.notifications.switch",
          },
          {
            icon: <WarningIcon />,
            label: "Budget Alerts",
            sub: "Notify when 80% spent",
            checked: budgetAlerts,
            onChange: setBudgetAlerts,
            ocid: "profile.budget_alerts.switch",
          },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">{item.icon}</span>
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
            </div>
            <Switch
              data-ocid={item.ocid}
              checked={item.checked}
              onCheckedChange={item.onChange}
            />
          </div>
        ))}
      </motion.div>

      <div className="space-y-3">
        <Button
          data-ocid="profile.export.button"
          variant="outline"
          className="w-full justify-start gap-3 glass-card border-white/10 h-12"
          onClick={() =>
            toast.success("Export started! Your CSV will be ready shortly.")
          }
        >
          <Download size={16} className="text-teal" />
          Export Transactions (CSV)
        </Button>
        <Button
          data-ocid="profile.security.button"
          variant="outline"
          className="w-full justify-start gap-3 glass-card border-white/10 h-12"
          onClick={() => toast.info("Security settings coming soon!")}
        >
          <Shield size={16} className="text-blue-400" />
          Privacy &amp; Security
        </Button>
        <Button
          data-ocid="profile.logout.button"
          variant="outline"
          className="w-full justify-start gap-3 glass-card border-white/10 h-12 text-destructive hover:text-destructive"
          onClick={() => toast.error("You have been logged out.")}
        >
          <LogOut size={16} />
          Log Out
        </Button>
      </div>
    </div>
  );
}

function WarningIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <title>Warning</title>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
