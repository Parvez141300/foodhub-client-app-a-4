"use client";

import { Heart, Menu, SearchIcon, ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { DashboardAvatar } from "./dashboard-avatar";
import { useEffect, useState } from "react";
import { env } from "@/env";
import LoadingCircleSpinner from "@/components/global/LoadingCircleSpinner";
import Logo from "@/components/global/Logo";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { usePathname, useRouter } from "next/navigation";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  session?: any;
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const NEXT_PUBLIC_AUTH_URL = env.NEXT_PUBLIC_AUTH_URL;

const Navbar1 = ({
  session: initialSession,
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Meals", url: "/meals" },
    { title: "Contact", url: "/contact" },
    { title: "Dashboard", url: "/dashboard" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
  },
  className,
}: Navbar1Props) => {
  const [session, setSession] = useState(initialSession);
  const [loading, setLoading] = useState(!!initialSession);
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        const session = await fetch(`${NEXT_PUBLIC_AUTH_URL}/get-session`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await session.json();
        setSession(data);
      } catch (error) {
        setSession(null);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    if (!initialSession) {
      fetchSession();
    }
  }, [initialSession]);
  console.log(session?.user);

  const handleLogout = async () => {
    setSession(null);
  };

  // search
  const handleSearch = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const search = form.search.value;
    const isMealsRoute = pathName === "/meals" || pathName.startsWith("/meals/");
    if(!isMealsRoute){
      router.push("/meals");
    }
    console.log("form search input", search);
  };

  return (
    <section className={cn("mb-4 border-b-2", className)}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Menu */}
        <div>
          <nav className="hidden items-center justify-between lg:flex">
            <div className="flex items-center gap-6">
              {/* Logo */}
              <Logo />
            </div>
            <div className="flex gap-2 items-center">
              {/* search */}
              <form onSubmit={handleSearch}>
                <InputGroup>
                  <InputGroupInput
                    name="search"
                    id="inline-start-input"
                    placeholder="Search..."
                  />
                  <InputGroupAddon align="inline-end">
                    <button type="submit" className="cursor-pointer">
                      <SearchIcon className="text-muted-foreground" />
                    </button>
                  </InputGroupAddon>
                </InputGroup>
              </form>
              {/* buttons */}
              <div className="flex gap-2">
                {/* theme switch */}
                <ModeToggle />
                {loading ? (
                  <LoadingCircleSpinner />
                ) : session?.user ? (
                  <>
                    <Button
                      variant={"outline"}
                      className="rounded-full w-8 h-8"
                    >
                      <Heart className="w-5 h-5" />
                    </Button>

                    <Button
                      variant={"outline"}
                      className="w-8 h-8 rounded-full"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </Button>

                    {/* after login avatar */}
                    <DashboardAvatar
                      userInfo={session?.user}
                      onLogout={handleLogout}
                    />
                  </>
                ) : (
                  <>
                    {/* login and register */}
                    <Button asChild variant="outline" size="sm">
                      <Link href={auth.login.url}>{auth.login.title}</Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link href={auth.signup.url}>{auth.signup.title}</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </nav>
          <div className="hidden lg:flex justify-between items-center">
            <div />
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo />
            <div className="flex items-center gap-2">
              {/* search */}
              <form onSubmit={handleSearch}>
                <InputGroup>
                  <InputGroupInput
                    name="search"
                    id="inline-start-input"
                    placeholder="Search..."
                  />
                  <InputGroupAddon align="inline-end">
                    <button type="submit" className="cursor-pointer">
                      <SearchIcon className="text-muted-foreground" />
                    </button>
                  </InputGroupAddon>
                </InputGroup>
              </form>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <Link href={logo.url} className="flex items-center gap-2">
                        <Image
                          src={logo.src}
                          className="max-h-8 dark:invert"
                          alt={logo.alt}
                          width={50}
                          height={50}
                        />
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 p-4">
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-4"
                    >
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>

                    <div className="flex justify-between items-center">
                      <ModeToggle />
                      {loading ? (
                        <LoadingCircleSpinner />
                      ) : session?.user ? (
                        <>
                          <Button
                            variant={"outline"}
                            className="rounded-full w-8 h-8"
                          >
                            <Heart className="w-5 h-5" />
                          </Button>
                          <Button
                            variant={"outline"}
                            className="w-8 h-8 rounded-full"
                          >
                            <ShoppingCart className="w-5 h-5" />
                          </Button>
                          {/* after login avatar */}
                          <DashboardAvatar
                            userInfo={session?.user}
                            onLogout={handleLogout}
                          />
                        </>
                      ) : (
                        <div className="flex items-center gap-3">
                          {/* login and register */}
                          <Button asChild variant="outline" size="sm">
                            <Link href={auth.login.url}>
                              {auth.login.title}
                            </Link>
                          </Button>
                          <Button asChild size="sm">
                            <Link href={auth.signup.url}>
                              {auth.signup.title}
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <Link
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </Link>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  return (
    <Link key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};

export { Navbar1 };
