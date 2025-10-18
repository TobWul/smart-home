import './styles/reset.scss';
import './styles/tokens.scss';
import './styles/globals.scss';
import { HassConnect } from '@hakit/core';
import Dashboard from './Dashboard';

function App() {
  return (
    <>
      <HassConnect hassUrl={import.meta.env.VITE_HA_URL} hassToken={import.meta.env.VITE_HA_TOKEN}>
        <Dashboard />
      </HassConnect>
    </>
  );
}

export default App;
