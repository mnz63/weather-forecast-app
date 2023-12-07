import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { Divider, Text, View, VStack } from "@gluestack-ui/themed";
import { BlurView } from "expo-blur";
import {
  getNextFourHours,
  getWeatherListIcon,
  months,
} from "../../common/utils/functions";
import { useForecastStore } from "../../store/forecastStore";
import { format } from "date-fns";
import { memo } from "react";

export const HourlyList = memo(() => {
  const { forecastData } = useForecastStore();

  const height = Dimensions.get("window").height / 3.2;
  const width = Dimensions.get("window").width;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const today = `${currentDate.getDate()} / ${months[currentMonth]}`;

  const hourlyData = forecastData?.forecast?.forecastday?.[0]?.hour;
  const hourly = hourlyData?.map((item) => ({
    time: item?.time,
    hours: format(new Date(item?.time), "HH:mm"),
    temp: parseInt(item?.temp_c),
    condition: item?.condition?.text,
    code: item?.condition?.code,
  }));
  const data = getNextFourHours(hourly);

  return (
    <KeyboardAvoidingView
      style={{
        width: "100%",
        height: height,
        overflow: "hidden",
        borderRadius: 30,
      }}
      behavior="padding"
    >
      <BlurView
        intensity={30}
        tint="dark"
        style={{
          height: "100%",
          width: "100%",
          borderRadius: 50,
          backgroundColor: "#0000008",
        }}
      >
        <View h={"$1/5"}>
          <View
            flexDirection="row"
            alignItems="center"
            px={40}
            h={"100%"}
            justifyContent="space-between"
          >
            <Text color={"#FFF"} fontSize={18}>
              Hoje
            </Text>
            <Text color={"#FFF"} fontSize={18}>
              {today}
            </Text>
          </View>
          <Divider bgColor="#ffffff3e" />
        </View>

        <View flexDirection="row" h={"70%"} alignItems="center">
          <FlatList
            data={data}
            horizontal
            fadingEdgeLength={100}
            ListEmptyComponent={() => (
              <View w={(width / 10) * 9} alignItems="center">
                <ActivityIndicator size={"large"} color={"#FFF"} />
              </View>
            )}
            style={{
              paddingLeft: 5,
            }}
            renderItem={({ item }) => (
              <VStack
                w={"$20"}
                h={176}
                alignItems="center"
                justifyContent="space-evenly"
              >
                <Text color={"#FFF"} fontWeight="$bold" fontSize={20}>
                  {item?.temp}°
                </Text>
                <Image
                  source={getWeatherListIcon(item?.code, item?.time)}
                  style={{
                    width: 45,
                    height: 45,
                  }}
                  alt="Icon"
                />
                <Text color={"#FFF"} fontWeight="$bold" fontSize={20}>
                  {item?.hours}
                </Text>
              </VStack>
            )}
            removeClippedSubviews={true} // Unmount components when outside of window
            initialNumToRender={4}
          />
        </View>
      </BlurView>
    </KeyboardAvoidingView>
  );
});
