import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

// {
//     "id": "XGyEl3WBuhGpx4DAT82DQKRvSnKlI3oF",
//     "name": "Abdullah",
//     "email": "abdullah@gmail.com",
//     "emailVerified": false,
//     "image": null,
//     "createdAt": "2026-01-30T15:05:38.739Z",
//     "updatedAt": "2026-01-30T15:05:38.739Z",
//     "role": "PROVIDER",
//     "phone": null,
//     "is_active": "ACTIVE"
// }

type ProviderCardType = {
  id: string;
  name: string;
  email: string;
  image: string;
  createdAt: string;
  role: string;
  is_active: string;
};

const ProviderCard = ({ provider }: { provider: ProviderCardType }) => {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={provider?.image || "https://avatar.vercel.sh/shadcn1"}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{provider?.is_active}</Badge>
        </CardAction>
        <CardTitle>{provider?.name}</CardTitle>
        <CardDescription className="flex flex-col">
          <span>Email: {provider?.email}</span>
          <span>Role: {provider?.role}</span>
          <span>
            Since: {new Date(provider.createdAt).toLocaleDateString()}
          </span>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">
          <Link href={`/providers/${provider?.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProviderCard;
