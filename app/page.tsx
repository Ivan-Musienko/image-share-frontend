"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAccountContext } from "@/contexts/AccountContext";

export default function Home() {
  const { account } = useAccountContext();
  const router = useRouter();

  useEffect(() => {
    if (!account) router.replace("/auth");
    else router.replace("/account");
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 gap" />
  );
}
