import { TransactionsContextProvider } from "./contexts/TransactionContext"
import { Transactions } from "./pages/transactions"

export function App() {
  return (
    <TransactionsContextProvider>
      <Transactions />
    </TransactionsContextProvider>
  )
}
