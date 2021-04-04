import GridContainer from '@components/GridContainer';
import GridItem from '@components/GridItem';
import Sidebar from '@components/Sidebar';
import './index.scss';

const MainLayout = (props: any) => {
    return (
      <div className="main-layout">
        <GridContainer gridGap={0} style={{ padding: 0 }}>
          <GridItem colSpan={2} style={{ padding: 0 }}>
            <Sidebar />
          </GridItem>
          <GridItem colSpan={10} style={{ padding: 0 }}>
            <section className="main-layout__content">
              {props.children}
            </section>
          </GridItem>
        </GridContainer>
      </div>
    );
};

export default MainLayout;
