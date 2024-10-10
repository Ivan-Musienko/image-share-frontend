import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Account {
  Id: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Avatar: string;
  Provider: string;
  SharedImages: SharedImage[];
}

export interface SharedImage {
  Id: number;
  Uuid: string;
  FileName: string;
  Url: string;
}
