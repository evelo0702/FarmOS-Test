import { query } from "@/src/lib/db";
import { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";

export async function GET() {
  const monthSql = "SELECT DISTINCT obsmonth FROM engmonth";
  const yearSql =
    "SELECT DISTINCT LEFT(obsmonth, 4) AS year FROM engmonth ORDER BY year";

  try {
    const [monthResult, yearResult] = (await Promise.all([
      query(monthSql),
      query(yearSql),
    ])) as [RowDataPacket[], RowDataPacket[]];

    return NextResponse.json({
      month: monthResult.map((i) => i.obsmonth),
      year: yearResult.map((i) => i.year),
    });
  } catch (error) {
    console.error("Error fetching filter data:", error);
    return NextResponse.json(
      { error: "Failed to fetch filter data" },
      { status: 500 }
    );
  }
}
