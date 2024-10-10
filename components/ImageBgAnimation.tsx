"use client";
import React from "react";
import Image from "next/image";
export default function ImageBgAnimation() {
  return (
    <Image
      fill
      unoptimized
      alt="background"
      className=" blur-sm opacity-20 !h-[900px]"
      src={"/png/purple_wawy.png"}
    />
  );
}
