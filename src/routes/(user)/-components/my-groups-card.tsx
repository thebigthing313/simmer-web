import { Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { Children } from "react";
import { GroupCard } from "@/components/blocks/group-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyTitle,
} from "@/components/ui/empty";
import { useGroups } from "@/db/hooks/use-groups";

export function MyGroupsCard() {
  const { query } = useGroups();
  const groups = query.data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Groups</CardTitle>
        <CardDescription>
          Groups that you have at least one role in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GroupCardGroup key="user-groups">
          {groups.map((group) => {
            return (
              <Link
                key={`link-${group.id}`}
                to="/$groupSlug"
                params={{ groupSlug: group.short_name }}
              >
                <GroupCard key={`gc-${group.id}`} group_id={group.id} />
              </Link>
            );
          })}
        </GroupCardGroup>
      </CardContent>
    </Card>
  );
}
interface GroupCardGroupProps {
  children?: React.ReactNode;
  className?: string;
}

function GroupCardGroup({ children, className }: GroupCardGroupProps) {
  const items = Children.toArray(children).filter(Boolean);
  if (items.length === 0) return <EmptyGroupCardGroup />;

  return (
    <div className={className}>
      <div className="flex flex-col gap-2">{children}</div>
      <div className="pt-2">
        <Link to="/create-group">
          <Button className="hover:cursor-pointer" size="sm" variant="outline">
            <PlusIcon /> Create New Group
          </Button>
        </Link>
      </div>
    </div>
  );
}

function EmptyGroupCardGroup() {
  return (
    <Empty key="empty-group-card-group" className="border border-dashed">
      <EmptyTitle>No Groups Found</EmptyTitle>
      <EmptyDescription>
        You can accept a group invite or create a new group to continue.
      </EmptyDescription>
      <EmptyContent>
        <Link to="/create-group">
          <Button className="hover:cursor-pointer" size="sm">
            <PlusIcon />
            Create New Group
          </Button>
        </Link>
      </EmptyContent>
    </Empty>
  );
}
