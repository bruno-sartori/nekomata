import Authenticated from '@containers/Authenticated';
import { getUserInfoAction } from '@actions/user';
import { getPatientsAction } from '@actions/patients';
import PatientsScene from '../scenes/Patients';

const HomePage = () => {
  return (
    <Authenticated>
      <PatientsScene />
    </Authenticated>
  );
};

HomePage.getInitialProps = async (ctx) => {
  const { store: { dispatch } } = ctx;

  await Promise.all([
    dispatch(getUserInfoAction()),
    dispatch(getPatientsAction())
  ]);
}

export default HomePage;
