import { Progress } from "@/components/ui/progress";
import { BUDGETS, CATEGORY_ICONS, formatINR } from "@/data/transactions";
import { AlertTriangle } from "lucide-react";
import { motion } from "motion/react";

export function Budgets() {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Budgets</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Track your spending limits per category
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {BUDGETS.map((budget, i) => {
          const pct = Math.min((budget.spent / budget.limit) * 100, 100);
          const isOver = budget.spent > budget.limit;
          const isWarning = pct >= 80 && !isOver;
          const remaining = budget.limit - budget.spent;

          return (
            <motion.div
              key={budget.category}
              data-ocid={`budget.item.${i + 1}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`glass-card rounded-2xl p-5 ${isOver ? "border-destructive/40" : isWarning ? "border-yellow-500/30" : ""}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {CATEGORY_ICONS[budget.category]}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{budget.category}</p>
                    <p className="text-xs text-muted-foreground">
                      Limit: {formatINR(budget.limit)}
                    </p>
                  </div>
                </div>
                {(isOver || isWarning) && (
                  <AlertTriangle
                    size={16}
                    className={isOver ? "text-destructive" : "text-yellow-400"}
                  />
                )}
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">
                    Spent:{" "}
                    <span className="text-foreground font-medium">
                      {formatINR(budget.spent)}
                    </span>
                  </span>
                  <span
                    style={{ color: isOver ? "#FF6B6B" : budget.color }}
                    className="font-semibold"
                  >
                    {pct.toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${pct}%`,
                      background: isOver ? "#FF6B6B" : budget.color,
                    }}
                  />
                </div>
              </div>

              <p
                className={`text-xs font-medium ${isOver ? "text-destructive" : "text-muted-foreground"}`}
              >
                {isOver
                  ? `Over budget by ${formatINR(Math.abs(remaining))}`
                  : `${formatINR(remaining)} remaining`}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
