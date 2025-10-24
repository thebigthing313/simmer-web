import { parsePhoneNumber } from "libphonenumber-js/min";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { useGroup } from "@/db/hooks/use-group";

interface GroupCardProps {
  group_id: string;
  className?: string;
}

export function GroupCard({ group_id, className }: GroupCardProps) {
  const { query } = useGroup(group_id);
  const { logo_url, group_name, address, phone } = query.data[0];

  const parsedPhone = parsePhoneNumber(phone, "US").formatNational();

  return (
    <Item
      key={`group-card-${group_id}`}
      variant="outline"
      className={className}
    >
      <ItemMedia className="size-20 bg-background" variant="image">
        <img src={logo_url || undefined} alt={group_name} />
      </ItemMedia>

      <ItemContent>
        <ItemTitle>{group_name}</ItemTitle>
        <ItemDescription className="tracking-tight">{address}</ItemDescription>
        <ItemDescription className="tracking-tight">
          {parsedPhone}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}
