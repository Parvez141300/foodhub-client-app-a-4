// components/PrivacyPolicy.tsx
"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Ban,
  Baby,
  Calendar,
  Clock,
  Cookie,
  CreditCard,
  Database,
  Download,
  Eye,
  Globe,
  Key,
  Lock,
  Mail,
  Pause,
  Pencil,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Store,
  Trash2,
  UserRound,
  Users,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Section = {
  id: string;
  number: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  body: ReactNode;
};

const pillars = [
  { icon: ShieldCheck, label: "Encrypted in transit & at rest" },
  { icon: Clock, label: "30-day response to requests" },
  { icon: Lock, label: "PCI-DSS compliant payments" },
  { icon: Ban, label: "We never sell your data" },
];

const rights = [
  {
    icon: Eye,
    title: "Access",
    text: "Request a copy of the personal data we hold about you.",
  },
  {
    icon: Pencil,
    title: "Correct",
    text: "Fix inaccurate or incomplete information.",
  },
  {
    icon: Trash2,
    title: "Erase",
    text: "Ask us to delete data we no longer need.",
  },
  {
    icon: Pause,
    title: "Restrict",
    text: "Limit or object to certain processing.",
  },
  {
    icon: Download,
    title: "Portability",
    text: "Receive your data in a machine-readable format.",
  },
  {
    icon: XCircle,
    title: "Withdraw",
    text: "Withdraw consent at any time, without penalty.",
  },
];

const retention = [
  {
    data: "Account data",
    period: "Active + 24 months",
    reason: "Service continuity",
  },
  {
    data: "Order & transaction records",
    period: "7 years",
    reason: "Tax & accounting",
  },
  { data: "Support tickets", period: "3 years", reason: "Dispute resolution" },
  {
    data: "Server & security logs",
    period: "90 days",
    reason: "Security & debugging",
  },
];

