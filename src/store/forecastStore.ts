import { LocationObject } from 'expo-location';
import { create } from 'zustand'

type Store = {
  forecastData: any;
  astronomyData: any;
  location: LocationObject;
  setForecastData: (data: any) => void;
  setAstronomyData: (data: any) => void;
  setLocation: (data: any) => void;
}

export const useForecastStore = create<Store>()((set) => ({
  forecastData: {},
  astronomyData: {},
  location: null,
  setForecastData: (data) => set(() => ({ forecastData: data })),
  setAstronomyData: (data) => set(() => ({ astronomyData: data })),
  setLocation: (data) => set(() => ({ location: data })),
}))