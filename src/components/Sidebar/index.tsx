import React from 'react';

// Components
import SidebarItem, { ISidebarItemProps } from '@components/SidebarItem';

// Images
import Logo from '@images/logo.png';

interface ISidebarProps {
  menuItems: Array<ISidebarItemProps>;
}

const Sidebar = (props: ISidebarProps) => {
  const { menuItems = [] } = props;

  return (
    <section className="sidebar">
      <div className="sidebar__logo">
        <figure>
          <img src={Logo} width={70} height={70} />
        </figure>
      </div>
      <ul className="sidebar__list">
        {menuItems.map(item => <SidebarItem key={item.title} {...item} />)}
      </ul>
    </section>
  );
};

export default Sidebar;
