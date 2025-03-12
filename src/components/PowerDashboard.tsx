"use client";
import { Filters, PowerConsumption } from "../types/power";
import PowerChart from "./PowerChart";
import PowerTable from "./PowerTable";
import DataFilter from "./DataFilter";
import { useState } from "react";
import { usePowerData } from "../store/usePowerData";

export default function PowerDashboard({
  defaultData,
  filters,
}: {
  defaultData: PowerConsumption[];
  filters: Filters;
}) {
  const [selectedDate, setSelectedDate] = useState(
    filters.month[filters.month.length - 2]
  );
  const [selectedType, setSelectedType] = useState("month");

  const { data } = usePowerData(selectedType, selectedDate, defaultData);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6 flex justify-center">
      <div className="w-full max-w-5xl bg-white dark:bg-black text-black dark:text-white">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center">
            전력 사용량 대시보드
          </h1>
        </div>

        <DataFilter
          filters={filters}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        <div className="space-y-6">
          <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 shadow-lg rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">전력 사용량 차트</h2>
            <div className="p-4 flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 rounded-lg">
              <PowerChart data={data!} />
            </div>
          </div>

          <PowerTable data={data!} />
        </div>
      </div>
    </div>
  );
}
