"use client";
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAccountContext } from "../contexts/AccountContext";
import { getUser } from "../api/account";

export default function AccountManager({ children }: { children: ReactNode }) {
  const { account, setAccount } = useAccountContext();
  const router = useRouter();

  useEffect(() => {
    if (account == null) {
      getUser()
        .then((data) => {
          setAccount(data);
        })
        .catch((err) => {
          router.replace("/auth");
        });
    }
  }, []);

  return <>{children}</>;
}
