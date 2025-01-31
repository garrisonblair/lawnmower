import { Card, Group, Space, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconProps, Icon as TablerIcon } from "@tabler/icons-react";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

export interface PropsType {
  fullPath: string;
  titleKey: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<IconProps, "ref"> & React.RefAttributes<TablerIcon>
  >;
  helperTextNode?: {
    visible: boolean;
    node: React.ReactNode;
  };
  variant: "square" | "rectangle";
}

const RouteCard: React.FunctionComponent<PropsType> = ({
  fullPath,
  titleKey,
  Icon,
  helperTextNode,
  variant,
}) => {
  const navigate = useNavigate();

  const renderContent = () => {
    if (variant === "square") {
      return (
        <Stack justify="space-between" align="center" w="100%" h="100%">
          <Space h={55.09} />
          <ThemeIcon c="pink.4" variant="white" size={100}>
            <Icon size={100} />
          </ThemeIcon>
          <Stack align="center" gap="xs">
            <Text
              size="sm"
              c="green"
              style={{
                visibility: helperTextNode?.visible ? "visible" : "hidden",
              }}
            >
              {helperTextNode?.node}
            </Text>
            <Text>
              <FormattedMessage id={`${titleKey}.title`} />
            </Text>
          </Stack>
        </Stack>
      );
    } else if (variant === "rectangle") {
      return (
        <Group gap="xl" align="center" w="100%" h="100%">
          <ThemeIcon c="pink.4" variant="white" size={80}>
            <Icon size={80} />
          </ThemeIcon>
          <Stack align="center" gap="xs" style={{ flexGrow: 1 }}>
            <Space h={20.03} />
            <Text>
              <FormattedMessage id={`${titleKey}.title`} />
            </Text>
            <Text
              size="sm"
              c="green"
              style={{
                visibility: helperTextNode?.visible ? "visible" : "hidden",
              }}
            >
              {helperTextNode?.node || "empty"}
            </Text>
          </Stack>
        </Group>
      );
    }
  };

  return (
    <Card
      shadow="xs"
      padding="md"
      radius="lg"
      w="100%"
      style={{ aspectRatio: variant === "square" ? "1/1" : "2/1" }}
      onClick={() => navigate(fullPath)}
    >
      {renderContent()}
    </Card>
  );
};

export default RouteCard;
