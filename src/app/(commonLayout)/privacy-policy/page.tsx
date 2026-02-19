import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays, Shield, Lock, Eye, UserCheck } from "lucide-react";

const privacyCards = [
  { icon: Shield, title: "Data Protection", description: "We use industry-standard security measures to protect your data" },
  { icon: Lock, title: "Encryption", description: "All sensitive data is encrypted during transmission and storage" },
  { icon: Eye, title: "Your Control", description: "You can access, modify, or delete your personal data anytime" },
  { icon: UserCheck, title: "GDPR Compliant", description: "We adhere to international privacy regulations" }
];

const dataCategories = [
  { type: "Personal Information", examples: "Name, email, phone number", purpose: "Account creation, communication" },
  { type: "Order History", examples: "Food orders, preferences", purpose: "Service improvement, recommendations" },
  { type: "Payment Information", examples: "Card details (processed securely)", purpose: "Transaction processing" },
  { type: "Location Data", examples: "Delivery address", purpose: "Order delivery" },
  { type: "Device Information", examples: "IP address, browser type", purpose: "Security, analytics" }
];

const usagePurposes = [
  "To process and deliver your food orders",
  "To communicate about orders and promotions",
  "To improve our services and user experience",
  "To prevent fraud and ensure platform security",
  "To comply with legal obligations"
];

const thirdPartySharing = [
  { party: "Food Providers", reason: "To fulfill your orders", data: "Name, order details, delivery address" },
  { party: "Payment Processors", reason: "To process payments securely", data: "Payment information" },
  { party: "Delivery Partners", reason: "For order delivery", data: "Name, phone, delivery address" },
  { party: "Analytics Services", reason: "To improve our service", data: "Usage data (anonymized)" }
];

const userRights = [
  { right: "Right to Access", description: "Request a copy of your data" },
  { right: "Right to Rectification", description: "Correct inaccurate data" },
  { right: "Right to Erasure", description: "Request data deletion" },
  { right: "Right to Restrict", description: "Limit data processing" },
  { right: "Right to Portability", description: "Transfer your data" }
];

const PrivacyPolicyPage = () => {
  return (
    <div>
      <Card className="border shadow-lg">
        <CardHeader className="space-y-4">
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
            <CardDescription className="text-base">
              How FoodHub collects, uses, and protects your personal information
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>Last Updated: February 19, 2026</span>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="mb-6" />
          <div>
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {privacyCards.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Card key={index} className="border-0 shadow-none">
                      <CardHeader className="p-0">
                        <Icon className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Information We Collect</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data Category</TableHead>
                      <TableHead>Examples</TableHead>
                      <TableHead>Purpose</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dataCategories.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.type}</TableCell>
                        <TableCell>{item.examples}</TableCell>
                        <TableCell>{item.purpose}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">How We Use Your Information</h3>
                <div className="grid gap-3">
                  {usagePurposes.map((purpose, index) => (
                    <Badge key={index} variant="outline" className="justify-start p-3 text-sm">
                      {purpose}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Information Sharing</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Third Party</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Data Shared</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {thirdPartySharing.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.party}</TableCell>
                        <TableCell>{item.reason}</TableCell>
                        <TableCell>{item.data}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <p className="text-sm text-muted-foreground mt-2">
                  We do not sell your personal information to third parties.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Your Rights</h3>
                <div className="space-y-3">
                  {userRights.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Badge>{item.right}</Badge>
                      <span className="text-sm text-muted-foreground">{item.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Cookies and Tracking</h3>
                <p className="text-muted-foreground">
                  We use cookies to enhance your experience. You can control cookie settings
                  through your browser. Essential cookies are necessary for platform functionality.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Children's Privacy</h3>
                <p className="text-muted-foreground">
                  FoodHub is not intended for users under 18. We do not knowingly collect
                  information from children. If you believe a child has provided us with data,
                  please contact us immediately.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Data Retention</h3>
                <p className="text-muted-foreground">
                  We retain your information as long as your account is active or as needed
                  to provide services. You may request deletion of your data at any time.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">International Data Transfers</h3>
                <p className="text-muted-foreground">
                  Your information may be transferred to servers in different countries.
                  We ensure appropriate safeguards are in place for such transfers.
                </p>
              </div>

              <div className="mt-8 rounded-lg bg-muted p-4">
                <h3 className="mb-2 font-semibold">Privacy Questions?</h3>
                <p className="text-sm text-muted-foreground">
                  Contact our Data Protection Officer:
                  <br />
                  Email: privacy@foodhub.com
                  <br />
                  Phone: +1 (555) 123-4567
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicyPage;