import PowerDashboard from "@/src/components/PowerDashboard";
import { getDefaultData } from "@/src/lib/getDefaultData";

export default async function Dashboard() {
  // 초기데이터
  const { filters, powerRes } = await getDefaultData();

  if (!filters) {
    return (
      <p className="text-red-500 text-center">저장된 데이터가 없습니다.</p>
    );
  }

  return (
    <div>
      <PowerDashboard defaultData={powerRes} filters={filters} />
    </div>
  );
}
