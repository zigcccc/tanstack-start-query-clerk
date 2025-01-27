import { UserProfile } from '@clerk/tanstack-start';
import { createFileRoute } from '@tanstack/react-router';

import { Actionbar } from '@/components/blocks';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage } from '@/components/ui/breadcrumb';

export const Route = createFileRoute('/_authenticated/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Actionbar.Content className="flex flex-1 items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="first-letter:capitalize">My profile</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Actionbar.Content>
      <UserProfile
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
    </>
  );
}
