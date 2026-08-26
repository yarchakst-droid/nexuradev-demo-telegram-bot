import { spawn } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const botDir = path.join(projectRoot, "bot");
const webappDir = path.join(projectRoot, "webapp");
const envPath = path.join(botDir, ".env");

const COLORS = { SETUP: "\x1b[32m", WEBAPP: "\x1b[35m", NGROK: "\x1b[36m", BOT: "\x1b[33m" };
const RESET = "\x1b[0m";
const ANSI_PATTERN = /\x1b\[[0-9;]*m/g;

function stripAnsi(text) {
  return text.replace(ANSI_PATTERN, "");
}

const children = [];
let shuttingDown = false;

function log(label, text) {
  const color = COLORS[label] ?? "";
  for (const line of text.toString().split(/\r?\n/)) {
    if (line.trim().length === 0) continue;
    process.stdout.write(`${color}[${label}]${RESET} ${line}\n`);
  }
}

function killChild(child) {
  if (!child || child.killed || child.exitCode !== null) return;
  if (process.platform === "win32") {
    spawn("taskkill", ["/pid", String(child.pid), "/T", "/F"]);
  } else {
    child.kill("SIGTERM");
  }
}

function shutdown(code) {
  if (shuttingDown) return;
  shuttingDown = true;
  log("SETUP", "Stopping all processes...");
  for (const child of children) killChild(child);
  setTimeout(() => process.exit(code), 400);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

function spawnLabeled(label, command, args, options = {}) {
  const child = spawn(command, args, { shell: true, ...options });
  child.stdout?.on("data", (d) => log(label, d));
  child.stderr?.on("data", (d) => log(label, d));
  child.on("exit", (exitCode) => {
    if (!shuttingDown && exitCode !== 0) {
      log("SETUP", `${label} exited unexpectedly (code ${exitCode}) - shutting down.`);
      shutdown(1);
    }
  });
  children.push(child);
  return child;
}

function waitForVitePort() {
  return new Promise((resolve, reject) => {
    const child = spawnLabeled("WEBAPP", "npm", ["run", "dev"], { cwd: webappDir });
    let resolved = false;
    child.stdout?.on("data", (data) => {
      const match = stripAnsi(data.toString()).match(/Local:\s+https?:\/\/localhost:(\d+)/);
      if (match && !resolved) {
        resolved = true;
        resolve(Number(match[1]));
      }
    });
    setTimeout(() => {
      if (!resolved) reject(new Error("Timed out waiting for Vite to report its port."));
    }, 30_000);
  });
}

async function getActiveTunnelUrl() {
  try {
    const res = await fetch("http://127.0.0.1:4040/api/tunnels");
    if (!res.ok) return null;
    const data = await res.json();
    const httpsTunnel = data.tunnels?.find((t) => t.public_url?.startsWith("https://"));
    return httpsTunnel?.public_url ?? null;
  } catch {
    return null;
  }
}

async function ensureTunnel(port) {
  const existing = await getActiveTunnelUrl();
  if (existing) {
    log("SETUP", `Reusing already-running ngrok tunnel: ${existing}`);
    return existing;
  }

  spawnLabeled("NGROK", "npx", ["ngrok", "http", String(port)]);

  for (let attempt = 0; attempt < 30; attempt++) {
    await new Promise((r) => setTimeout(r, 1000));
    const url = await getActiveTunnelUrl();
    if (url) return url;
  }
  throw new Error("Timed out waiting for ngrok to establish a tunnel.");
}

function updateWebappUrl(url) {
  let content = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";
  if (/^WEBAPP_URL=.*$/m.test(content)) {
    content = content.replace(/^WEBAPP_URL=.*$/m, `WEBAPP_URL=${url}`);
  } else {
    content += `${content.length > 0 && !content.endsWith("\n") ? "\n" : ""}WEBAPP_URL=${url}\n`;
  }
  writeFileSync(envPath, content);
  log("SETUP", `bot/.env updated -> WEBAPP_URL=${url}`);
}

async function main() {
  if (!existsSync(envPath)) {
    throw new Error(`bot/.env not found at ${envPath}. Copy bot/.env.example to bot/.env and set BOT_TOKEN first.`);
  }
  const envContent = readFileSync(envPath, "utf8");
  const tokenMatch = envContent.match(/^BOT_TOKEN=(.*)$/m);
  if (!tokenMatch || tokenMatch[1].trim().length === 0) {
    throw new Error("BOT_TOKEN is empty in bot/.env - set it before running this script.");
  }

  log("SETUP", "Starting Mini App dev server...");
  const port = await waitForVitePort();
  log("SETUP", `Mini App is on port ${port}.`);

  log("SETUP", "Opening ngrok tunnel...");
  const url = await ensureTunnel(port);
  log("SETUP", `Public URL: ${url}`);

  updateWebappUrl(url);

  log("SETUP", "Starting bot...");
  spawnLabeled("BOT", "npm", ["run", "dev"], { cwd: botDir });

  log("SETUP", 'Ready. Open the bot in Telegram, send /start, then tap "Каталог".');
  log("SETUP", "Press Ctrl+C to stop everything.");
}

main().catch((err) => {
  log("SETUP", `Error: ${err.message}`);
  shutdown(1);
});
