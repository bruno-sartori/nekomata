import Navbar from '../../containers/Navbar';
import Sidebar from '../../containers/Sidebar';
import './index.scss';

const MainLayout = (props: any) => {
    return (
      <div className="main-layout">
        <Navbar />
        <Sidebar />
        <section className="main-layout__content">
          {props.children}
        </section>
      </div>
    );
};

export default MainLayout;
