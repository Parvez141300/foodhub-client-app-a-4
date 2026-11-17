import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="shadow-lg shadow-accent">
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
