import { ReactNode, useCallback, useEffect, useState } from "react"
import { createContext } from "use-context-selector"
import { api } from "../libs/axios"

interface Transaction {
  id: number
  description: string
  type: "income" | "outcome"
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInputType {
  description: string
  price: number
  category: string
  type: "income" | "outcome"
}

interface TransactionContextTypes {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInputType) => void
}

export const TransactionsContext = createContext({} as TransactionContextTypes)

interface TransactionsContextProviderProps {
  children: ReactNode
}

export function TransactionsContextProvider({
  children,
}: TransactionsContextProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get("/transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    })

    setTransactions(response.data)
  }, [])

  const createTransaction = useCallback(
    async (data: CreateTransactionInputType) => {
      const { description, price, category, type } = data

      const response = await api.post("transactions", {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    []
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
