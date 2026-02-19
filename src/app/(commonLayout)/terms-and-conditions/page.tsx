import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, InfoIcon } from "lucide-react";

const termsData = [
  {
    id: "item-1",
    title: "1. Acceptance of Terms",
    content: "By creating an account or using FoodHub, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, please do not use our services."
  },
  {
    id: "item-2",
    title: "2. User Accounts and Registration",
    content: [
      "2.1. You must be at least 18 years old to use FoodHub.",
      "2.2. You are responsible for maintaining the confidentiality of your account.",
      "2.3. You agree to provide accurate and complete information when creating an account.",
      "2.4. FoodHub reserves the right to suspend or terminate accounts that violate these terms."
    ]
  },
  {
    id: "item-3",
    title: "3. Ordering and Payment",
    content: [
      "3.1. All orders placed through FoodHub are subject to acceptance by the food provider.",
      "3.2. Prices are listed in the local currency and are subject to change without notice.",
      "3.3. Payment must be made at the time of ordering through our secure payment system.",
      "3.4. FoodHub acts as an intermediary and is not responsible for the quality of food provided."
    ]
  },
  {
    id: "item-4",
    title: "4. Cancellations and Refunds",
    content: [
      "4.1. Orders can be cancelled within 5 minutes of placement without any charge.",
      "4.2. Refund requests must be submitted within 24 hours of delivery.",
      "4.3. Each refund request will be reviewed on a case-by-case basis.",
      "4.4. FoodHub reserves the right to deny refund requests that violate our policies."
    ]
  },
  {
    id: "item-5",
    title: "5. Provider Responsibilities",
    content: [
      "5.1. Providers must maintain accurate menu information and pricing.",
      "5.2. All food items must meet local health and safety standards.",
      "5.3. Providers are responsible for timely order preparation and delivery.",
      "5.4. Any issues with orders must be resolved directly with customers."
    ]
  },
  {
    id: "item-6",
    title: "6. Intellectual Property",
    content: "All content on FoodHub, including logos, designs, and software, is the property of FoodHub and protected by copyright laws. You may not use our intellectual property without prior written consent."
  },
  {
    id: "item-7",
    title: "7. Limitation of Liability",
    content: "FoodHub shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform. Our total liability shall not exceed the amount paid by you for the specific order in question."
  },
  {
    id: "item-8",
    title: "8. Changes to Terms",
    content: "We reserve the right to modify these terms at any time. Continued use of FoodHub after changes constitutes acceptance of the new terms. We will notify users of significant changes via email or platform notification."
  }
];

const TermsAndConditionsPage = () => {
  return (
    <div className="">
      <Card className="border shadow-lg">
        <CardHeader className="space-y-4">
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold">Terms and Conditions</CardTitle>
            <CardDescription className="text-base">
              Please read these terms and conditions carefully before using FoodHub
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
              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Welcome to FoodHub!</AlertTitle>
                <AlertDescription>
                  By accessing or using our platform, you agree to be bound by these Terms.
                </AlertDescription>
              </Alert>

              <Accordion type="single" collapsible className="w-full">
                {termsData.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent>
                      {Array.isArray(item.content) ? (
                        <div className="space-y-4 text-muted-foreground">
                          {item.content.map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">{item.content}</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-8 rounded-lg bg-muted p-4">
                <h3 className="mb-2 font-semibold">Contact Information</h3>
                <p className="text-sm text-muted-foreground">
                  For questions about these Terms, please contact us at:
                  <br />
                  Email: parvezhossain744471@gmail.com
                  <br />
                  Address: Tongi, Gazipur, Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsAndConditionsPage;