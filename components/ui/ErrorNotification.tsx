import React from "react";
import { CircleWarningIcon } from "react-outline-icons";

export default function ErrorNotification({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <p className={`text-danger flex align-middle gap-1 ${className}`}>
      <CircleWarningIcon className=" inline" stroke="currentColor" />
      Помилка: {message}
    </p>
  );
}
