"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { ExitIcon, User01Icon } from "react-outline-icons";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useAccountContext } from "@/contexts/AccountContext";
export default function NavHeader() {
  const { account, setAccount } = useAccountContext();
  const router = useRouter();

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">Image share</p>
      </NavbarBrand>
      <NavbarContent className="gap-4" justify="end">
        <NavbarItem>
          {account ? (
            <Dropdown>
              <DropdownTrigger>
                <Avatar src={account.Avatar} />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  startContent={<User01Icon stroke="currentColor" />}
                  onClick={() => {
                    router.replace("/account");
                  }}
                >
                  Обліковий запис
                </DropdownItem>
                <DropdownItem
                  color="danger"
                  startContent={<ExitIcon stroke="currentColor" />}
                  onClick={() => {
                    axios.get("/api/auth/logout").then(() => {
                      setAccount(null);
                      document.cookie = "";
                      router.replace("/auth");
                    });
                  }}
                >
                  Вийти з облікового запису
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            ""
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
