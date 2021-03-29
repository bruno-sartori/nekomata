import React from 'react';
import SidebarListItem from '@components/SidebarListItem';

import './index.scss';

const Sidebar = (props: any) => {

  return (
    <section className="sidebar">
      <ul className="sidebar__list">
        <SidebarListItem />
      </ul>
    </section>
  );
};

export default Sidebar;
