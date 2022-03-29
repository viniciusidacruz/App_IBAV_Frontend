import React from "react";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { Routes } from "./src/routes";

import theme from "./src/styles/theme";
import { FormProvider } from "./src/contexts/FormReport";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <FormProvider>
        <Routes />
      </FormProvider>
      <StatusBar style="light" backgroundColor="transparent" translucent />
    </ThemeProvider>
  );
}
