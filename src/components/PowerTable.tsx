"use client";

import { useMemo } from "react";
import { GroupedPowerData, PowerConsumption } from "../types/power";

export default function PowerTable({ data }: { data: PowerConsumption[] }) {
  const formattedData = useMemo(() => {
      if (!data || data.length === 0) return [];
  
      return Object.values(
        data.reduce((acc, { date, dgname, nvalue }) => {
          if (!acc[date]) acc[date] = { date };
          acc[date][dgname] = nvalue ?? 0;
          return acc;
        }, {} as Record<string, GroupedPowerData>)
      );
    }, [data]);
  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 shadow-lg rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">전력 사용량 테이블</h2>

            <div className="max-h-80 overflow-y-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-neutral-200 dark:bg-neutral-800 text-left">
              <th className="px-4 py-2 border border-neutral-300 dark:border-neutral-700">
                날짜
              </th>
              <th className="px-4 py-2 border border-neutral-300 dark:border-neutral-700">
                Fuel
              </th>
              <th className="px-4 py-2 border border-neutral-300 dark:border-neutral-700">
                Heater
              </th>
              <th className="px-4 py-2 border border-neutral-300 dark:border-neutral-700">
                General
              </th>
              <th className="px-4 py-2 border border-neutral-300 dark:border-neutral-700">
                Nutsys
              </th>
              <th className="px-4 py-2 border border-neutral-300 dark:border-neutral-700">
                Storage
              </th>
            </tr>
          </thead>
          <tbody>
            {formattedData.length > 0 ? (
              formattedData.map((row, index) => (
                <tr
                  key={index}
                  className="border border-neutral-300 dark:border-neutral-700 odd:bg-white even:bg-neutral-100 dark:odd:bg-black dark:even:bg-neutral-900"
                >
                  <td className="px-4 py-2 border border-neutral-300 dark:border-neutral-700">
                    {row.date}
                  </td>
                  <td className="px-4 py-2 border border-neutral-300 dark:border-neutral-700">
                    {row.fuel ?? "Null"}
                  </td>
                  <td className="px-4 py-2 border border-neutral-300 dark:border-neutral-700">
                    {row.heater ?? "Null"}
                  </td>
                  <td className="px-4 py-2 border border-neutral-300 dark:border-neutral-700">
                    {row.general ?? "Null"}
                  </td>
                  <td className="px-4 py-2 border border-neutral-300 dark:border-neutral-700">
                    {row.nutsys ?? "Null"}
                  </td>
                  <td className="px-4 py-2 border border-neutral-300 dark:border-neutral-700">
                    {row.storage ?? "Null"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-2 text-center text-gray-500 dark:text-gray-400"
                >
                  데이터가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
