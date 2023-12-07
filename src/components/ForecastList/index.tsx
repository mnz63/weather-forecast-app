import { View, Text, Divider, VStack } from "@gluestack-ui/themed";
import { BlurView } from "expo-blur";
import ForecastListCard from "../ForecastListCard";
import { memo } from "react";

type Props = {
  forecastData?: any;
};

export const ForecastList = memo(({ forecastData }: Props) => {
  return (
    <View w={"100%"} borderRadius={20} h={350} overflow="hidden" my={20}>
      <BlurView
        intensity={30}
        tint="dark"
        style={{
          height: "100%",
          width: "100%",
          borderRadius: 20,
          backgroundColor: "#0000008",
        }}
      >
        <View h={55}>
          <View
            flexDirection="row"
            alignItems="center"
            px={30}
            h={"100%"}
            justifyContent="space-between"
          >
            <Text color={"#FFF"} fontSize={18}>
              Previsão de 3 dias
            </Text>
          </View>
          <Divider bgColor="#ffffff3e" />
          <VStack
            alignItems="center"
            space={"md"}
            w={"100%"}
            h={"100%"}
            pt={15}
          >
            {forecastData?.map((item, index) => (
              <ForecastListCard data={item} key={index} />
            ))}
          </VStack>
        </View>
      </BlurView>
    </View>
  );
});
