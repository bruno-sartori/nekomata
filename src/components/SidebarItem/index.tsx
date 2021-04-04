import { WithRouterProps } from 'next/dist/client/with-router';
import { withRouter } from 'next/router';
import React from 'react';
import './index.scss';

declare interface ISidebarItem extends WithRouterProps {
  title: string;
  href: string;
  icon: any;
}

const SidebarItem: React.FC<ISidebarItem> = (props) => {
  const { title, href, icon, router } = props;

  return (
    <li className={`sidebar-item  ${href === router.asPath ? 'sidebar-item--active' : ''}`}>
      <a href={href}>
        <div className="sidebar-item__container">
          <div className="sidebar-item__icon">
            {icon}
          </div>
          <div className="sidebar-item__title">
            {title}
          </div>
        </div>
      </a>
    </li>
  );
}

export default withRouter(SidebarItem);
