import React from 'react';
import { RoleTabs } from '@/components/RoleTabs';
import { threads } from '@/mocks/data';

const unread = threads.reduce((n, t) => n + t.unread, 0);

export default function Layout() {
  return (
    <RoleTabs
      tabs={[
        { name: 'index', title: 'Home', icon: 'home', iconOutline: 'home-outline' },
        { name: 'discover', title: 'Discover', icon: 'compass', iconOutline: 'compass-outline' },
        { name: 'bookings', title: 'Bookings', icon: 'calendar', iconOutline: 'calendar-outline' },
        {
          name: 'messages',
          title: 'Messages',
          icon: 'chatbubbles',
          iconOutline: 'chatbubbles-outline',
          badge: unread || undefined,
        },
        { name: 'profile', title: 'Profile', icon: 'person', iconOutline: 'person-outline' },
      ]}
    />
  );
}
