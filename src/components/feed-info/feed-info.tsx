import { FC } from 'react';

import { TOrder, TFeedData } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const ordersData = useSelector((state) => state.feeds.feeds);

  const readyOrders = getOrders(ordersData.orders, 'done');

  const pendingOrders = getOrders(ordersData.orders, 'pending');

  if (ordersData.isLoading) {
    return <Preloader />;
  }

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={ordersData}
    />
  );
};
