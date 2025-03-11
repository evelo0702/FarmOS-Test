import { query } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";

export async function GET() {
  const monthSql = "SELECT DISTINCT obsmonth FROM engmonth";
  const yearSql =
    "SELECT DISTINCT LEFT(obsmonth, 4) AS year FROM iftech.engmonth ORDER BY year";
  const categorySql = "SELECT DISTINCT dgname FROM iftech.engmonth";
  try {
    const monthResult = (await query(monthSql)) as RowDataPacket[];
    const yearResult = (await query(yearSql)) as RowDataPacket[];
    const categoryResult = (await query(categorySql)) as RowDataPacket[];
    const totaldata = [
      {
        month: monthResult.map((i) => i.obsmonth),
        year: yearResult.map((i) => i.year),
        category: categoryResult.map((i) => i.dgname),
      },
    ];
    return NextResponse.json(totaldata);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
