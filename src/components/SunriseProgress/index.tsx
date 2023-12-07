import { View, Text, Divider, VStack } from "@gluestack-ui/themed";
import { BlurView } from "expo-blur";
import * as Progress from "react-native-progress";
import { parse, format } from "date-fns";
import { Image } from "react-native";
import { useForecastStore } from "../../store/forecastStore";
import { memo } from "react";

function convertHour(hour) {
  if (hour) {
    const date = parse(hour, "hh:mm a", new Date());
    const formatedHour = format(date, "HH:mm");

    return formatedHour;
  }
}

function handleProgress(initialHour: string, finalHour: string) {
  const now = new Date();

  if (!initialHour || !finalHour) return;
  const currentDate = now.toISOString().slice(0, 10);

  const initial = new Date(`${currentDate} ${convertHour(initialHour)}`);

  const final = new Date(`${currentDate} ${convertHour(finalHour)}`);

  if (final < initial) {
    final.setDate(final.getDate() + 1);
  }

  const diferencaTotal: number = final.getTime() - initial.getTime();
  const diferencaAtual: number = now.getTime() - initial.getTime();
  const progresso: number = diferencaAtual / diferencaTotal;
  return Math.min(Math.max(progresso, 0), 1);
}

export const SunriseProgress = memo(() => {
  const { astronomyData } = useForecastStore();

  const now = new Date();

  const sunriseHour = astronomyData?.astronomy?.astro?.sunrise;
  const sunsetHour = astronomyData?.astronomy?.astro?.sunset;

  return (
    <View w={"100%"} borderRadius={20} h={250} overflow="hidden" my={20}>
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
              Nascer e pôr do sol
            </Text>
          </View>
          <Divider bgColor="#ffffff3e" />
          <VStack
            alignItems="center"
            space={"md"}
            w={"100%"}
            h={"100%"}
            pt={20}
          >
            <View flexDirection="row" w={"85%"} justifyContent="space-between">
              <View alignItems="center">
                <Image
                  source={require("../../../assets/icons/3dIcons/sun/26.png")}
                  style={{
                    width: 33,
                    height: 35,
                  }}
                  alt="Icon"
                />
                <Text color={"#FFF"}>{convertHour(sunriseHour)}</Text>
              </View>
              <View alignItems="center">
                <Image
                  source={require("../../../assets/icons/3dIcons/sun/27.png")}
                  style={{
                    width: 33,
                    height: 35,
                  }}
                  alt="Icon"
                />
                <Text color={"#FFF"}>{convertHour(sunsetHour)}</Text>
              </View>
            </View>
            <View w={"85%"} alignItems="center" h={150}>
              <Progress.Bar
                progress={handleProgress(sunriseHour, sunsetHour) || 0}
                width={300}
                color={"rgb(244, 172, 65)"}
                unfilledColor="#FFF"
                borderWidth={0}
              />
              <View alignItems="center" justifyContent="center" mt={20}>
                <Text
                  color={"#FFF"}
                  fontSize={40}
                  fontWeight={"$bold"}
                  lineHeight={40}
                >
                  {now && format(now, "HH:mm")}
                </Text>
              </View>
            </View>
          </VStack>
        </View>
      </BlurView>
    </View>
  );
});
