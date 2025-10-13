import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar, type MenuGroup } from './app-sidebar'
import { SiteHeader } from './site-header'

interface SidebarWithInsetProps {
  header?: React.ReactNode
  children?: React.ReactNode
  menuGroups?: Array<MenuGroup>
}
export function SidebarWithInset({
  header,
  children,
  menuGroups,
}: SidebarWithInsetProps) {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
      className="h-full w-full flex"
    >
      <AppSidebar menuGroups={menuGroups}>{header}</AppSidebar>
      <SidebarInset className="flex flex-col min-h-0 flex-1">
        <SiteHeader />
        <div className="flex flex-1 flex-col p-4 overflow-y-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
