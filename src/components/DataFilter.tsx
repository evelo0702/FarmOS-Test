"use client";
import { Filters } from "../types/power";

interface DataFilterProps {
  filters: Filters;
  selectedDate: string;
  setSelectedDate: (month: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
}
export default function DataFilter({
  filters,
  selectedDate,
  setSelectedDate,
  selectedType,
  setSelectedType,
}: DataFilterProps) {
  const handleMonthChange = (month: string) => {
    setSelectedDate(month);
    setSelectedType("month");
  };
  const handleYearChange = (year: string) => {
    setSelectedDate(year);
    setSelectedType("year");
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="flex space-x-4">
        <select
          className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-black text-black dark:text-white"
          value={selectedType === "month" ? selectedDate : ""}
          onChange={(e) => handleMonthChange(e.target.value)}
        >
          <option value="">월별 사용량 보기</option>
          {filters.month.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>

        {/* 연도 선택 */}
        <select
          className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-black text-black dark:text-white"
          value={selectedType === "year" ? selectedDate : ""}
          onChange={(e) => handleYearChange(e.target.value)}
        >
          <option value="">연도별 사용량 보기</option>
          {filters.year.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        <button className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-medium rounded-lg border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-800 hover:text-white dark:hover:bg-neutral-200 dark:hover:text-black">
          사용량 보기
        </button>
      </div>
    </div>
  );
}
