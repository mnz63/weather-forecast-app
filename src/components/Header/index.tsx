import { Text, View } from "@gluestack-ui/themed";
import { Image } from "react-native";
import { getWeatherIcon } from "../../common/utils/functions";
import EmptyHeader from "../EmptyHeader";

type Props = {
  currentTemperature?: number;
  isDay?: boolean;
  feelsLike?: number;
  conditionCode?: number;
  conditionText?: string;
};

export default function Header({
  currentTemperature,
  isDay,
  conditionCode,
  feelsLike,
  conditionText,
}: Props) {
  return (
    <>
      {!currentTemperature ? (
        <EmptyHeader />
      ) : (
        <View alignItems="center" my={30}>
          <Image
            source={getWeatherIcon(conditionCode, isDay)}
            style={{
              width: 130,
              height: 150,
            }}
            alt="Icon"
          />
          <Text
            color={"#FFF"}
            fontSize={70}
            fontWeight={"$bold"}
            lineHeight={70}
            mt={15}
          >
            {currentTemperature || 0}°
          </Text>
          <Text color="#EBEBF5" fontWeight={"$light"} fontSize={20}>
            {conditionText}
          </Text>
          <View flexDirection="row" gap={5}>
            <Text color={"#FFF"}>Sensação térmica: {feelsLike || 0}°C</Text>
          </View>
        </View>
      )}
    </>
  );
}
