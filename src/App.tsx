import Home from "./routes/Home";
import { IntlProvider } from "./services/intl";
import frMessages from "./translations/fr.json";

function App() {
  return (
    <IntlProvider translations={{ fr: frMessages }}>
      <Home />
    </IntlProvider>
  );
}

export default App;
