import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  HelpCircle,
  Shield,
  Utensils,
} from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "support@foodhub.com",
    subtext: "We'll respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "+88 01872243808",
    subtext: "Mon-Fri, 9am-6pm",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Ershad Nagar, Tongi, Gazipur",
    subtext: "Daka, Bangladesh",
  },
  {
    icon: Clock,
    title: "Business Hours",
    description: "Monday - Friday: 9am - 6pm",
    subtext: "Saturday - Sunday: 10am - 4pm",
  },
];

const faqData = [
  {
    question: "How do I place an order?",
    answer: "Simply browse restaurants, add items to your cart, and proceed to checkout. You'll need to create an account or log in to complete your order."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and digital wallets including Apple Pay and Google Pay."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is confirmed, you can track its status in real-time through your dashboard under 'My Orders'."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Orders can be cancelled within 5 minutes of placement without any charge. After that, please contact the restaurant directly."
  },
  {
    question: "How do I become a food provider?",
    answer: "Visit our 'Become a Partner' page or contact our partnerships team at partners@foodhub.com."
  }
];

const supportTopics = [
  { icon: Utensils, title: "Order Issues", description: "Problems with your order or delivery" },
  { icon: Shield, title: "Account & Security", description: "Login, password, or security concerns" },
  { icon: MessageSquare, title: "Feedback", description: "Suggestions to improve our service" },
  { icon: HelpCircle, title: "General Inquiry", description: "Other questions or concerns" },
];

const ContactPage = () => {
  return (
    <div>
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have questions? We're here to help. Reach out to us anytime.
        </p>
      </div>

      {/* Contact Methods Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
        {contactMethods.map((method, index) => {
          const Icon = method.icon;
          return (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-2">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <CardTitle className="text-lg">{method.title}</CardTitle>
                <CardDescription className="font-medium text-foreground">
                  {method.description}
                </CardDescription>
                <p className="text-sm text-muted-foreground">{method.subtext}</p>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="order">Order Issue</SelectItem>
                      <SelectItem value="account">Account & Security</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    className="min-h-30"
                  />
                </div>

                <Button type="submit" className="w-full sm:w-auto">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Support Topics & FAQ Preview */}
        <div className="space-y-6">
          {/* Support Topics */}
          <Card>
            <CardHeader>
              <CardTitle>Common Topics</CardTitle>
              <CardDescription>
                Choose a topic for faster assistance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {supportTopics.map((topic, index) => {
                const Icon = topic.icon;
                return (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">{topic.title}</h4>
                      <p className="text-sm text-muted-foreground">{topic.description}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* FAQ Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked</CardTitle>
              <CardDescription>
                Quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqData.slice(0, 3).map((faq, index) => (
                <div key={index} className="space-y-1">
                  <h4 className="font-medium text-sm">{faq.question}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{faq.answer}</p>
                </div>
              ))}
              <Separator />
              <Button variant="link" className="w-full" asChild>
                <span>View all FAQs →</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;