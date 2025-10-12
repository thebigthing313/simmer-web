import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { cn } from '@/lib/utils'

interface GroupCardProps {
  id: string
  name: string
  address: string
  role?: string
  logo?: string
  default?: boolean
  onSelect?: (id: string, e?: ReactMouseEvent<HTMLDivElement>) => void
  className?: string
}

export function GroupCard({
  id,
  name,
  role,
  address,
  logo,
  onSelect,
  className,
  default: isDefault,
}: GroupCardProps) {
  return (
    <Item
      key={id}
      variant="outline"
      className={cn(
        'transition-colors duration-300 ease-in-out hover:cursor-pointer hover:bg-accent',
        className,
      )}
      onClick={(e) => onSelect?.(id, e)}
    >
      <ItemMedia className="size-20" variant="image">
        <img src={logo || undefined} alt={name} />
      </ItemMedia>

      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription className="tracking-tight">{address}</ItemDescription>
        <ItemDescription className="text-xs text-muted-foreground">
          role: {role} {isDefault && ' · default'}
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}
