import { Text, View } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackHandler, ImageBackground, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { useEffect, useRef, useState } from "react";
import { getBackground } from "../../common/utils/functions";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import RBSheet from "@nonam4/react-native-bottom-sheet";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { useForecastStore } from "../../store/forecastStore";
import useGetForecastData from "../../hooks/useGetForecastData";
import { ForecastContainer } from "../../components/ForecastContainer";
import DrawerBottom from "../../components/DrawerBottom";
import { Feather } from "@expo/vector-icons";

export default function HomeScreen() {
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();
  const { getForecastData, getCurrentLocation, loading } = useGetForecastData();
  const { forecastData, location } = useForecastStore();
  const route: any = useRoute();
  const { latitude, longitude } = route.params ||
    location?.coords || { latitude: 0, longitude: 0 };

  useEffect(() => {
    if (latitude && longitude) {
      getForecastData({
        latitude,
        longitude,
      });
    } else {
      getCurrentLocation();
    }
    BackHandler.addEventListener("hardwareBackPress", () => true);
  }, [latitude, longitude]);

  const isDay = forecastData?.current?.is_day === 1;
  const condition = forecastData?.current?.condition?.text;
  const conditionCode = forecastData?.current?.condition?.code;
  const cityLocation = `${forecastData?.location?.name}, ${forecastData?.location?.region}`;
  const cityLocationName = forecastData?.location
    ? cityLocation
    : "Nenhuma cidade selecionada.";

  const onRefresh = () => {
    if (latitude && longitude) {
      getForecastData({
        latitude,
        longitude,
      });
    }
  };

  const refRBSheet = useRef<RBSheet | null>(null);

  return (
    <SafeAreaView>
      <ImageBackground
        source={getBackground(conditionCode, isDay)}
        resizeMode="cover"
        alt="Background"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <View alignItems="center" h={"100%"} w={"100%"} px={"$6"}>
          <DrawerBottom refRBSheet={refRBSheet} />
          <View
            flexDirection="row"
            w={"100%"}
            alignItems="center"
            justifyContent="space-between"
            mt={25}
          >
            <TouchableOpacity onPress={() => navigate("SEARCHSCREEN")}>
              <View flexDirection="row" alignItems="center" gap={5}>
                <Ionicons name="md-location-outline" size={24} color="white" />

                <Text fontSize={15} color={"#FFF"}>
                  {cityLocationName}
                </Text>
                <Entypo name="chevron-small-down" size={24} color="white" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => refRBSheet.current?.open()}>
              <Feather name="more-horizontal" size={28} color="white" />
            </TouchableOpacity>
          </View>

          <Header
            currentTemperature={parseInt(forecastData?.current?.temp_c)}
            feelsLike={parseInt(forecastData?.current?.feelslike_c)}
            conditionCode={conditionCode}
            conditionText={condition}
            isDay={isDay}
          />
          <ForecastContainer
            forecastData={forecastData}
            loading={loading}
            onRefresh={onRefresh}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
