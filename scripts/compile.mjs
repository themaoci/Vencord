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

console.log("[Vencord] Compile (build only, no inject)");

execSync("pnpm build", { stdio: "inherit", cwd: BASE_DIR });

console.log("\n[Vencord] Build complete. Output in dist/.");
console.log("[Vencord] To install, run: pnpm reinstall  (or pnpm setup for first-time).");
