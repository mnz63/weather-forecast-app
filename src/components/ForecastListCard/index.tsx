import { View, Text } from "@gluestack-ui/themed";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ptBR } from "date-fns/locale";
import { format, isToday } from "date-fns";
import { getWeatherListIcon } from "../../common/utils/functions";

type Props = {
  data?: any;
};

export default function ForecastListCard({ data }: Props) {
  const WEEKDAYFORMATER = {
    Monday: "Segunda",
    Tuesday: "Terça",
    Wednesday: "Quarta",
    Thursday: "Quinta",
    Friday: "Sexta",
    Saturday: "Sábado",
    Sunday: "Domingo",
  };

  const date = new Date(`${data?.date} ${"01:00"}`);
  const weekDay = format(date, "eeee");
  const dayAndMonth = format(date, "dd, MMM", { locale: ptBR });
  const minTemp = parseInt(data?.day?.mintemp_c);
  const maxTemp = parseInt(data?.day?.maxtemp_c);
  const condition = data?.day?.condition?.code;

  return (
    <View
      bgColor="#0000004e"
      w={"90%"}
      h={80}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-around"
      borderRadius={20}
    >
      <View>
        <Text color={"#FFF"} fontWeight="$semibold" fontSize={16}>
          {isToday(date) ? "Hoje" : WEEKDAYFORMATER[weekDay]}
        </Text>
        <Text color={"#FFF"} fontWeight="$light" fontSize={13}>
          {dayAndMonth}
        </Text>
      </View>
      <View gap={10} alignItems="flex-end">
        <View flexDirection="row" alignItems="center" gap={5}>
          <Text color={"#FFF"} fontSize={20} fontWeight={"$medium"}>
            {maxTemp}°
          </Text>
          <AntDesign name="caretup" size={15} color="red" />
        </View>
        <View flexDirection="row" alignItems="center" gap={5}>
          <Text color={"#FFF"} fontSize={20} fontWeight={"$light"}>
            {minTemp}°
          </Text>
          <AntDesign name="caretdown" size={15} color="#E0D9FF" />
        </View>
      </View>
      <View>
        <Image
          style={{
            width: 50,
            height: 50,
          }}
          source={getWeatherListIcon(condition, "12:00")}
        />
      </View>
    </View>
  );
}
