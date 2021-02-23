import Navbar from '../../containers/Navbar';
import Sidebar from '../../containers/Sidebar';

const MainLayout = (props: any) => {
    return (
        <div className="main-layout">
            <Navbar />
            <Sidebar />
        </div>
    );
};

export default MainLayout;