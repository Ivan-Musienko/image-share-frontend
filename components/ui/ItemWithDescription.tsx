import React, { ReactNode } from "react";

export default function ItemWithDescription({
  label,
  children,
  className,
}: {
  label: ReactNode | string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <span className={` text-default-500 text-sm`}>{label}</span>
      <div>{children}</div>
    </div>
  );
}
