/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2024 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import "./checkNodeVersion.js";

import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const BASE_DIR = join(dirname(fileURLToPath(import.meta.url)), "..");
const installerScript = join(BASE_DIR, "scripts", "runInstaller.mjs");

if (process.platform !== "win32") {
    console.error("[Vencord] This reinstall script is Windows-only.");
    process.exit(1);
}

function run(cmd, label) {
    console.log(`\n=== ${label} ===`);
    execSync(cmd, { stdio: "inherit", cwd: BASE_DIR });
}

console.log("[Vencord] Rebuild + reinstall (skips dependency install)");

run("pnpm build", "1/2 Building Vencord");
run(`node "${installerScript}" -- -install -branch stable`, "2/2 Re-injecting into Discord (stable)");

console.log("\n[Vencord] Reinstall complete.");
console.log("[Vencord] Fully quit Discord and relaunch to load the new build.");
