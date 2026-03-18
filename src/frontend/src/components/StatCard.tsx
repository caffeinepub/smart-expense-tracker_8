import { motion } from "motion/react";

interface StatCardProps {
  title: string;
  value: string;
  badge?: string;
  badgePositive?: boolean;
  accent?: boolean;
  icon?: string;
  delay?: number;
}

export function StatCard({
  title,
  value,
  badge,
  badgePositive,
  accent,
  icon,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`rounded-2xl p-5 ${accent ? "glass-card-accent glow-teal" : "glass-card"}`}
    >
      <div className="flex items-start justify-between">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        {icon && <span className="text-xl">{icon}</span>}
      </div>
      <p className="text-3xl font-bold mt-2 text-foreground tracking-tight">
        {value}
      </p>
      {badge && (
        <span
          className={`inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-full ${
            badgePositive
              ? "bg-teal/20 text-teal"
              : "bg-destructive/20 text-destructive"
          }`}
        >
          {badge}
        </span>
      )}
    </motion.div>
  );
}
