import React from "react";
import { IntlProvider as ExtIntlProvider } from "react-intl";
import { flattenMessages } from "./flattenMessages";

type BaseLocalization = "fr" | "en";

export type LocaleContextType =
  | {
      baseLocale: BaseLocalization;
      setUserLocale: (newBaseLocale: BaseLocalization) => void;
    }
  | undefined;

const Context = React.createContext<LocaleContextType>(undefined);

const IntlProvider: React.FunctionComponent<
  React.PropsWithChildren<{
    translations: {
      fr: Parameters<typeof flattenMessages>[0];
      en?: Parameters<typeof flattenMessages>[0];
    };
  }>
> = ({ translations, children }) => {
  const flattenedTranslations = {
    fr: flattenMessages(translations.fr),
    en: translations.en ? flattenMessages(translations.en) : undefined,
  };

  const setUserLocale = () => {};

  // const baseLocale = useGetNavigatorLocale();
  const baseLocale: BaseLocalization = "fr"; // Default to French for this example

  return (
    <Context.Provider value={{ baseLocale: baseLocale, setUserLocale }}>
      <ExtIntlProvider
        locale={baseLocale}
        messages={flattenedTranslations[baseLocale]}
      >
        {children}
      </ExtIntlProvider>
    </Context.Provider>
  );
};

export { IntlProvider, Context as LocaleContext };
