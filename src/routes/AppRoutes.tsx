import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import SearchLocationScreen from "../screens/SearchLocationScreen";

const Stack = createNativeStackNavigator();

export const AppRoutes = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          statusBarTranslucent: true,
        }}
        initialRouteName={"SPLASHSCREEN"}
      >
        <Stack.Screen
          name={"SPLASHSCREEN"}
          component={SplashScreen}
          options={{
            gestureEnabled: false,
            statusBarHidden: true,
          }}
        />
        <Stack.Screen
          name={"HOMESCREEN"}
          component={HomeScreen}
          options={{
            gestureEnabled: false,
            statusBarTranslucent: true,
            statusBarColor: "#1F1D47",
          }}
        />
        <Stack.Screen
          name={"SEARCHSCREEN"}
          component={SearchLocationScreen}
          options={{
            gestureEnabled: false,
            statusBarTranslucent: true,
            statusBarColor: "#1F1D47",
          }}
        />
      </Stack.Navigator>
    </>
  );
};
