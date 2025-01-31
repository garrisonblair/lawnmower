import { Stack } from "@mantine/core";
import {
  IconMusicShare,
  IconMusicCheck,
  IconMusicPlus,
} from "@tabler/icons-react";
import React from "react";
import RouteCard from "../components/Home/RouteCard";
import { PATHS } from "../types/paths/paths";
import { createPath } from "../types/paths/urlBuilder";
import {
  useGetBlindTests,
  useGetBlindTestsToCorrect,
} from "../services/db/data";
import { FormattedMessage } from "react-intl";

const Home: React.FunctionComponent = () => {
  const activeBlindTests = useGetBlindTests("active");
  const blindTestsToCorrect = useGetBlindTestsToCorrect();

  const activeBlindTestsCount =
    activeBlindTests.length + blindTestsToCorrect.length;

  const completedBlindTests = useGetBlindTests("complete");
  const completedBlindTestsCount = completedBlindTests.length;

  return (
    <Stack align="center">
      {activeBlindTestsCount > 0 && (
        <RouteCard
          fullPath={createPath(PATHS.ACTIVE_BLINDTESTS, null)}
          titleKey="active_blindtests"
          helperTextNode={{
            visible: true,
            node: (
              <FormattedMessage
                id="active_blindtests.helper_text"
                values={{ count: activeBlindTestsCount }}
              />
            ),
          }}
          Icon={IconMusicShare}
          variant="rectangle"
        />
      )}
      <RouteCard
        fullPath={createPath(PATHS.NEW_BLINDTEST, null)}
        titleKey="new_blindtest"
        Icon={IconMusicPlus}
        variant="rectangle"
      />
      {completedBlindTestsCount > 0 && (
        <RouteCard
          fullPath={createPath(PATHS.HISTORY, null)}
          titleKey="history"
          helperTextNode={{
            visible: true,
            node: (
              <FormattedMessage
                id="history.helper_text"
                values={{ count: completedBlindTestsCount }}
              />
            ),
          }}
          Icon={IconMusicCheck}
          variant="rectangle"
        />
      )}
    </Stack>
  );
};

export default Home;
