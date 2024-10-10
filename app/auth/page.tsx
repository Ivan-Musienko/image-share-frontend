"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { Key } from "@react-types/shared";
import { Input } from "@nextui-org/input";
import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Button } from "@nextui-org/button";
import axios, { AxiosError, GenericFormData } from "axios";
import { useRouter } from "next/navigation";

import { GoogleLogoSvg } from "@/icons/CompanySvgs";
import FileInputLine from "@/components/ui/FileInput";
import ItemWithDescription from "@/components/ui/ItemWithDescription";
import ErrorNotification from "@/components/ui/ErrorNotification";
import { useAccountContext } from "@/contexts/AccountContext";
import { Account } from "@/types";
import { getUser } from "@/api/account";

export default function AuthPage() {
  const [selected, setSelected] = useState<Key>("login");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const { setAccount, account } = useAccountContext();

  useEffect(() => {
    if (account) router.replace("/account");
  }, [account]);
  async function handleAuthorization(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { target } = e;
    const formData = axios.formToJSON(target as unknown as GenericFormData);

    try {
      setError("");
      setLoading(true);
      await axios.post("/api/auth/signin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const me = await getUser();

      setLoading(false);

      setAccount(me as Account);
      router.push("/account");
    } catch (err) {
      setLoading(false);

      if (err instanceof AxiosError) {
        setError(
          Array.isArray(err.response?.data.message)
            ? err.response?.data.message[0]
            : err.response?.data.message,
        );
      } else {
        setError("Критична помилка");
      }
    }
  }
  async function handleRegistration(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { target } = e;
    const formData = axios.formToJSON(target as unknown as GenericFormData);

    try {
      setError("");
      setLoading(true);

      await axios.post("/api/auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const me = await getUser();

      setLoading(false);

      setAccount(me as Account);
      router.push("/account");
    } catch (err) {
      setLoading(false);

      if (err instanceof AxiosError) {
        setError(
          Array.isArray(err.response?.data.message)
            ? err.response?.data.message[0]
            : err.response?.data.message,
        );
      } else {
        setError("Критична помилка");
      }
    }
  }

  return (
    <div className="flex flex-col w-full items-center">
      <Card className="max-w-full w-[380px] h-max">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            aria-label="Tabs form"
            selectedKey={selected}
            size="md"
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Авторизація">
              <form
                className="flex flex-col gap-4"
                onSubmit={handleAuthorization}
              >
                {error ? <ErrorNotification message={error} /> : ""}
                <Input
                  isRequired
                  label="Електронна скринька"
                  name="Email"
                  placeholder="Введіть вашу електронну скриньку"
                  type="email"
                />
                <Input
                  isRequired
                  label="Пароль"
                  name="Password"
                  placeholder="Введіть ваш пароль"
                  type="password"
                />
                <p className="text-center text-small">
                  Потрібно створити аккаунт?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Реєстрація
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    isLoading={loading}
                    type="submit"
                  >
                    Авторизація
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Реєстрація">
              {error ? <ErrorNotification message={error} /> : ""}
              <form
                className="flex flex-col gap-4"
                onSubmit={handleRegistration}
              >
                <Input
                  isRequired
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
                <Input
                  isRequired
                  label="Електронна скринька"
                  name="Email"
                  placeholder="Введіть вашу електронну скриньку"
                  type="email"
                />
                <Input
                  isRequired
                  label="Пароль"
                  name="Password"
                  placeholder="Введіть ваш пароль"
                  type="password"
                />
                <ItemWithDescription
                  className="bg-default-100 rounded-lg grid gap-1 p-2"
                  label="Аватарка"
                >
                  <FileInputLine className="w-full" name="Avatar" />
                </ItemWithDescription>
                <p className="text-center text-small">
                  Маєте аккаунт?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Увійти
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    isLoading={loading}
                    type="submit"
                  >
                    Створити
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
          <p className="flex items-center gap-4 justify-center  after:content-[' '] after:inline mt-2 mb-4 after:w-full before:w-full text-default-600 after:h-[1px] after:bg-default-100 before:content-[' '] before:inline before:h-[1px] before:bg-default-100 ">
            Або
          </p>
          <Button
            className=" bg-gray-100 border border-default-500 text-default-50"
            startContent={<GoogleLogoSvg size={26} />}
            onClick={() => {
              router.push("/api/auth/google");
            }}
          >
            Продовжити з<b>Google</b>
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
