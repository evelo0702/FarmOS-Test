import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "@/src/lib/fetchJson";
import { PowerConsumption } from "@/src/types/power";

export const usePowerData = (
  selectedType: string,
  selectedDate: string,
  defaultData: PowerConsumption[]
) => {
  return useQuery({
    queryKey: ["power", selectedType, selectedDate],
    placeholderData: defaultData,
    queryFn: async () => {
      return fetchJson<PowerConsumption[]>(
        `/api/power?type=${selectedType}&start=${selectedDate}`
      );
    },
    staleTime: 1000 * 60 * 5,
  });
};
