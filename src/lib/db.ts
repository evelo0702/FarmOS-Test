import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
const checkDBConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log(`DB: ${process.env.DB_NAME} Connect`);
    connection.release();
  } catch (error) {
    console.error("Failed connect DB:", error);
  }
};
checkDBConnection();

export async function query(
  sql: string,
  params?: string[]
): Promise<RowDataPacket[] | ResultSetHeader[]> {
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.execute<
      RowDataPacket[] | ResultSetHeader[]
    >(sql, params ? params : null);
    return results;
  } finally {
    connection.release();
  }
}
