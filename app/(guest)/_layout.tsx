import React from 'react';
import { RoleTabs } from '@/components/RoleTabs';

export default function Layout() {
  return (
    <RoleTabs
      tabs={[
        { name: 'index', title: 'Home', icon: 'home', iconOutline: 'home-outline' },
        { name: 'search', title: 'Search', icon: 'search', iconOutline: 'search-outline' },
        { name: 'categories', title: 'Categories', icon: 'grid', iconOutline: 'grid-outline' },
        { name: 'map', title: 'Map', icon: 'map', iconOutline: 'map-outline' },
        { name: 'profile', title: 'Profile', icon: 'person', iconOutline: 'person-outline' },
      ]}
    />
  );
}
