import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href={"/"} className={`${className}`}>
      <Image
        src={"/logo-image/feasto-logo.png"}
        alt="logo-image"
        width={100}
        height={100}
        loading="eager"
        className="rounded-full"
      />
    </Link>
  );
};

export default Logo;
