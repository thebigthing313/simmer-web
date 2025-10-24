import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$groupSlug/(app)/collections/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col">
      <div>Viewing All Collections</div>
      <div>Collection Filters</div>
      <div>Collection List</div>
    </div>
  );
}
