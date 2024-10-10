import React, { FormEvent, useState } from "react";
import { Button } from "@nextui-org/button";
import axios, { AxiosError, GenericFormData } from "axios";

import ErrorNotification from "../ui/ErrorNotification";
import FileInputLarge from "../ui/FileInputLarge";

import { useModalContext } from "@/contexts/modalContext";
import { getUser, shareImage } from "@/api/account";
import { useAccountContext } from "@/contexts/AccountContext";

export default function NewShareModal() {
  const { setModal } = useModalContext();
  const [error, setError] = useState<string>("");
  const { setAccount } = useAccountContext();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleNewShareForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { target } = e;

    setError("");
    const formData = axios.formToJSON(
      target as unknown as GenericFormData,
    ) as Record<string, any>;

    for (let key in formData) {
      if (key === "Image" && formData[key]?.name?.length === 0) {
        delete formData[key];
      }
    }

    try {
      if (Object.keys(formData).length !== 0) {
        setLoading(true);
        await shareImage(formData);

        const account = await getUser();

        setLoading(false);
        setAccount(account);
        setModal(null);
      }
    } catch (error) {
      setLoading(false);

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
      onSubmit={handleNewShareForm}
    >
      {error ? <ErrorNotification message={error} /> : ""}
      <FileInputLarge className="flex justify-center" name="Image" />
      <Button
        className="mt-2 w-max"
        color="primary"
        isLoading={loading}
        type="submit"
      >
        Опублікувати
      </Button>
    </form>
  );
}
