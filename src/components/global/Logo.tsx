import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoImage from "../../../public/logo-image/eat-food-bd-logo.png";

const Logo = () => {
  return (
    <Link href={"/"}>
      <Image
        src={LogoImage}
        alt="logo-image"
        height={60}
        width={60}
        loading="eager"
        className="rounded-full"
      />
    </Link>
  );
};

export default Logo;
