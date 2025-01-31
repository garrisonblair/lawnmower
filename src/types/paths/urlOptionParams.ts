import { PATHS } from "./paths";

export type UrlOptionParams = {
  [PATHS.HOME]: {
    params?: {
      id: string;
    };
    hash?: string;
  };
  [PATHS.LOGIN]: null;
};
