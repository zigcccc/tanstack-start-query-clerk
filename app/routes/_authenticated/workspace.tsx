import { OrganizationProfile } from '@clerk/tanstack-react-start';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/workspace')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <OrganizationProfile
      appearance={{
        elements: {
          rootBox: 'w-full h-[calc(100%-104px)]',
          cardBox: 'shadow-none mt-6 w-full h-full',
          navbar: 'bg-transparent bg-none last:[&>div]:hidden',
          scrollBox: 'rounded-none',
        },
      }}
      routing="hash"
    />
  );
}
