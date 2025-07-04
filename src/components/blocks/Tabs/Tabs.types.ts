import { type JSX } from 'react';
import { type AriaTabPanelProps, type AriaTabListOptions, type Key, type AriaTabListProps } from 'react-aria';
import { type Node, type TabListState } from 'react-stately';

export type TabProps<T extends object> = { item: Node<T>; state: TabListState<T> };

export type TabPanelProps<T extends object> = AriaTabPanelProps & {
  state: TabListState<T>;
  renderTabPanelContent?: (selectedKey: Key) => JSX.Element;
};

export type TabsProps<T extends object> = AriaTabListOptions<T> & {
  children: AriaTabListProps<T>['children'];
  className?: string;
  renderTabPanelContent?: (selectedKey: Key) => JSX.Element;
};
