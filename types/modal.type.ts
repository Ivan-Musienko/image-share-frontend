import { ReactNode } from "react";

export interface IModal {
  modalHeader?: ReactNode;
  modalBody?: ReactNode;
  modalFooter?: ReactNode;
  modalSize?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "xs"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full"
    | undefined;
}
