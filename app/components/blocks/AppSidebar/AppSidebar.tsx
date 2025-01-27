import { useUser } from '@clerk/clerk-react';
import { Link } from '@tanstack/react-router';
import { Authenticated } from 'convex/react';
import { ListIcon, CircleDotDashedIcon, CheckIcon, User, LogOut } from 'lucide-react';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useSignOut } from '@/hooks/use-sign-out';

export function AppSidebar() {
  const user = useUser();
  const handleSignOut = useSignOut();

  return (
    <Authenticated>
      <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Eatwise">
                <Link to="/">
                  <span className="text-lg font-bold">Eatwise</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              <span>Todos</span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={false} tooltip="All todos">
                    <Link search={{ filter: 'all' }} to="/">
                      <ListIcon className="size-4" />
                      <span>All todos</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={false} tooltip="Active todos">
                    <Link search={{ filter: 'active' }} to="/">
                      <CircleDotDashedIcon className="size-4" />
                      <span>Active todos</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={false} tooltip="Completed todos">
                    <Link search={{ filter: 'completed' }} to="/">
                      <CheckIcon className="size-4" />
                      <span>Completed todos</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            {user.isLoaded && user.isSignedIn && (
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      className="w-full justify-start data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                      size="lg"
                    >
                      <Avatar className="mr-2">
                        <AvatarImage alt={user.user.fullName ?? ''} src={user.user.imageUrl} />
                        <AvatarFallback>{user.user.firstName?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start gap-0.5 leading-none">
                        <span className="font-medium">{user.user.fullName}</span>
                        <span className="text-xs text-muted-foreground">
                          {user.user.primaryEmailAddress?.emailAddress}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[--radix-dropdown-menu-trigger-width]" side="top">
                    <DropdownMenuItem asChild>
                      <Link to="/workspace">
                        <User className="mr-2 h-4 w-4" />
                        <span>Workspace settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSignOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </Authenticated>
  );
}
