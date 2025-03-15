import { query } from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  let start = searchParams.get("start");
  let end = start;
  if (!type || !start) {
    return NextResponse.json(
      { error: "API 요청에 필요한 데이터가 부족합니다" },
      { status: 400 }
    );
  }

  if (type === "month") {
    start = start + "-01";
    end = end + "-31";
  } else {
    start = start + "-01";
    end = end + "-12";
  }
  try {
    const sql =
      type === "month"
        ? `SELECT obsday AS date, dgname, CASE WHEN dgname = 'fuel' THEN ROUND(nvalue, 2) ELSE nvalue END AS nvalue FROM engday WHERE obsday BETWEEN ? AND ?`
        : `SELECT obsmonth AS date, dgname, CASE WHEN dgname = 'fuel' THEN ROUND(nvalue, 2) ELSE nvalue END AS nvalue FROM iftech.engmonth WHERE obsmonth BETWEEN ? AND ? ORDER BY obsmonth, dgname`;
    const data = await query(sql, [start, end]);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching power data:", error);
    return NextResponse.json(
      { error: "Failed to fetch power data" },
      { status: 500 }
    );
  }
}
