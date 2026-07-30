import React from 'react';
import { RoleTabs } from '@/components/RoleTabs';
import { threads } from '@/mocks/data';

const unread = threads.reduce((n, t) => n + t.unread, 0);

export default function Layout() {
  return (
    <RoleTabs
      tabs={[
        { name: 'index', title: 'Dashboard', icon: 'speedometer', iconOutline: 'speedometer-outline' },
        { name: 'jobs', title: 'Jobs', icon: 'briefcase', iconOutline: 'briefcase-outline' },
        {
          name: 'messages',
          title: 'Messages',
          icon: 'chatbubbles',
          iconOutline: 'chatbubbles-outline',
          badge: unread || undefined,
        },
        { name: 'earnings', title: 'Earnings', icon: 'wallet', iconOutline: 'wallet-outline' },
        { name: 'profile', title: 'Profile', icon: 'person', iconOutline: 'person-outline' },
      ]}
    />
  );
}
