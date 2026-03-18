export type Category =
  | "Food"
  | "Transport"
  | "Bills"
  | "Shopping"
  | "Income"
  | "Entertainment"
  | "Misc";

export interface Transaction {
  id: string;
  merchant: string;
  category: Category;
  amount: number;
  type: "income" | "expense";
  date: string;
  note?: string;
}

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    merchant: "Salary Credit",
    category: "Income",
    amount: 85000,
    type: "income",
    date: "2026-03-01",
    note: "March salary",
  },
  {
    id: "2",
    merchant: "Freelance Payment",
    category: "Income",
    amount: 15000,
    type: "income",
    date: "2026-03-05",
    note: "Design project",
  },
  {
    id: "3",
    merchant: "BigBasket",
    category: "Food",
    amount: 1200,
    type: "expense",
    date: "2026-03-06",
  },
  {
    id: "4",
    merchant: "Electricity Bill",
    category: "Bills",
    amount: 1800,
    type: "expense",
    date: "2026-03-07",
  },
  {
    id: "5",
    merchant: "Amazon",
    category: "Shopping",
    amount: 3499,
    type: "expense",
    date: "2026-03-08",
  },
  {
    id: "6",
    merchant: "Uber",
    category: "Transport",
    amount: 180,
    type: "expense",
    date: "2026-03-09",
  },
  {
    id: "7",
    merchant: "Swiggy",
    category: "Food",
    amount: 450,
    type: "expense",
    date: "2026-03-10",
  },
  {
    id: "8",
    merchant: "Netflix",
    category: "Entertainment",
    amount: 649,
    type: "expense",
    date: "2026-03-11",
  },
  {
    id: "9",
    merchant: "WiFi Bill",
    category: "Bills",
    amount: 999,
    type: "expense",
    date: "2026-03-12",
  },
  {
    id: "10",
    merchant: "Myntra",
    category: "Shopping",
    amount: 1299,
    type: "expense",
    date: "2026-03-13",
  },
  {
    id: "11",
    merchant: "Ola",
    category: "Transport",
    amount: 240,
    type: "expense",
    date: "2026-03-14",
  },
  {
    id: "12",
    merchant: "Zomato",
    category: "Food",
    amount: 320,
    type: "expense",
    date: "2026-03-15",
  },
  {
    id: "13",
    merchant: "Phone Recharge",
    category: "Bills",
    amount: 599,
    type: "expense",
    date: "2026-03-15",
  },
  {
    id: "14",
    merchant: "Flipkart",
    category: "Shopping",
    amount: 799,
    type: "expense",
    date: "2026-03-16",
  },
  {
    id: "15",
    merchant: "Metro Card",
    category: "Transport",
    amount: 50,
    type: "expense",
    date: "2026-03-17",
  },
  {
    id: "16",
    merchant: "Spotify",
    category: "Entertainment",
    amount: 119,
    type: "expense",
    date: "2026-03-17",
  },
  {
    id: "17",
    merchant: "Swiggy",
    category: "Food",
    amount: 380,
    type: "expense",
    date: "2026-03-18",
  },
  {
    id: "18",
    merchant: "D-Mart",
    category: "Food",
    amount: 890,
    type: "expense",
    date: "2026-03-18",
  },
];

export type Budget = {
  category: Category;
  limit: number;
  spent: number;
  color: string;
};

export const BUDGETS: Budget[] = [
  { category: "Food", limit: 5000, spent: 3240, color: "#2FE6B8" },
  { category: "Transport", limit: 2000, spent: 470, color: "#F59E0B" },
  { category: "Shopping", limit: 5000, spent: 5597, color: "#FF6B6B" },
  { category: "Bills", limit: 4000, spent: 3398, color: "#60A5FA" },
  { category: "Entertainment", limit: 1000, spent: 768, color: "#A78BFA" },
  { category: "Misc", limit: 2000, spent: 400, color: "#34D399" },
];

export const MONTHLY_DATA = [
  { month: "Oct", amount: 28400 },
  { month: "Nov", amount: 31200 },
  { month: "Dec", amount: 42100 },
  { month: "Jan", amount: 29800 },
  { month: "Feb", amount: 38500 },
  { month: "Mar", amount: 34710 },
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Food: "#2FE6B8",
  Transport: "#F59E0B",
  Bills: "#60A5FA",
  Shopping: "#FF6B6B",
  Income: "#34D399",
  Entertainment: "#A78BFA",
  Misc: "#FB923C",
};

export const CATEGORY_ICONS: Record<Category, string> = {
  Food: "🍔",
  Transport: "🚗",
  Bills: "⚡",
  Shopping: "🛍️",
  Income: "💰",
  Entertainment: "🎬",
  Misc: "📦",
};

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
