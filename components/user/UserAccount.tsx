import React from "react";
import { Spinner } from "@nextui-org/spinner";
import { Button } from "@nextui-org/button";
import { UserSquareIcon } from "react-outline-icons";
import { Avatar } from "@nextui-org/avatar";

import ItemWithDescription from "../ui/ItemWithDescription";
import AccountUpdateModal from "../modals/AccountUpdateModal";

import { useAccountContext } from "@/contexts/AccountContext";
import { useModalContext } from "@/contexts/modalContext";

export default function UserAccount() {
  const { account } = useAccountContext();
  const { setModal } = useModalContext();

  return (
    <div className="w-full">
      {account ? (
        <div className="grid">
          <div className="flex items-center justify-between">
            <Avatar
              alt="Avatar"
              className="!w-[67px] !h-[67px] text-large"
              src={account.Avatar}
            />
            <div>
              <ItemWithDescription label="Електронна скринька">
                {account.Email}
              </ItemWithDescription>
              <div className="flex gap-2">
                <ItemWithDescription label="Ім'я">
                  {account.FirstName}
                </ItemWithDescription>
                <ItemWithDescription label="Фамілія">
                  {account.LastName || "Відсутня"}
                </ItemWithDescription>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <Button
              color="secondary"
              startContent={<UserSquareIcon stroke="currentColor" />}
              variant="flat"
              onClick={() => {
                setModal({
                  modalHeader: "Редагування облікового запису",
                  modalBody: <AccountUpdateModal />,
                });
              }}
            >
              Редагувати обліковий запис
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <Spinner color="primary" />
        </div>
      )}
    </div>
  );
}
