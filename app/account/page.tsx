"use client";
import { Card, CardBody } from "@nextui-org/card";
import React from "react";
import { Tab, Tabs } from "@nextui-org/tabs";
import { UploadIcon, UserCircleIcon } from "react-outline-icons";

import UserAccount from "@/components/user/UserAccount";
import UserShare from "@/components/user/UserShare";

export default function Page() {
  return (
    <div className="flex flex-col w-full items-center">
      <Card className="max-w-full w-max h-max">
        <CardBody className="overflow-hidden w-full flex justify-center">
          <Tabs color="primary">
            <Tab
              key={"account"}
              title={
                <div className="flex items-center space-x-2">
                  <UserCircleIcon stroke="currentColor" />
                  <span>Обліковий запис</span>
                </div>
              }
            >
              <UserAccount />
            </Tab>
            <Tab
              key={"shared"}
              title={
                <div className="flex items-center space-x-2">
                  <UploadIcon stroke="currentColor" />
                  <span>Публікації</span>
                </div>
              }
            >
              <UserShare />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
