// components/TermsAndConditions.tsx
"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Ban,
  Calendar,
  CheckCircle2,
  Copyright,
  Gavel,
  HandCoins,
  Mail,
  Receipt,
  RefreshCw,
  Scale,
  ShieldCheck,
  ShoppingBag,
  Store,
  Truck,
  UserCheck,
  Users,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Section = {
  id: string;
  number: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  body: ReactNode;
};

const sections: Section[] = [
  {
    id: "acceptance",
    number: "01",
    title: "Acceptance of Terms",
    icon: CheckCircle2,
    body: (
      <p>
        These Terms and Conditions (&quot;Terms&quot;) govern your access to and
        use of Feasto — a platform for browsing menus, placing meal orders,
        managing menus, and fulfilling orders. By creating an account, placing
        an order, listing a menu, or otherwise using the platform, you agree to
        these Terms and to our{" "}
        <Link
          href="/privacy"
          className="font-medium text-primary underline underline-offset-4"
        >
          Privacy Policy
        </Link>
        .
      </p>
    ),
  },
  {
    id: "accounts",
    number: "02",
    title: "Accounts and Eligibility",
    icon: UserCheck,
    body: (
      <>
        <p>
          You must be at least 18 years old and legally able to enter into
          binding contracts to use Feasto.
        </p>
        <ul className="list-disc space-y-1.5 pl-5 marker:text-primary">
          <li>
            Provide accurate registration information and keep it up to date.
          </li>
          <li>
            Keep your password confidential; you are responsible for all
            activity under your account.
          </li>
          <li>
            Notify us immediately at{" "}
            <a
              className="text-primary underline underline-offset-4"
              href="mailto:support@feasto.app"
            >
              support@feasto.app
            </a>{" "}
            if you suspect unauthorized access.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "ordering",
    number: "03",
    title: "Ordering and Payments",
    icon: ShoppingBag,
    body: (
      <>
        <p>
          Placing an order is an offer to purchase meals from the relevant
          provider. An order is confirmed only after the provider accepts it and
          you receive a confirmation.
        </p>
        <ul className="list-disc space-y-1.5 pl-5 marker:text-primary">
          <li>
            Prices, delivery fees, service fees, and applicable taxes are shown
            at checkout.
          </li>
          <li>Payments are processed by third-party payment providers.</li>
          <li>Feasto never stores full card numbers or CVV codes.</li>
        </ul>
      </>
    ),
  },
  {
    id: "providers",
    number: "04",
    title: "Provider Responsibilities",
    icon: Store,
    body: (
      <>
        <p>
          Providers are independent businesses — not employees, agents, or
          partners of Feasto. Each provider is solely responsible for the meals
          it prepares.
        </p>
        <ul className="list-disc space-y-1.5 pl-5 marker:text-primary">
          <li>Hold valid food-handling and business licences.</li>
          <li>Describe menu items accurately, including allergens.</li>
          <li>Keep availability, pricing, and preparation times up to date.</li>
          <li>Accept, decline, or fulfil incoming orders promptly.</li>
        </ul>
      </>
    ),
  },
  {
    id: "delivery",
    number: "05",
    title: "Delivery and Risk",
    icon: Truck,
    body: (
      <p>
        Estimated delivery and pickup times are estimates only and may be
        affected by weather, traffic, and order volume. Risk in the meals passes
        to the customer upon delivery at the provided address or upon collection
        for pickup orders.
      </p>
    ),
  },
  {
    id: "refunds",
    number: "06",
    title: "Cancellations and Refunds",
    icon: Receipt,
    body: (
      <>
        <p>
          The cancellation window is shown at checkout. Once a provider begins
          preparing an order, cancellation may no longer be possible.
        </p>
        <p>
          If an order is missing, incorrect, or spoiled, contact support within
          24 hours. Refunds are issued at Feasto&apos;s discretion after review.
        </p>
      </>
    ),
  },
  {
    id: "fees",
    number: "07",
    title: "Fees, Commissions, and Payouts",
    icon: HandCoins,
    body: (
      <ul className="list-disc space-y-1.5 pl-5 marker:text-primary">
        <li>
          Feasto may charge providers a commission per order and/or recurring
          subscription fees, as disclosed in the provider agreement.
        </li>
        <li>
          Payouts are made on a weekly cycle, net of commissions and
          adjustments.
        </li>
        <li>
          Feasto may deduct refunds and chargeback fees from future payouts.
        </li>
        <li>
          Providers are responsible for their own taxes and regulatory
          compliance.
        </li>
      </ul>
    ),
  },
  {
    id: "conduct",
    number: "08",
    title: "Acceptable Use",
    icon: Ban,
    body: (
      <>
        <p>You agree not to:</p>
        <ul className="list-disc space-y-1.5 pl-5 marker:text-primary">
          <li>Use Feasto for unlawful, fraudulent, or deceptive purposes.</li>
          <li>Place orders you do not intend to pay for.</li>
          <li>Scrape, reverse engineer, or interfere with the platform.</li>
          <li>
            Impersonate another person, business, or Feasto representative.
          </li>
          <li>
            Post abusive, defamatory, discriminatory, or misleading content.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "ip",
    number: "09",
    title: "Intellectual Property",
    icon: Copyright,
    body: (
      <p>
        The Feasto name, logo, software, design, and content we create are owned
        by Feasto or its licensors and protected by intellectual-property laws.
        You may not copy, modify, distribute, or create derivative works without
        prior written permission.
      </p>
    ),
  },
  {
    id: "liability",
    number: "10",
    title: "Limitation of Liability",
    icon: ShieldCheck,
    body: (
      <>
        <p>
          To the maximum extent permitted by law, Feasto is not liable for
          indirect, incidental, special, or consequential damages, or loss of
          profits, data, or goodwill.
        </p>
        <p>
          Our total aggregate liability shall not exceed the greater of the
          amount you paid to Feasto in the six months preceding the claim or USD
          100. Nothing here limits liability that cannot be limited by law.
        </p>
      </>
    ),
  },
  {
    id: "termination",
    number: "11",
    title: "Suspension and Termination",
    icon: Gavel,
    body: (
      <p>
        We may suspend or terminate your account for breaches of these Terms,
        legal requirements, or to protect the platform and its users. You may
        close your account at any time from your account settings. Provisions
        that by nature should survive termination — including IP, disclaimers,
        and liability — will continue to apply.
      </p>
    ),
  },
  {
    id: "changes",
    number: "12",
    title: "Changes to These Terms",
    icon: RefreshCw,
    body: (
      <p>
        We may update these Terms from time to time. Material changes will be
        communicated via email or in-app notice before they take effect.
        Continued use of Feasto after the effective date constitutes acceptance.
      </p>
    ),
  },
];

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -65% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

export default function TermsAndConditionsPage() {
  const ids = sections.map((s) => s.id);
  const active = useActiveSection(ids);

  return (
    <main className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-linear-to-b from-primary/5 via-background to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {/* HERO */}
        <header className="py-12 sm:py-16">
          <div className="flex flex-col gap-5">
            <Badge
              variant="secondary"
              className="w-fit gap-1.5 rounded-full px-3 py-1"
            >
              <Scale className="h-3.5 w-3.5" />
              Legal
            </Badge>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Terms and <span className="text-primary">Conditions</span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              The ground rules for ordering meals, running a kitchen, and
              managing the Feasto platform.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline" className="gap-1.5 rounded-full">
                <Calendar className="h-3.5 w-3.5" />
                Last updated Jan 15, 2025
              </Badge>
              <Separator
                orientation="vertical"
                className="hidden h-5 sm:block"
              />
              <Button
                variant="link"
                asChild
                className="h-auto p-0 text-primary"
              >
                <Link href="/privacy">
                  Read Privacy Policy
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* BODY */}
        <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
          {/* TOC */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                On this page
              </p>
              <ul className="space-y-1 border-l border-border">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={cn(
                        "-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors",
                        active === s.id
                          ? "border-primary font-medium text-primary"
                          : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                      )}
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* CONTENT */}
          <div className="min-w-0 space-y-6">
            <Alert className="border-primary/30 bg-primary/5">
              <AlertTriangle className="text-primary" />
              <AlertTitle>Please read carefully</AlertTitle>
              <AlertDescription>
                By using Feasto you are agreeing to these Terms. If you do not
                agree, you must stop using the platform.
              </AlertDescription>
            </Alert>

            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <Card
                  key={s.id}
                  id={s.id}
                  className="relative scroll-mt-24 overflow-hidden border-border/70 shadow-sm transition-colors hover:border-primary/30"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-2 -top-4 select-none text-[7rem] font-black leading-none text-primary/4"
                  >
                    {s.number}
                  </span>

                  <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                        Section {s.number}
                      </span>
                      <CardTitle className="text-xl leading-tight">
                        {s.title}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3 text-[15px] leading-7 text-foreground/90">
                    {s.body}
                  </CardContent>
                </Card>
              );
            })}

            {/* CONTACT CARD */}
            <Card className="overflow-hidden border-primary/20 bg-linear-to-br from-primary/5 via-card to-card">
              <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Questions about these Terms?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Our legal team usually replies within two business days.
                    </p>
                  </div>
                </div>
                <Button asChild className="shrink-0">
                  <a href="mailto:legal@feasto.app">Contact legal</a>
                </Button>
              </CardContent>
            </Card>

            <p className="pt-2 text-xs leading-6 text-muted-foreground">
              This document is a template for informational purposes and does
              not constitute legal advice. Have it reviewed by a qualified
              lawyer in your jurisdiction before publishing.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
