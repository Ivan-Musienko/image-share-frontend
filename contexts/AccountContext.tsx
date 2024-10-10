"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

import { Account } from "@/types";

interface AccountContextType {
  account: Account | null;
  setAccount: Dispatch<SetStateAction<Account | null>>;
}

const AccountData = createContext<AccountContextType | undefined>(undefined);

export const useAccountContext = (): AccountContextType => {
  const context = useContext(AccountData);

  if (!context) {
    throw new Error("useAccountContext must be used within a AccountProvider");
  }

  return context;
};

export function AccountProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null);

  return (
    <AccountData.Provider value={{ account, setAccount }}>
      {children}
    </AccountData.Provider>
  );
}
