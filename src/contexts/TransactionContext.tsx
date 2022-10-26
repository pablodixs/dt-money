import { createContext, ReactNode, useEffect, useState } from "react";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextTypes {
  transactions: Transaction[];
}

export const TransactionsContext = createContext({} as TransactionContextTypes);

interface TransactionsContextProviderProps {
  children: ReactNode;
}

export function TransactionsContextProvider({
  children,
}: TransactionsContextProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function getTransactionsData() {
      const response = await fetch("http://localhost:3000/transactions");
      const data = await response.json();
      setTransactions(data);
    }

    getTransactionsData();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
