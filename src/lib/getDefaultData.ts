import { Filters, PowerConsumption } from "../types/power";
import { fetchJson } from "./fetchJson";

export async function getDefaultData() {
  // 1. filters 데이터 가져오기
  const filters = await fetchJson<Filters>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/filters`
  );

  // 2. filters가 없으면 에러 메시지 반환
  if (!filters || !filters.month || filters.month.length === 0) {
    return { filters: null, powerRes: null };
  }

  // 3. 마지막 달의 전달을 기본값으로 설정
  const number = filters.month.length - 2 >= 0 ? filters.month.length - 2 : 0;

  // 4. engmonth 데이터만 있을 경우 예외 처리
  const start =
    filters.month.length > 0
      ? filters.month[number]
      : filters.year[filters.year.length - 1];

  // 5. 전력 사용량 데이터 가져오기
  const powerRes = await fetchJson<PowerConsumption[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/power?type=month&start=${start}`
  );

  return { filters, powerRes };
}
