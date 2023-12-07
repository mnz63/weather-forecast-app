import { RefreshControl, ScrollView } from "react-native";
import { ConditionInfo } from "../ConditionInfo";
import { HourlyList } from "../HourlyList";
import { ForecastList } from "../ForecastList";
import { SunriseProgress } from "../SunriseProgress";
import { memo } from "react";

type Props = {
  forecastData?: any;
  onRefresh?: () => void;
  loading?: boolean;
};
export const ForecastContainer = memo(
  ({ forecastData, loading, onRefresh }: Props) => {
    return (
      <ScrollView
        style={{
          width: "100%",
        }}
        showsVerticalScrollIndicator={false}
        fadingEdgeLength={100}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        removeClippedSubviews={true}
      >
        <ConditionInfo forecastData={forecastData?.current} />
        <HourlyList />
        <ForecastList forecastData={forecastData?.forecast?.forecastday} />
        <SunriseProgress />
      </ScrollView>
    );
  }
);
