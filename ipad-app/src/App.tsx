import "./styles/reset.scss";
import "./styles/tokens.scss";
import "./styles/globals.scss";
import PWABadge from "./PWABadge.tsx";
import { DeviceController } from "./components/DeviceController";
import { HomeAssistantContextProvider } from "./context/HomeAssitantContext/HomeAssistantContext.tsx";
import classes from "./App.module.scss";
import { Screen } from "./components/Screen/Screen.tsx";

function App() {
  return (
    <HomeAssistantContextProvider>
      <div className={classes.page}>
        <Screen />
        <DeviceController />
        <PWABadge />
      </div>
    </HomeAssistantContextProvider>
  );
}

export default App;
