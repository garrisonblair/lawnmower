import { ActionIcon, AppShell, Flex, Title } from "@mantine/core";
import { IconArrowLeft, IconLogout } from "@tabler/icons-react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { Suspense, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { app } from "./firebase";
import Home from "./routes/Home";
import Login from "./routes/Login";
import { useGetUserInfo, useStoreUserInfo } from "./services/db/users";
import { useUserStore } from "./services/zustand/user.hooks";
import { PATHS } from "./types/paths/paths";
import { createPath } from "./types/paths/urlBuilder";

interface PropsType {
  content: React.ReactNode;
}

const Shell: React.FunctionComponent<PropsType> = ({ content }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [titleKey, setTitleKey] = useState("app_name");

  const logout = useUserStore((state) => state.logout);

  useEffect(() => {
    const currentPath = location.pathname.replace("/", "").replace("-", "_");

    if (currentPath === "") {
      setTitleKey("app_name");
    } else {
      setTitleKey(`${currentPath}.title`);
    }
  }, [location.pathname]);

  return (
    <AppShell header={{ height: 60 }} w="100vw" padding="xl">
      <AppShell.Header bg="pink.4">
        <Flex px="md" h="100%" w="100%" align="center" justify="space-between">
          <ActionIcon
            variant="transparent"
            onClick={() => navigate(-1)}
            c="white"
            style={{
              visibility: titleKey === "app_name" ? "hidden" : "visible",
            }}
          >
            <IconArrowLeft stroke={2} />
          </ActionIcon>
          <Title
            order={1}
            c="white"
            onDoubleClick={() => window.location.reload()}
          >
            <FormattedMessage id="app_name" />
          </Title>
          <ActionIcon
            variant="transparent"
            onClick={() => {
              signOut(getAuth(app));
              logout();
            }}
            c="white"
          >
            <IconLogout stroke={2} />
          </ActionIcon>
        </Flex>
      </AppShell.Header>
      <AppShell.Main>{content}</AppShell.Main>
    </AppShell>
  );
};

const AppRoutes = (): JSX.Element => {
  const login = useUserStore((state) => state.login);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const storeUserInfo = useStoreUserInfo();
  const getUserInfo = useGetUserInfo();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(app), async (user) => {
      if (user) {
        login(user);
        const existingUserInfo = await getUserInfo(user.uid);
        if (!existingUserInfo) {
          storeUserInfo(user);
        }
      } else {
        if (location.pathname !== createPath(PATHS.LOGIN, null)) {
          logout();
          navigate(createPath(PATHS.LOGIN, null));
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [getUserInfo, login, logout, navigate, storeUserInfo]);

  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route path={PATHS.HOME} element={<Shell content={<Home />} />} />
        <Route path={PATHS.LOGIN} element={<Login />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
