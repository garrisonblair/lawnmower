// core styles are required for all packages
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { IntlProvider } from "./services/intl";
import { resolver, theme } from "./theme";
import enMessages from "./translations/en.json";
import frMessages from "./translations/fr.json";

function App() {
  return (
    <IntlProvider translations={{ fr: frMessages, en: enMessages }}>
      <BrowserRouter>
        <MantineProvider
          theme={theme}
          cssVariablesResolver={resolver}
          defaultColorScheme="light"
        >
          <AppRoutes />
        </MantineProvider>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
