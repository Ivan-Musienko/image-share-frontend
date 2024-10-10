import { Input } from "@nextui-org/input";
import React, { FormEvent, useState } from "react";
import { Button } from "@nextui-org/button";
import axios, { AxiosError, GenericFormData } from "axios";

import ErrorNotification from "../ui/ErrorNotification";
import FileInputLine from "../ui/FileInput";
import ItemWithDescription from "../ui/ItemWithDescription";

import { useModalContext } from "@/contexts/modalContext";
import { getUser, updateUserAccount } from "@/api/account";
import { useAccountContext } from "@/contexts/AccountContext";

export default function AccountUpdateModal() {
  const { setModal } = useModalContext();
  const [error, setError] = useState<string>("");
  const { setAccount } = useAccountContext();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleUpdateAccountForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { target } = e;

    setError("");
    const formData = axios.formToJSON(
      target as unknown as GenericFormData,
    ) as Record<string, any>;

    for (let key in formData) {
      const element = formData[key];

      if (element.length === 0) {
        delete formData[key];
      }

      if (key === "Avatar" && formData[key]?.name?.length === 0) {
        delete formData[key];
      }
    }

    try {
      if (Object.keys(formData).length !== 0) {
        setLoading(true);
        await updateUserAccount(formData);

        const account = await getUser();

        setLoading(false);
        setAccount(account);
        setModal(null);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setLoading(false);

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
      className=" grid justify-center gap-4"
      onSubmit={handleUpdateAccountForm}
    >
      {error ? <ErrorNotification message={error} /> : ""}
      <Input
        label="Ім'я"
        name="FirstName"
        placeholder="Введіть ваше ім'я"
        type="text"
      />
      <Input
        label="Фамілія"
        name="LastName"
        placeholder="Введіть вашу фамілію"
        type="text"
      />
      <ItemWithDescription
        className="bg-default-100 rounded-lg grid gap-1 p-2"
        label="Аватарка"
      >
        <FileInputLine className="w-full" name="Avatar" />
      </ItemWithDescription>
      <Button
        className="mt-2"
        color="primary"
        isLoading={loading}
        type="submit"
      >
        Оновити
      </Button>
    </form>
  );
}
