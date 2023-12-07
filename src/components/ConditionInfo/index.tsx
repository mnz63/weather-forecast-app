import { View, Text } from "@gluestack-ui/themed";
import { BlurView } from "expo-blur";
import { Feather } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { memo } from "react";

type Props = {
  forecastData?: any;
};

export const ConditionInfo = memo(({ forecastData }: Props) => {
  const humidity = forecastData?.humidity || 0;
  const clouds = forecastData?.cloud || 0;
  const wind = parseInt(forecastData?.wind_kph) || 0;

  return (
    <View w={"100%"} h={47} borderRadius={20} overflow="hidden" mb={20}>
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
        <View
          flexDirection="row"
          alignItems="center"
          h={"100%"}
          w={"100%"}
          justifyContent="space-around"
        >
          <View flexDirection="row" gap={10} alignItems="center">
            <Ionicons name="cloudy-outline" size={18} color={"#FFF"} />
            <Text color={"#FFF"} fontWeight="$bold">
              {clouds}%
            </Text>
          </View>
          <View flexDirection="row" gap={10} alignItems="center">
            <Fontisto name="blood-drop" size={18} color="white" />
            <Text color={"#FFF"} fontWeight="$bold">
              {humidity}%
            </Text>
          </View>
          <View flexDirection="row" gap={10} alignItems="center">
            <Feather name="wind" size={18} color="white" />
            <Text color={"#FFF"} fontWeight="$bold">
              {wind}km/h
            </Text>
          </View>
        </View>
      </BlurView>
    </View>
  );
});
