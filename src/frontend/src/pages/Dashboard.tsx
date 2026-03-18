import { StatCard } from "@/components/StatCard";
import { TransactionRow } from "@/components/TransactionRow";
import { Input } from "@/components/ui/input";
import {
  CATEGORY_COLORS,
  type Transaction,
  formatINR,
} from "@/data/transactions";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface DashboardProps {
  transactions: Transaction[];
}

const DONUT_DATA = [
  { name: "Food", value: 35, color: CATEGORY_COLORS.Food },
  { name: "Transport", value: 20, color: CATEGORY_COLORS.Transport },
  { name: "Shopping", value: 15, color: CATEGORY_COLORS.Shopping },
  { name: "Bills", value: 10, color: CATEGORY_COLORS.Bills },
  { name: "Entertainment", value: 8, color: CATEGORY_COLORS.Entertainment },
  { name: "Misc", value: 12, color: CATEGORY_COLORS.Misc },
];

export function Dashboard({ transactions }: DashboardProps) {
  const [search, setSearch] = useState("");

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpense;
  const todayStr = new Date().toISOString().slice(0, 10);
  const todaySpend = transactions
    .filter((t) => t.type === "expense" && t.date === todayStr)
    .reduce((s, t) => s + t.amount, 0);

  const filtered = transactions
    .filter(
      (t) =>
        t.merchant.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase()),
    )
    .slice(0, 8);

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
          Welcome back, Rahul Sharma!
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Here&apos;s what&apos;s happening with your money today.
        </p>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
        {[
          { text: "🍔 You spent ₹2,340 on food today", color: "#2FE6B8" },
          { text: "💡 You can save ₹3,000 this month", color: "#F59E0B" },
          { text: "⚠️ Shopping budget at 112%!", color: "#FF6B6B" },
        ].map((ins) => (
          <div
            key={ins.text}
            className="flex-shrink-0 glass-card rounded-xl px-4 py-2.5 text-xs font-medium"
            style={{ color: ins.color }}
          >
            {ins.text}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Balance"
          value={formatINR(balance)}
          badge="+₹12,000 this month"
          badgePositive
          accent
          icon="💳"
          delay={0}
        />
        <StatCard
          title="Today's Spending"
          value={todaySpend > 0 ? formatINR(todaySpend) : "₹2,340"}
          icon="📅"
          delay={0.1}
        />
        <StatCard
          title="Monthly Spending"
          value={formatINR(totalExpense)}
          badge="-8% vs last month"
          badgePositive
          icon="📊"
          delay={0.2}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 glass-card rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold">Recent Transactions</h2>
            <div className="relative">
              <Search
                size={14}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                data-ocid="transactions.search_input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="pl-8 h-8 text-xs w-32 bg-white/5 border-white/10"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div
              data-ocid="transactions.empty_state"
              className="text-center py-8 text-muted-foreground text-sm"
            >
              No transactions found.
            </div>
          ) : (
            <div>
              {filtered.map((t, i) => (
                <TransactionRow key={t.id} transaction={t} index={i + 1} />
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-card rounded-2xl p-5"
        >
          <h2 className="text-base font-semibold mb-1">Category Breakdown</h2>
          <p className="text-xs text-muted-foreground mb-4">This month</p>

          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={DONUT_DATA}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
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

          <div className="space-y-2 mt-2">
            {DONUT_DATA.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: d.color }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {d.name}
                  </span>
                </div>
                <span
                  className="text-xs font-semibold"
                  style={{ color: d.color }}
                >
                  {d.value}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
