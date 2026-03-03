import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LogoImage from "../../../public/logo-image/eat-food-bd-logo.png"

const Logo = () => {
    return (
        <Link href={'/'}>
            <Image src={LogoImage} alt='logo-image' height={80} width={80} className='rounded-full' />
        </Link>
    );
};

export default Logo;