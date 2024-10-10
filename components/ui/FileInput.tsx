import { Button } from "@nextui-org/button";
import React, { useRef, useState } from "react";

interface FileInputProps {
  name: string;
}

export default function FileInputLine({
  name,
  color = "default",
  className,
}: {
  color?:
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";
  className?: string;
} & FileInputProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  return (
    <div className={className}>
      <Button
        className={className}
        color={color}
        variant="flat"
        onClick={() => fileRef.current?.click()}
      >
        <div className="grid gap-5 justify-items-center">
          <p className="text-[14px] max-w-[140px] break-all text-wrap">
            {selectedFileName.length > 1 ? selectedFileName : " Виберіть файл"}
          </p>
        </div>
      </Button>
      <input
        ref={fileRef}
        className="hidden"
        name={name}
        type="file"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (event?.target?.files?.length) {
            setSelectedFileName(event.target.files[0].name);
          }
        }}
      />
    </div>
  );
}
