import { createFileRoute, Link } from "@tanstack/react-router";
import { Typography } from "@/components/typography";

export const Route = createFileRoute("/no-access")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-lg flex flex-col gap-2">
      <Typography tag="h3">Access Denied</Typography>
      <Typography tag="h4">
        Sorry you do not have access to this group.
      </Typography>
      <Typography tag="h4">
        Please contact the group administrator for an invite.
      </Typography>
      <Link to="/select-group">Select Another Group</Link>
    </div>
  );
}
