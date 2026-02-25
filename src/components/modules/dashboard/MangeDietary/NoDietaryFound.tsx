import { UsersIcon } from "lucide-react";

const NoDietaryFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <UsersIcon className="h-8 w-8 text-muted-foreground" />
      </div>

      <h3 className="text-lg font-semibold">No dietaries found</h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        We couldn't find any dietary matching your criteria. Try adjusting your search or filters.
      </p>
    </div>
  );
};

export default NoDietaryFound;