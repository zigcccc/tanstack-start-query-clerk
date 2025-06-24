import { useUser } from '@clerk/clerk-react';
import { clsx } from 'clsx';
import { Authenticated } from 'convex/react';
import { LogOutIcon } from 'lucide-react';
import { useSignOut } from 'src/hooks/use-sign-out';

import { Button } from '@/components/atoms';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function Navbar() {
  const authUser = useUser();
  const handleSignOut = useSignOut();

  return (
    <div
      className={clsx('flex h-[70px] items-center justify-between border-b border-b-slate-300 p-3', {
        hidden: authUser.isSignedIn === false,
      })}
    >
      <Authenticated>
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <p className="text-lg text-slate-800" data-testid="auth--username">
            {authUser.user ? `Hello ${authUser.user.fullName}` : 'Loading...'}
          </p>
        </div>
        <Button iconAfter={LogOutIcon} intent="strong" onPress={handleSignOut} size="sm" variant="faded">
          Sign out
        </Button>
      </Authenticated>
    </div>
  );
}
