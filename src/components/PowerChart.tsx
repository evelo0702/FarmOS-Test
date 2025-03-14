"use client";
import { GroupedPowerData, PowerConsumption } from "@/src/types/power";
import { useMemo } from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";

// 차트 그룹 설정
const chartGroups = [
  {
    title: "연료 전력 사용량",
    keys: [{ key: "fuel", label: "Fuel", color: "#220ea1" }],
  },
  {
    title: "난방 전력 사용량",
    keys: [{ key: "heater", label: "Heater", color: "#691212" }],
  },
  {
    title: "일반 & 네트워크 & 저장소 전력 사용량",
    keys: [
      { key: "general", label: "General", color: "#8884d8" },
      { key: "nutsys", label: "Nutsys", color: "#ffc658" },
      { key: "storage", label: "Storage", color: "#ff7300" },
    ],
    fullWidth: true,
  },
];

export default function PowerChart({ data }: { data: PowerConsumption[] }) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {chartGroups.map(({ title, keys, fullWidth }) => (
        <div
          key={title}
          className={`bg-white dark:bg-black shadow-lg rounded-lg p-4 border border-gray-300 dark:border-gray-700 ${
            fullWidth ? "md:col-span-2 w-full" : ""
          }`}
        >
          <h2 className="text-lg font-semibold text-center mb-2">{title}</h2>
          <ResponsiveContainer width="100%" height={250}>
            {formattedData.length > 0 ? (
              <ComposedChart data={formattedData} margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis
                  domain={["auto", "auto"]}
                  tickFormatter={(value) => value.toString()}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid #ddd",
                  }}
                />
                <Legend />
                {keys.map(({ key, label, color }) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={color}
                    dot={{ fill: color }}
                    name={label}
                  />
                ))}
              </ComposedChart>
            ) : (
              // 빈 데이터일 경우 메시지 표시
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  color: "#999",
                  fontSize: "14px",
                }}
              >
                데이터가 없습니다.
              </div>
            )}
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
}
