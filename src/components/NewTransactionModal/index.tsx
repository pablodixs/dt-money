import * as Dialog from "@radix-ui/react-dialog";

import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from "./styles";

export function NewTransactionModal() {
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <Dialog.Title>Nova transação</Dialog.Title>
        <form>
          <input type="text" required placeholder="Descrição" />
          <input type="number" required placeholder="Preço" />
          <input type="text" required placeholder="Categoria" />
          <TransactionType>
            <TransactionTypeButton value="income" variant="income">
              <ArrowCircleDown size={24} />
              Entrada
            </TransactionTypeButton>
            <TransactionTypeButton value="outcome" variant="outcome">
              <ArrowCircleUp size={24} />
              Saída
            </TransactionTypeButton>
          </TransactionType>
          <button type="submit">Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
