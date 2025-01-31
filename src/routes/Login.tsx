import { Card, Center, Stack, Title } from "@mantine/core";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import React, { useEffect } from "react";
import { app } from "../firebase";
import { PATHS } from "../types/paths/paths";
import { createPath } from "../types/paths/urlBuilder";
import { FormattedMessage } from "react-intl";

const Login: React.FunctionComponent = () => {
  useEffect(() => {
    // Initialize the FirebaseUI Widget using Firebase.
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(getAuth(app));

    ui.start("#firebaseui-auth-container", {
      signInSuccessUrl: createPath(
        PATHS.HOME,
        {},
        { baseUrl: window.location.origin }
      ),
      signInFlow: "popup",
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      // Other config options...
    });
  }, []);

  return (
    <Center h="100vh" w="100vw">
      <Stack gap="xl" align="center">
        <Title order={1}>
          <FormattedMessage id="app_name" />
        </Title>
        <Card shadow="xl" padding="xl" radius="lg">
          <Stack>
            <Title order={3}>
              <FormattedMessage id="login.title" />
            </Title>
            <div id="firebaseui-auth-container"></div>
          </Stack>
        </Card>
      </Stack>
    </Center>
  );
};

export default Login;
