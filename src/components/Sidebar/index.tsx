import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faHome, faHospitalUser, faLock } from '@fortawesome/free-solid-svg-icons'

// Components
import SidebarItem from '@components/SidebarItem';

// Images
import Logo from '@images/logo.jpg';

// Styles
import './index.scss';

const Sidebar = (props: any) => {

  return (
    <section className="sidebar">
      <div className="sidebar__logo">
        <figure>
          <img src={Logo} width={50} height={50} />
        </figure>
      </div>
      <ul className="sidebar__list">
        <SidebarItem icon={<FontAwesomeIcon icon={faHome} />} title="Home" href="/" />
        <SidebarItem icon={<FontAwesomeIcon icon={faHospitalUser} />} title="Pacientes" href="/patient" />
        <SidebarItem icon={<FontAwesomeIcon icon={faLock} />} title="Bloqueados" href="/blocked" />
      </ul>
    </section>
  );
};

export default Sidebar;
