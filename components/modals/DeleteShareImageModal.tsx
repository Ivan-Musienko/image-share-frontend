import React, { FormEvent, useState } from "react";
import { Button } from "@nextui-org/button";
import { AxiosError } from "axios";

import ErrorNotification from "../ui/ErrorNotification";

import { useModalContext } from "@/contexts/modalContext";
import { deleteSharedImage, getUser } from "@/api/account";
import { useAccountContext } from "@/contexts/AccountContext";

export default function DeleteShareImageModal({ uuid }: { uuid: string }) {
  const { setModal } = useModalContext();
  const [error, setError] = useState<string>("");
  const { setAccount } = useAccountContext();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleDeleteShareImageForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);
      await deleteSharedImage(uuid);

      const account = await getUser();

      setLoading(false);
      setAccount(account);
      setModal(null);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(
          Array.isArray(error.response?.data.message)
            ? error.response?.data.message[0]
            : error.message,
        );
      }
    }
  }

  return (
    <form
      className=" grid justify-center items-center justify-items-center gap-4"
      onSubmit={handleDeleteShareImageForm}
    >
      {error ? <ErrorNotification message={error} /> : ""}
      <Button
        className="mt-2 w-max"
        color="danger"
        isLoading={loading}
        type="submit"
      >
        Видалити
      </Button>
    </form>
  );
}
