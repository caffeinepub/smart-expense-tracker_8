import { CATEGORY_COLORS, MONTHLY_DATA, formatINR } from "@/data/transactions";
import { motion } from "motion/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DONUT_DATA = [
  { name: "Food", value: 35, color: CATEGORY_COLORS.Food },
  { name: "Transport", value: 20, color: CATEGORY_COLORS.Transport },
  { name: "Shopping", value: 15, color: CATEGORY_COLORS.Shopping },
  { name: "Bills", value: 10, color: CATEGORY_COLORS.Bills },
  { name: "Entertainment", value: 8, color: CATEGORY_COLORS.Entertainment },
  { name: "Misc", value: 12, color: CATEGORY_COLORS.Misc },
];

const INSIGHT_CARDS = [
  {
    title: "Highest Spend",
    value: "Shopping",
    sub: "₹5,597 this month",
    color: "#FF6B6B",
    icon: "🛍️",
  },
  {
    title: "Best Category",
    value: "Transport",
    sub: "Only ₹470 spent",
    color: "#2FE6B8",
    icon: "🚗",
  },
  {
    title: "Savings Rate",
    value: "74.2%",
    sub: "₹74,050 saved this month",
    color: "#60A5FA",
    icon: "💰",
  },
  {
    title: "Avg Daily",
    value: "₹1,929",
    sub: "Based on Mar spending",
    color: "#A78BFA",
    icon: "📅",
  },
];

export function Analytics() {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Insights into your spending patterns
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {INSIGHT_CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card rounded-2xl p-4"
          >
            <span className="text-2xl">{card.icon}</span>
            <p className="text-xs text-muted-foreground mt-2">{card.title}</p>
            <p
              className="text-lg font-bold mt-0.5"
              style={{ color: card.color }}
            >
              {card.value}
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {card.sub}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-5"
      >
        <h2 className="text-base font-semibold mb-1">
          Monthly Spending Trends
        </h2>
        <p className="text-xs text-muted-foreground mb-4">Last 6 months</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={MONTHLY_DATA} barSize={32}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#9AA8B8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#9AA8B8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                background: "#0F1A2A",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                fontSize: 12,
              }}
              formatter={(v: number) => [formatINR(v), "Spent"]}
            />
            <Bar dataKey="amount" fill="#2FE6B8" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-5"
      >
        <h2 className="text-base font-semibold mb-1">Spending by Category</h2>
        <p className="text-xs text-muted-foreground mb-4">March 2026</p>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <ResponsiveContainer width={220} height={220}>
            <PieChart>
              <Pie
                data={DONUT_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {DONUT_DATA.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#0F1A2A",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  fontSize: 12,
                }}
                formatter={(v: number) => [`${v}%`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 grid grid-cols-2 gap-3">
            {DONUT_DATA.map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ background: d.color }}
                />
                <div>
                  <p className="text-xs font-medium">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.value}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
