import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHospitalUser, faLock } from '@fortawesome/free-solid-svg-icons';

// Components
import Sidebar from '@components/Sidebar';

const menuItems = [
  {
    title: 'Home',
    href: '/',
    icon: <FontAwesomeIcon icon={faHome} />,
    active: true
  },
  {
    title: 'Pacientes',
    href: '/patient',
    icon: <FontAwesomeIcon icon={faHospitalUser} />,
    active: false
  },
  {
    title: 'Bloqueados',
    href: '/blocked',
    icon: <FontAwesomeIcon icon={faLock} />,
    active: false
  }
];

const MainLayout = (props: any) => {
  return (
    <main className="main-layout">
      <Sidebar menuItems={menuItems} />
      <section className="main-layout__content">
        {props.children}
      </section>
    </main>
  );
};

export default MainLayout;
