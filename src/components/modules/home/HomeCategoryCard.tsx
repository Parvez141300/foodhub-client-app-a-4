import { Card } from "@/components/ui/card";
import React from "react";

// {
//     "id": "e5e8b32f-b0cc-481d-9675-4b7c5d4d0308",
//     "name": "taco",
//     "creator_id": "5JQsuHRa3rwbeWHaannN8EJmSUd01uMH",
//     "created_at": "2026-03-02T10:11:05.772Z",
//     "updated_at": "2026-03-02T10:11:05.772Z",
//     "creator": {
//         "id": "5JQsuHRa3rwbeWHaannN8EJmSUd01uMH",
//         "name": "Parvez Hossain Alif",
//         "role": "ADMIN"
//     }
// }

type CategoryType = {
  id: string;
  name: string;
};

const HomeCategoryCard = ({ category }: { category: CategoryType }) => {
  return (
    <Card className="p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
      <span className="text-3xl font-bold uppercase">
        {category.name.charAt(0)}
      </span>
      <h3 className="font-semibold text-center capitalize line-clamp-2">
        {category.name}
      </h3>
    </Card>
  );
};

export default HomeCategoryCard;
