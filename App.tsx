import { GluestackUIProvider } from "@gluestack-ui/themed";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { config } from "@gluestack-ui/config";
import { AppRoutes } from "./src/routes/AppRoutes";
import { ImageBackground } from "react-native";

export default function App() {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    },
  };

  const background = require("./assets/img/background.png");

  if (!background) {
    return <></>;
  }

  return (
    <NavigationContainer theme={navTheme}>
      <GluestackUIProvider config={config}>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <AppRoutes />
        </ImageBackground>
      </GluestackUIProvider>
    </NavigationContainer>
  );
}
