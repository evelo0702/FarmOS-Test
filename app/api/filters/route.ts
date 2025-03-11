import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";

export async function GET() {
  const monthSql = "SELECT DISTINCT obsmonth FROM engmonth";
  const yearSql = "SELECT DISTINCT LEFT(obsmonth, 4) AS year FROM engmonth ORDER BY year";
  const categorySql = "SELECT DISTINCT dgname FROM engmonth";

  try {
    const [monthResult, yearResult, categoryResult] = await Promise.all([
      query(monthSql),
      query(yearSql),
      query(categorySql),
    ]) as [RowDataPacket[], RowDataPacket[], RowDataPacket[]];

    return NextResponse.json({
      month: monthResult.map((i) => i.obsmonth),
      year: yearResult.map((i) => i.year),
      category: categoryResult.map((i) => i.dgname),
    });
  } catch (error) {
    console.error("Error fetching filter data:", error);
    return NextResponse.json({ error: "Failed to fetch filter data" }, { status: 500 });
  }
}
