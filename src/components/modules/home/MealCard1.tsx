

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MealCard1 = () => {
  return (
    <div className={"block max-w-md transition-opacity hover:opacity-80"}>
      <Card className="h-full overflow-hidden p-0">
        <CardHeader className="relative block p-0">
          <AspectRatio ratio={1.268115942} className="overflow-hidden">
            {/* <img
              src={PRODUCT_CARD.image.src}
              alt={PRODUCT_CARD.image.alt}
              className="block size-full object-cover object-center"
            /> */}
          </AspectRatio>
          <Badge className="absolute start-4 top-4">On Sell</Badge>
        </CardHeader>
        <CardContent className="flex h-full flex-col gap-4 pb-6">
          <CardTitle className="text-xl font-semibold">Burger</CardTitle>
          <CardDescription className="font-medium text-muted-foreground">
            This is burger kings most favoriet burger, with a juicy beef patty,
            melted cheese, fresh lettuce, ripe tomatoes, and our signature
            sauce, all nestled between a soft sesame seed bun.
          </CardDescription>
          <div className="mt-auto">
            <h3>5000</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MealCard1;
