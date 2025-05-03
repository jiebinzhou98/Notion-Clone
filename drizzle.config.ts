import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" }); // 加载 .env 文件

export default {
  schema: "./src/lib/db/schema.ts", // 你的 schema 文件路径
  out: "./drizzle/migrations",      // 迁移文件输出目录
  dialect: "postgresql",            // 数据库类型
  dbCredentials: {
    url: process.env.DATABASE_URL!, // 直接使用 Neon 提供的 URL
  },
  // 可选配置
  verbose: true,    // 显示详细日志
  strict: true,     // 严格模式
} satisfies Config;