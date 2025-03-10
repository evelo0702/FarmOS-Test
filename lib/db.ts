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
    console.log(`데이터베이스: ${process.env.DB_NAME} 연결`);
    connection.release();
  } catch (error) {
    console.error("연결 실패:", error);
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
    >(sql, params);
    return results;
  } finally {
    connection.release();
  }
}
