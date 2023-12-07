import { API_URL, API_TOKEN } from "@env";
import axios from "axios";
import { useCallback, useState } from "react";
import { useForecastStore } from "../store/forecastStore";
import * as Location from "expo-location";
import { format } from "date-fns";

export default function useGetForecastData() {
  const { setForecastData, setAstronomyData, setLocation } = useForecastStore();
  const [loading, setLoading] = useState(false);
  const today = new Date();
  const formatedToday = format(today, "yyyy-MM-dd");

  const getForecastData = useCallback(async ({ latitude, longitude }) => {
    setLoading(true);
    const responses = await axios.get(
      `${API_URL}/forecast.json?key=${API_TOKEN}&q=${latitude},${longitude}&aqi=yes&lang=pt&days=5`
    );
    const astroResponse = await axios.get(
      `${API_URL}/astronomy.json?key=${API_TOKEN}&q=${latitude},${longitude}&dt=${formatedToday}`
    );
    setForecastData(responses?.data);
    setAstronomyData(astroResponse?.data);
    setLoading(false);
  }, []);

  const getCurrentLocation = useCallback(async () => {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    setLocation(location);
  }, []);

  return { getForecastData, getCurrentLocation, loading };
}
