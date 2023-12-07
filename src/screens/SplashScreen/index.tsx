import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { ImageBackground } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useForecastStore } from "../../store/forecastStore";

export default function SplashScreen() {
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();
  const [errorMsg, setErrorMsg] = useState(null);
  const { setLocation } = useForecastStore();
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    setLocation(location);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <ImageBackground
      source={require("../../../assets/img/background.png")}
      resizeMode="cover"
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        source={require("../../../assets/img/SplashLottie.json")}
        autoPlay
        loop={false}
        onAnimationFinish={() => navigate("HOMESCREEN")}
        style={{
          width: 200,
          height: 200,
        }}
      />
    </ImageBackground>
  );
}
