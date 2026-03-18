import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CATEGORY_ICONS,
  type Category,
  type Transaction,
} from "@/data/transactions";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface AddTransactionModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (t: Transaction) => void;
}

const CATEGORIES: Category[] = [
  "Food",
  "Transport",
  "Bills",
  "Shopping",
  "Entertainment",
  "Misc",
  "Income",
];

export function AddTransactionModal({
  open,
  onClose,
  onAdd,
}: AddTransactionModalProps) {
  const [type, setType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("Food");
  const [merchant, setMerchant] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const errs: Record<string, string> = {};
    if (!amount || Number.isNaN(Number(amount)) || Number(amount) <= 0)
      errs.amount = "Enter a valid amount";
    if (!merchant.trim()) errs.merchant = "Merchant name is required";
    if (!date) errs.date = "Date is required";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const t: Transaction = {
      id: Date.now().toString(),
      merchant: merchant.trim(),
      category,
      amount: Number(amount),
      type,
      date,
      note: note.trim() || undefined,
    };
    onAdd(t);
    toast.success(`Transaction added: ${CATEGORY_ICONS[category]} ${merchant}`);
    setAmount("");
    setMerchant("");
    setNote("");
    setErrors({});
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            data-ocid="add_transaction.dialog"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full sm:max-w-md glass-card rounded-t-3xl sm:rounded-3xl p-6 z-10 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold">Add Transaction</h2>
              <button
                type="button"
                data-ocid="add_transaction.close_button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex rounded-xl bg-white/5 p-1 mb-5">
              {(["expense", "income"] as const).map((t) => (
                <button
                  key={t}
                  data-ocid={`add_transaction.${t}.toggle`}
                  type="button"
                  onClick={() => setType(t)}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg capitalize transition-all ${
                    type === t
                      ? t === "expense"
                        ? "bg-destructive/80 text-white"
                        : "bg-teal/80 text-[#0B1220]"
                      : "text-muted-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label
                  htmlFor="amount"
                  className="text-xs text-muted-foreground mb-1.5 block"
                >
                  Amount (₹)
                </Label>
                <Input
                  id="amount"
                  data-ocid="add_transaction.amount.input"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-white/5 border-white/10 text-lg font-semibold h-12"
                />
                {errors.amount && (
                  <p
                    data-ocid="add_transaction.amount_error"
                    className="text-xs text-destructive mt-1"
                  >
                    {errors.amount}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  Category
                </Label>
                <Select
                  value={category}
                  onValueChange={(v) => setCategory(v as Category)}
                >
                  <SelectTrigger
                    data-ocid="add_transaction.category.select"
                    className="bg-white/5 border-white/10 h-10"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0F1A2A] border-white/10">
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {CATEGORY_ICONS[c]} {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="merchant"
                  className="text-xs text-muted-foreground mb-1.5 block"
                >
                  Merchant / Description
                </Label>
                <Input
                  id="merchant"
                  data-ocid="add_transaction.merchant.input"
                  placeholder="e.g. Swiggy, Amazon..."
                  value={merchant}
                  onChange={(e) => setMerchant(e.target.value)}
                  className="bg-white/5 border-white/10"
                />
                {errors.merchant && (
                  <p
                    data-ocid="add_transaction.merchant_error"
                    className="text-xs text-destructive mt-1"
                  >
                    {errors.merchant}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="date"
                  className="text-xs text-muted-foreground mb-1.5 block"
                >
                  Date
                </Label>
                <Input
                  id="date"
                  data-ocid="add_transaction.date.input"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-white/5 border-white/10"
                />
                {errors.date && (
                  <p
                    data-ocid="add_transaction.date_error"
                    className="text-xs text-destructive mt-1"
                  >
                    {errors.date}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="note"
                  className="text-xs text-muted-foreground mb-1.5 block"
                >
                  Note (optional)
                </Label>
                <Textarea
                  id="note"
                  data-ocid="add_transaction.note.textarea"
                  placeholder="Add a note..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="bg-white/5 border-white/10 resize-none h-20"
                />
              </div>

              <Button
                data-ocid="add_transaction.submit_button"
                type="submit"
                className="w-full h-12 teal-gradient text-[#0B1220] font-bold text-base rounded-xl"
              >
                Add Transaction
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
