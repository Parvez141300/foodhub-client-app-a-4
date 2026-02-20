import { NextResponse, NextRequest } from 'next/server';
import { userServices } from './services/user.service';
import { Roles } from './constants/roles';

export const proxy = async (req: NextRequest) => {
    const pathName = req.nextUrl.pathname;
    let isAdmin = false;
    let isCustomer = false;
    let isProvider = false;
    let isAuthenticated = false;
    let session = await userServices.getSession();
    if (session) {
        isAuthenticated = true;
        isAdmin = session?.user.role === Roles.ADMIN;
        isCustomer = session?.user.role === Roles.CUSTOMER;
        isProvider = session?.user.role === Roles.PROVIDER;
    }
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    // admin dashboard route
    if (isAdmin && (pathName.startsWith('/dashboard') || pathName.startsWith('/customer-dashboard') || pathName.startsWith('/provider-dashboard'))) {
        return NextResponse.redirect(new URL("/admin-dashboard", req.url));
    }
    // customer dashboard route
    if (isCustomer && (pathName.startsWith('/dashboard') || pathName.startsWith('/admin-dashboard') || pathName.startsWith('/provider-dashboard'))) {
        return NextResponse.redirect(new URL("/customer-dashboard", req.url));
    }
    // provider dashboard route
    if (isProvider && (pathName.startsWith('/dashboard') || pathName.startsWith('/admin-dashboard') || pathName.startsWith('/customer-dashboard'))) {
        return NextResponse.redirect(new URL("/provider-dashboard", req.url));
    }
    NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard', '/dashboard/:path*', '/admin-dashboard', '/admin-dashboard/:path*', '/customer-dashboard', '/customer-dashboard/:path*', '/provider-dashboard', '/provider-dashboard/:path*'
    ],
}