const sections: Section[] = [
  {
    id: "introduction",
    number: "01",
    title: "Introduction",
    icon: ShieldCheck,
    body: (
      <p>
        Feasto (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your
        privacy. This policy explains what personal data we collect through the
        Feasto website and applications, how we use it, who we share it with,
        and the rights you have. Feasto is the data controller for the personal
        data described here.
      </p>
    ),
  },
  {
    id: "data-we-collect",
    number: "02",
    title: "Data We Collect",
    icon: Database,
    body: (
      <Tabs defaultValue="customers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="admins">Admins</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="mt-4">
          <ul className="list-disc space-y-1.5 pl-5 marker:text-primary">
            <li>Account details: name, email, phone, hashed password.</li>
            <li>
              Delivery information: saved addresses, contact number,
              instructions.
            </li>
            <li>Order data: items ordered, history, ratings and reviews.</li>
            <li>
              Payment data: tokenised method plus brand, last four digits, and
              expiry — never full card numbers or CVV codes.
            </li>
          </ul>
        </TabsContent>

        <TabsContent value="providers" className="mt-4">
          <ul className="list-disc space-y-1.5 pl-5 marker:text-primary">
            <li>
              Business details: name, contact person, address, food licence, tax
              ID.
            </li>
            <li>
              Payout details: bank account information and payout history.
            </li>
            <li>
              Menu and order data: items, prices, availability, fulfilment
              records.
            </li>
          </ul>
        </TabsContent>

        <TabsContent value="admins" className="mt-4">
          <ul className="list-disc space-y-1.5 pl-5 marker:text-primary">
            <li>Work contact details and permission level.</li>
            <li>Audit logs of administrative actions on the platform.</li>
          </ul>
        </TabsContent>
      </Tabs>
    ),
  },
  {
    id: "how-we-use",
    number: "03",
    title: "How We Use Your Data",
    icon: Sparkles,
    body: (
      <ul className="list-disc space-y-1.5 pl-5 marker:text-primary">
        <li>Create and manage accounts and verify identity.</li>
        <li>Process, route, and deliver orders, and send status updates.</li>
        <li>Process payments to Feasto and payouts to providers.</li>
        <li>Provide customer support and resolve disputes or refunds.</li>
        <li>Personalise menus, recommendations, and search results.</li>
        <li>Detect and prevent fraud, abuse, and security incidents.</li>
        <li>Comply with legal, tax, and accounting obligations.</li>
        <li>Improve platform performance and features.</li>
        <li>
          Send marketing communications where permitted — you can opt out at any
          time.
        </li>
      </ul>
    ),
  },
  {
    id: "sharing",
    number: "04",
    title: "How We Share Data",
    icon: Users,
    body: (
      <>
        <ul className="list-disc space-y-1.5 pl-5 marker:text-primary">
          <li>
            <strong className="font-medium text-foreground">Providers</strong> —
            the information needed to prepare and deliver your meals.
          </li>
          <li>
            <strong className="font-medium text-foreground">
              Payment processors
            </strong>{" "}
            — to charge customers and pay providers.
          </li>
          <li>
            <strong className="font-medium text-foreground">
              Service providers
            </strong>{" "}
            — hosting, analytics, email, and SMS, bound by data-processing
            agreements.
          </li>
          <li>
            <strong className="font-medium text-foreground">Authorities</strong>{" "}
            — where required by law or to protect user safety.
          </li>
          <li>
            <strong className="font-medium text-foreground">
              A successor entity
            </strong>{" "}
            — in connection with a merger, acquisition, or sale of assets.
          </li>
        </ul>
        <p className="mt-3 font-medium text-foreground">
          We do not sell your personal data.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    number: "05",
    title: "Cookies and Similar Technologies",
    icon: Cookie,
    body: (
      <>
        <ul className="list-disc space-y-1.5 pl-5 marker:text-primary">
          <li>
            <strong className="font-medium text-foreground">
              Strictly necessary
            </strong>{" "}
            — session management, authentication, and security.
          </li>
          <li>
            <strong className="font-medium text-foreground">Functional</strong>{" "}
            — remembering language, saved address, and preferences.
          </li>
          <li>
            <strong className="font-medium text-foreground">Analytics</strong> —
            understanding how the platform is used so we can improve it.
          </li>
          <li>
            <strong className="font-medium text-foreground">Marketing</strong> —
            measuring campaigns and showing relevant offers.
          </li>
        </ul>
        <p className="mt-3">
          You can manage non-essential cookies through your browser or the
          cookie banner. Disabling certain cookies may affect functionality.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    number: "06",
    title: "Data Retention",
    icon: Clock,
    body: (
      <>
        <p className="mb-4">
          We keep personal data only as long as necessary for the purposes
          described in this policy.
        </p>
        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold text-foreground">
                  Data
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Retention
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Reason
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {retention.map((r) => (
                <TableRow key={r.data}>
                  <TableCell className="font-medium text-foreground">
                    {r.data}
                  </TableCell>
                  <TableCell>{r.period}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {r.reason}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3">
          After the applicable period, data is securely deleted or anonymised.
        </p>
      </>
    ),
  },
  {
    id: "security",
    number: "07",
    title: "Security",
    icon: Key,
    body: (
      <p>
        We protect your data using encryption in transit (TLS), encryption at
        rest, hashed passwords, least-privilege access controls, audit logging,
        and regular backups. No system is completely secure — if you suspect
        your account has been compromised, contact{" "}
        <a
          href="mailto:security@feasto.app"
          className="font-medium text-primary underline underline-offset-4"
        >
          security@feasto.app
        </a>
        .
      </p>
    ),
  },
  {
    id: "rights",
    number: "08",
    title: "Your Rights",
    icon: UserRound,
    body: (
      <>
        <p className="mb-4">
          Depending on your location, you may have the right to:
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {rights.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="flex gap-3 rounded-lg border border-border bg-muted/30 p-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background text-primary ring-1 ring-border">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {r.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{r.text}</p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-4">
          To exercise these rights, email{" "}
          <a
            href="mailto:privacy@feasto.app"
            className="font-medium text-primary underline underline-offset-4"
          >
            privacy@feasto.app
          </a>
          . We respond within 30 days and may need to verify your identity
          first.
        </p>
      </>
    ),
  },
  {
    id: "children",
    number: "09",
    title: "Children's Privacy",
    icon: Baby,
    body: (
      <p>
        Feasto is not intended for anyone under 18. We do not knowingly collect
        personal data from children. If you believe a child has provided us with
        personal data, contact us and we will delete it.
      </p>
    ),
  },
  {
    id: "international",
    number: "10",
    title: "International Transfers",
    icon: Globe,
    body: (
      <p>
        Your data may be processed in countries other than your own. Where we
        transfer data internationally, we rely on appropriate safeguards such as
        adequacy decisions or standard contractual clauses.
      </p>
    ),
  },
  {
    id: "changes",
    number: "11",
    title: "Changes to This Policy",
    icon: RefreshCw,
    body: (
      <p>
        We may update this policy from time to time. The revised version will be
        posted on this page with an updated date, and material changes will be
        communicated via email or in-app notice.
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

export default function PrivacyPolicyPage() {
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
              <ShieldCheck className="h-3.5 w-3.5" />
              Privacy
            </Badge>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Privacy <span className="text-primary">Policy</span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              What we collect, how we use it, who we share it with, and the
              controls you have over your data on Feasto.
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
                <Link href="/terms-and-conditions">
                  Read Terms and Conditions
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* PILLARS */}
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.label}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {p.label}
                    </p>
                  </div>
                );
              })}
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
                      Contact our Data Protection Officer
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      For privacy questions or data requests.
                    </p>
                  </div>
                </div>
                <Button asChild className="shrink-0">
                  <a href="mailto:privacy@feasto.app">Email privacy team</a>
                </Button>
              </CardContent>
            </Card>

            <p className="pt-2 text-xs leading-6 text-muted-foreground">
              This document is a template for informational purposes and does
              not constitute legal advice. See also our{" "}
              <Link
                href="/terms"
                className="text-primary underline underline-offset-4"
              >
                Terms and Conditions
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
