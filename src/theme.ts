import {
  CSSVariablesResolver,
  DEFAULT_THEME,
  createTheme,
  mergeMantineTheme,
} from "@mantine/core";

const themeOverride = createTheme({
  primaryColor: "blue",
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--mantine-color-body": theme.colors.blue[0],
  },
  light: {
    "--mantine-color-body": theme.colors.blue[0],
  },
  dark: {
    "--mantine-color-body": theme.colors.blue[9],
  },
});
