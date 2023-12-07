import { Text, View } from "@gluestack-ui/themed";
import { Image } from "react-native";
import { getWeatherIcon } from "../../common/utils/functions";

export default function EmptyHeader() {
  return (
    <View alignItems="center" my={30}>
      <View
        bgColor="#e0e0e026"
        borderRadius={20}
        style={{
          width: 130,
          height: 150,
        }}
      />
      <View bgColor="#e0e0e026" w={70} h={70} my={5} />

      <View bgColor="#e0e0e026" w={125} h={20} />
      <View bgColor="#e0e0e026" w={145} h={20} mt={2} />
    </View>
  );
}
