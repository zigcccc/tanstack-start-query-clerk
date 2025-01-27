import { createContext, type PropsWithChildren, type RefObject, useContext, useRef } from 'react';
import { createPortal } from 'react-dom';

import { SidebarTrigger } from '@/components/ui/sidebar';

const ActionbarContext = createContext<{ actionbarRef: RefObject<HTMLElement> } | null>(null);

function useActionbar() {
  const context = useContext(ActionbarContext);

  if (!context) {
    throw new Error('Actionbar.Root and Actionbar.Content must be wrapper in Actionbar.Provider component.');
  }

  return context;
}

function ActionbarProvider({ children }: PropsWithChildren) {
  const ref = useRef<HTMLElement>(null);

  return <ActionbarContext.Provider value={{ actionbarRef: ref }}>{children}</ActionbarContext.Provider>;
}

function ActionbarRoot() {
  const { actionbarRef } = useActionbar();

  return (
    <nav ref={actionbarRef} className="flex h-[70px] items-center gap-2 border-b border-b-slate-300 p-3">
      <SidebarTrigger />
    </nav>
  );
}

function ActionbarContent({ className, children }: PropsWithChildren<{ className?: string }>) {
  const { actionbarRef } = useActionbar();

  if (!actionbarRef.current) {
    return null;
  }

  return createPortal(<div className={className}>{children}</div>, actionbarRef.current);
}

export const Actionbar = {
  Provider: ActionbarProvider,
  Root: ActionbarRoot,
  Content: ActionbarContent,
} as const;
