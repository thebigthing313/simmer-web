import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'
import { SidebarFooterMenu } from './sidebar-footer-menu'
import type { LinkProps } from '@tanstack/react-router'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

type SubMenuItem = {
  title: string
  link: LinkProps
  isActive: boolean
}
type MenuItem = {
  label: string
  icon: React.ReactNode
  subItems?: Array<SubMenuItem>
}

export type MenuGroup = {
  label: string

  items?: Array<MenuItem>
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  children?: React.ReactNode
  menuGroups?: Array<MenuGroup>
}

export function AppSidebar({
  menuGroups,
  children,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>{children}</SidebarHeader>
      <SidebarContent>
        {menuGroups?.map((group) => (
          <SidebarGroup key={`sidebar-group-${group.label}`}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items?.map((item) => (
                <Collapsible
                  key={`collapsible-${item.label}`}
                  asChild
                  className="group/collapsible"
                  defaultOpen={
                    item.subItems?.some((sub) => sub.isActive) ?? false
                  }
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.label}>
                        {item.icon}
                        <span>{item.label}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subItems?.map((subItem) => (
                          <SidebarMenuSubItem
                            key={`sidebar-subitem-${subItem.title}`}
                          >
                            <SidebarMenuSubButton
                              asChild
                              isActive={subItem.isActive}
                            >
                              <Link {...subItem.link}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterMenu />
      </SidebarFooter>
    </Sidebar>
  )
}
