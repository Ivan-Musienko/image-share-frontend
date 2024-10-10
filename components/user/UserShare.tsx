"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { CopyIcon, ShareIOSIcon, Trash01Icon } from "react-outline-icons";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Tooltip } from "@nextui-org/tooltip";

import NewShareModal from "../modals/NewShareModal";
import DeleteShareImage from "../modals/DeleteShareImageModal";

import { useAccountContext } from "@/contexts/AccountContext";
import { useModalContext } from "@/contexts/modalContext";

export default function UserShare() {
  const { account } = useAccountContext();
  const { setModal } = useModalContext();

  return (
    <div>
      <div>
        <Button
          color="secondary"
          size="sm"
          startContent={<ShareIOSIcon stroke="currentColor" />}
          variant="flat"
          onClick={() => {
            setModal({
              modalHeader: "Нова публікація",
              modalBody: <NewShareModal />,
            });
          }}
        >
          Нова публікація
        </Button>
      </div>
      <div className="flex gap-4 mt-5 max-h-[600px] overflow-y-auto shrink-0 flex-wrap max-w-[700px] justify-between">
        {account?.SharedImages.length != 0 ? (
          account?.SharedImages.reverse().map((image) => {
            return (
              <Card key={image.Uuid}>
                <CardHeader>
                  <Image
                    unoptimized
                    alt="shared image"
                    height={300}
                    src={image.Url}
                    width={300}
                  />
                </CardHeader>
                <CardBody className="flex gap-3 flex-row-reverse">
                  <Tooltip color="danger" content="Видалити публікацію">
                    <Button
                      isIconOnly
                      color="danger"
                      startContent={<Trash01Icon stroke="currentColor" />}
                      onClick={() => {
                        setModal({
                          modalHeader: "Видалити публікацію?",
                          modalSize: "sm",
                          modalBody: <DeleteShareImage uuid={image.Uuid} />,
                        });
                      }}
                    />
                  </Tooltip>
                  <Tooltip color="primary" content="Скопіювати посилання">
                    <Button
                      isIconOnly
                      color="primary"
                      startContent={<CopyIcon stroke="currentColor" />}
                      onClick={() => {
                        navigator.clipboard.writeText(image.Url);
                      }}
                    />
                  </Tooltip>
                </CardBody>
              </Card>
            );
          })
        ) : (
          <p className="mt-4 text-default-600">
            На данний момент у вас нема публікацій
          </p>
        )}
      </div>
    </div>
  );
}
