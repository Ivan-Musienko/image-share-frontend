import { UploadIcon } from "react-outline-icons";
import { Button } from "@nextui-org/button";
import React, { useRef, useState } from "react";

interface FileInputProps {
  name: string;
  className?: string;
}

export default function FileInputLarge({ name, className }: FileInputProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  return (
    <div className={className}>
      <Button
        className="!w-[160px] !h-[160px]"
        color="primary"
        variant="flat"
        onClick={() => fileRef.current?.click()}
      >
        <div className="grid gap-5 justify-items-center">
          <UploadIcon size={50} stroke="currentColor" />
          <p className="text-[14px] max-w-[140px] break-all text-wrap">
            {selectedFileName.length > 1 ? selectedFileName : "Choose file"}
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
