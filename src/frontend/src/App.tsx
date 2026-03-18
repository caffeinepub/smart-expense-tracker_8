import { AddTransactionModal } from "@/components/AddTransactionModal";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { INITIAL_TRANSACTIONS, type Transaction } from "@/data/transactions";
import { Analytics } from "@/pages/Analytics";
import { Budgets } from "@/pages/Budgets";
import { Dashboard } from "@/pages/Dashboard";
import { Profile } from "@/pages/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const queryClient = new QueryClient();

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [showAdd, setShowAdd] = useState(false);
  const [transactions, setTransactions] =
    useState<Transaction[]>(INITIAL_TRANSACTIONS);

  function handleAddTransaction(t: Transaction) {
    setTransactions((prev) => [t, ...prev]);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen font-inter">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 pb-32">
          {activeTab === "home" && <Dashboard transactions={transactions} />}
          {activeTab === "analytics" && <Analytics />}
          {activeTab === "budgets" && <Budgets />}
          {activeTab === "profile" && <Profile />}
        </main>

        <BottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onAddClick={() => setShowAdd(true)}
        />

        <AddTransactionModal
          open={showAdd}
          onClose={() => setShowAdd(false)}
          onAdd={handleAddTransaction}
        />

        <Toaster />

        {/* Footer */}
        <footer className="fixed bottom-0 left-0 right-0 text-center text-[10px] text-muted-foreground py-1 pointer-events-none opacity-50">
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            className="pointer-events-auto hover:text-teal transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            caffeine.ai
          </a>
        </footer>
      </div>
    </QueryClientProvider>
  );
}
