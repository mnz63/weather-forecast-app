import {
  View,
  Text,
  Input,
  InputField,
  InputIcon,
  ScrollView,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import axios from "axios";
import _ from "lodash";
import { truncateWord } from "../../common/utils/truncate";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { API_AUTOCOMPLETE_URL, API_AUTOCOMPLETE_TOKEN } from "@env";
import { useForecastStore } from "../../store/forecastStore";
import * as Location from "expo-location";

type Props = {
  onSearchLocation?: (city: string) => void;
};

export default function SearchLocationScreen({ onSearchLocation }: Props) {
  const [autoCompleteData, setAutoCompleteData] = useState(null);
  const { navigate, goBack }: NavigationProp<ParamListBase> = useNavigation();

  const getAutoCompleteData = _.debounce(async (value) => {
    if (value.trim() !== "" && value !== null) {
      const responses = await axios.get(
        `${API_AUTOCOMPLETE_URL}text=${value}&format=json&apiKey=${API_AUTOCOMPLETE_TOKEN}&lang=pt`
      );
      setAutoCompleteData(responses?.data?.results);
    } else {
      setAutoCompleteData(null);
    }
  }, 200);

  const { setLocation } = useForecastStore();
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    setLocation(location);
  };

  return (
    <SafeAreaView>
      <View w={"100%"} h={"100%"} alignItems="center" pt={20} px={"$6"}>
        <TouchableOpacity
          style={{
            alignSelf: "flex-start",
          }}
          onPress={goBack}
        >
          <AntDesign name="arrowleft" size={20} color="#FFF" />
        </TouchableOpacity>
        <Text fontWeight="$bold" fontSize={20} color="#FFF">
          Selecionar Localização
        </Text>
        <Text
          fontWeight="$light"
          fontSize={15}
          textAlign="center"
          mt={10}
          color="#FFF"
        >
          Procure por uma cidade ou use a localização do seu dispositivo.
        </Text>
        <View
          flexDirection="row"
          justifyContent="space-between"
          w={"100%"}
          mt={20}
        >
          <Input
            w={"80%"}
            h={50}
            borderRadius={10}
            bgColor="#e0d9ff22"
            borderWidth={0}
            size="md"
            isDisabled={false}
            alignItems="center"
          >
            <View
              ml={20}
              alignItems="center"
              justifyContent="center"
              w={20}
              h={20}
            >
              <AntDesign name="search1" size={20} color="#FFF" />
            </View>
            <InputField
              placeholder="Pesquisar"
              placeholderTextColor={"#E0D9FF"}
              color={"#FFF"}
              fontWeight="$light"
              onChangeText={(value) => getAutoCompleteData(value)}
            />
          </Input>
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              backgroundColor: "#e0d9ff22",
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={async () => {
              await getLocation();
              navigate("HOMESCREEN");
            }}
          >
            <Ionicons name="md-location-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView
          w={"100%"}
          maxHeight={"$full"}
          borderRadius={10}
          mt={10}
          showsVerticalScrollIndicator={false}
          fadingEdgeLength={100}
        >
          {autoCompleteData
            ?.filter((item) => "city" in item)
            ?.map((item, index) => (
              <TouchableOpacity
                style={{
                  height: 60,
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  marginTop: 10,
                  backgroundColor: "#e0d9ff22",
                }}
                activeOpacity={0.6}
                key={index}
                onPress={() => {
                  navigate("HOMESCREEN", {
                    latitude: item?.lat,
                    longitude: item?.lon,
                  });
                }}
              >
                <Ionicons name="md-location-outline" size={20} color="white" />
                <Text color={"#FFF"} fontSize={15} ml={5}>
                  {truncateWord(item?.city, 30)}
                </Text>
                <Text color={"#b4b4b4"} fontSize={13} ml={5} lineHeight={53}>
                  {item?.address_line2?.split(",")[1]}, {item?.country}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
