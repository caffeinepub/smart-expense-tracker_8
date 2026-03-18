import type { Transaction } from "@/data/transactions";
import {
  CATEGORY_COLORS,
  CATEGORY_ICONS,
  formatINR,
} from "@/data/transactions";

interface TransactionRowProps {
  transaction: Transaction;
  index: number;
}

export function TransactionRow({ transaction, index }: TransactionRowProps) {
  const icon = CATEGORY_ICONS[transaction.category];
  const color = CATEGORY_COLORS[transaction.category];
  const dateObj = new Date(transaction.date);
  const formattedDate = dateObj.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

  return (
    <div
      data-ocid={`transactions.item.${index}`}
      className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
        style={{ background: `${color}20` }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {transaction.merchant}
        </p>
        <span
          className="text-[11px] font-medium px-2 py-0.5 rounded-full"
          style={{ background: `${color}20`, color }}
        >
          {transaction.category}
        </span>
      </div>
      <div className="text-right flex-shrink-0">
        <p
          className={`text-sm font-semibold ${transaction.type === "income" ? "text-income" : "text-expense"}`}
        >
          {transaction.type === "income" ? "+" : "-"}
          {formatINR(transaction.amount)}
        </p>
        <p className="text-[11px] text-muted-foreground">{formattedDate}</p>
      </div>
    </div>
  );
}
