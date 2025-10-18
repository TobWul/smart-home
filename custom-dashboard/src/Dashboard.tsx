import classes from './Dashboard.module.scss';
import { Screen } from './components/Screen';
import { Overview } from './pages/Overview';

function Dashboard() {
  return (
    <div className={classes.page}>
      <Screen />
      <Overview />
    </div>
  );
}

export default Dashboard;
