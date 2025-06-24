import { type ReactNode } from '@tanstack/react-router';
import { type JSX, useMemo, useRef } from 'react';
import { useTab, useTabList, useTabPanel } from 'react-aria';
import { Item, type ItemProps, useTabListState } from 'react-stately';

import { tabPanelStyle, tabsStyle, tabStyle } from './Tabs.styles';
import { type TabProps, type TabPanelProps, type TabsProps } from './Tabs.types';

function TabPanel<T extends object>({ state, renderTabPanelContent, ...props }: TabPanelProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const { tabPanelProps } = useTabPanel(props, state, ref);

  const content = useMemo(() => {
    const selectedItem = state.selectedItem;

    if (!selectedItem) {
      return null;
    }

    return renderTabPanelContent ? renderTabPanelContent(selectedItem.key) : selectedItem.props.children;
  }, [state, renderTabPanelContent]);

  return (
    <div {...tabPanelProps} ref={ref} className={tabPanelStyle()}>
      {content}
    </div>
  );
}

function Tab<T extends object>({ item, state }: TabProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const { tabProps } = useTab({ key: item.key }, state, ref);

  const isSelected = item.key === state.selectedKey;

  return (
    <div {...tabProps} ref={ref} className={tabStyle({ isSelected })}>
      {item.rendered}
    </div>
  );
}

export function Tabs<T extends object>({ className, renderTabPanelContent, ...props }: TabsProps<T>) {
  const state = useTabListState(props);
  const ref = useRef<HTMLDivElement>(null);
  const { tabListProps } = useTabList(props, state, ref);

  const { base, items } = tabsStyle();

  return (
    <div className={base({ className })}>
      <div {...tabListProps} ref={ref} className={items()}>
        {[...state.collection].map((item) => (
          <Tab key={item.key} item={item} state={state} />
        ))}
      </div>
      <TabPanel key={state.selectedItem?.key} renderTabPanelContent={renderTabPanelContent} state={state} />
    </div>
  );
}

Tabs.Tab = Item as (props: Omit<ItemProps<object>, 'children'> & { children?: ReactNode }) => JSX.Element;
