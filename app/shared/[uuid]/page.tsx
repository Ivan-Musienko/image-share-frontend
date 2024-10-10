"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardBody } from "@nextui-org/card";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { DownloadIcon, ExternalLinkIcon } from "react-outline-icons";

import ItemWithDescription from "@/components/ui/ItemWithDescription";
import { getSharedByUUID } from "@/api/account";

export default function Page({ params }: { params: { uuid: string } }) {
  const [shared, setShared] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true); // Додаємо стан для завантаження
  const router = useRouter();

  useEffect(() => {
    getSharedByUUID(params.uuid).then((data) => {
      setShared(data);
      setLoading(false); // Вимикаємо стан завантаження після отримання даних
    });
  }, []);

  return (
    <Card>
      <CardBody className="w-full flex items-center justify-center">
        {loading ? ( // Показуємо текст "Loading..." під час завантаження
          "Loading..."
        ) : !shared?.Id ? ( // Якщо не знайдено даних, тоді показуємо "404 - Not Found"
          "404 - Not Found"
        ) : (
          <div>
            <Image
              unoptimized
              alt="image"
              height={800}
              src={shared.Url}
              width={800}
            />
            <div className="flex w-full justify-between items-end">
              <ItemWithDescription className="mt-6" label={"Автор"}>
                {shared.Author.FirstName} {shared.Author.LastName}
              </ItemWithDescription>
              <div className="flex gap-2">
                <Tooltip content="Завантажити публікацію">
                  <Button
                    isIconOnly
                    startContent={<DownloadIcon stroke="currentColor" />}
                    onClick={() => {
                      const a = document.createElement("a");

                      a.download = shared.FileName;
                      a.href = shared.Url;
                      a.click();
                    }}
                  />
                </Tooltip>
                <Tooltip content="Відкрити публікацію в повноекранному режиму">
                  <Button
                    isIconOnly
                    startContent={<ExternalLinkIcon stroke="currentColor" />}
                    onClick={() => {
                      const a = document.createElement("a");

                      a.href = shared.Url;
                      a.click();
                    }}
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
