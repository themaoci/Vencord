@echo off
setlocal enabledelayedexpansion

REM === Vencord build/install helper (Windows) ===
REM Auto-locates Node.js, then runs the requested pnpm script.
REM Place this in the Vencord repo root (D:\Git\000\Vencord).

cd /d "%~dp0"

REM --- Locate Node.exe ---
set "NODE_EXE="
where node >nul 2>&1 && set "NODE_EXE=node"

if not defined NODE_EXE (
    REM Fallback: Playwright-bundled Node
    set "PLAYWRIGHT_NODE=%LOCALAPPDATA%\Programs\Python\Python314\Lib\site-packages\playwright\driver\node.exe"
    if exist "!PLAYWRIGHT_NODE!" (
        set "NODE_DIR=!PLAYWRIGHT_NODE!"
        for %%I in ("!PLAYWRIGHT_NODE!") do set "NODE_DIR=%%~dpI"
        set "PATH=!NODE_DIR!;%PATH%"
        set "NODE_EXE=node"
        echo [Vencord] Node not on PATH, using Playwright-bundled Node.
    )
)

if not defined NODE_EXE (
    echo [Vencord] ERROR: Node.js not found.
    echo [Vencord] Install Node v18+ from https://nodejs.org/
    pause
    exit /b 1
)

echo [Vencord] Using Node:
node --version
echo.

REM --- Menu ---
echo === Vencord Menu ===
echo 1. Full setup   (install deps + build + inject into Discord)
echo 2. Reinstall    (build + re-inject, skips deps)
echo 3. Compile only (build to dist/, no inject)
echo 4. Uninstall    (remove Vencord from Discord)
echo 5. Exit
echo.
set /p "CHOICE=Choose [1-5]: "

if "%CHOICE%"=="1" (
    echo Running: pnpm setup
    call pnpm setup
    goto :done
)
if "%CHOICE%"=="2" (
    echo Running: pnpm reinstall
    call pnpm reinstall
    goto :done
)
if "%CHOICE%"=="3" (
    echo Running: pnpm compile
    call pnpm compile
    goto :done
)
if "%CHOICE%"=="4" (
    echo Running: pnpm uninject
    call pnpm uninject
    goto :done
)
if "%CHOICE%"=="5" exit /b 0

echo Invalid choice.
goto :menu_end

:done
echo.
echo [Vencord] Done.
:menu_end
pause
