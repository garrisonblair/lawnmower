import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { IntlProvider } from "./services/intl";
import enMessages from "./translations/en.json";
import frMessages from "./translations/fr.json";

function App() {
  return (
    <IntlProvider translations={{ fr: frMessages, en: enMessages }}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
