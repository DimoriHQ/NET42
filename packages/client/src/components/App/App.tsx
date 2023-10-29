import { UseInkathonProvider, development } from "@scio-labs/use-inkathon";
import "../../styles/main.scss";
import PopupProvider from "../Popup/PopupProvider";
import Router from "../Router/Router";
import Toast from "../Toast/Toast";

const App: React.FC = () => {
  return (
    <UseInkathonProvider appName="NET42" defaultChain={development}>
      <PopupProvider>
        <Router />
        <Toast />
      </PopupProvider>
    </UseInkathonProvider>
  );
};

export default App;
