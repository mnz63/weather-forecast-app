import RBSheet from "@nonam4/react-native-bottom-sheet";
import { Dimensions } from "react-native";
import { BlurView } from "expo-blur";
import { View, Text } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { AntDesign } from "@expo/vector-icons";
import { useForecastStore } from "../../store/forecastStore";
import {
  AIR_QUALITY_TABLE,
  UV_INDEX_TABLE,
} from "../../common/utils/functions";

type Props = {
  refRBSheet: any;
};

export default function DrawerBottom({ refRBSheet }: Props) {
  const height = Dimensions.get("window").height / 1.8;
  const width = Dimensions.get("window").width;

  const { forecastData } = useForecastStore();

  const data = forecastData?.current?.air_quality;
  const uvIndexProp = "gb-defra-index";
  const airQualityProp = "us-epa-index";

  const uvIndex = data[uvIndexProp];
  const airQuality = data[airQualityProp];

  const visibilityKm = parseInt(forecastData?.current?.vis_km);
  const visibilityMilles = parseInt(forecastData?.current?.vis_miles);

  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={true}
      animationType={"fade"}
      minClosingHeight={10}
      height={height}
      customStyles={{
        wrapper: {
          backgroundColor: "transparent",
        },
        draggableIcon: {
          backgroundColor: "transparent",
        },
        container: {
          backgroundColor: "transparent",
        },
      }}
    >
      <View
        style={{
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          overflow: "hidden",
        }}
      >
        <BlurView
          intensity={50}
          tint="dark"
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            backgroundColor: "#48319D",
          }}
        >
          <View
            style={{
              width: "100%",
              height: height,
            }}
            padding={"$6"}
            pt={"$10"}
          >
            <View
              bgColor="#b9b9b946"
              borderRadius={20}
              h={150}
              p={"5%"}
              mb={20}
            >
              <View flexDirection="row" alignItems="center" gap={10}>
                <AntDesign name="heart" size={20} color="#ffffff96" />
                <Text color={"#ffffff96"} fontSize={13} fontWeight="$bold">
                  QUALIDADE DO AR
                </Text>
              </View>
              <View h={"100%"} justifyContent="space-evenly">
                <Text color={"#FFF"} fontWeight="$bold" fontSize={20}>
                  {airQuality} - {AIR_QUALITY_TABLE[airQuality]}
                </Text>
                <Progress.Bar
                  progress={airQuality / 10}
                  width={300}
                  color={"#48319D"}
                  unfilledColor="#FFF"
                  borderWidth={0}
                />
              </View>
            </View>
            <View
              flexDirection="row"
              width={"100%"}
              justifyContent="space-between"
            >
              <View
                bgColor="#b9b9b946"
                borderRadius={20}
                h={150}
                p={"5%"}
                w={"45%"}
              >
                <View flexDirection="row" alignItems="center" gap={10} mb={2}>
                  <Ionicons name="sunny" size={20} color="#ffffff96" />
                  <Text color={"#ffffff96"} fontSize={13} fontWeight="$bold">
                    INDÍCE UV
                  </Text>
                </View>
                <View mb={"$2"}>
                  <Text
                    color={"#FFF"}
                    fontWeight="$bold"
                    fontSize={50}
                    lineHeight={50}
                  >
                    {uvIndex}
                  </Text>
                  <Text color={"#FFF"} fontWeight="$bold" fontSize={20}>
                    {UV_INDEX_TABLE[uvIndex]}
                  </Text>
                </View>
                <Progress.Bar
                  progress={uvIndex / 10}
                  width={width / 3.5}
                  color={"#48319D"}
                  unfilledColor="#FFF"
                  borderWidth={0}
                />
              </View>
              <View
                bgColor="#b9b9b946"
                borderRadius={20}
                h={150}
                p={"5%"}
                w={"45%"}
              >
                <View flexDirection="row" alignItems="center" gap={10} mb={2}>
                  <AntDesign name="eye" size={20} color="#ffffff96" />
                  <Text color={"#ffffff96"} fontSize={13} fontWeight="$bold">
                    VISIBILIDADE
                  </Text>
                </View>
                <View mb={"$2"} w={"100%"}>
                  <Text
                    color={"#FFF"}
                    fontWeight="$bold"
                    fontSize={25}
                    lineHeight={50}
                  >
                    {visibilityKm} km
                  </Text>
                  <Text
                    color={"#FFF"}
                    fontWeight="$bold"
                    fontSize={25}
                    lineHeight={25}
                  >
                    {visibilityMilles} milhas
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </BlurView>
      </View>
    </RBSheet>
  );
}
