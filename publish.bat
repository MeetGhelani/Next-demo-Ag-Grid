@echo off
title Publish AXIOM Solution (Next.js UI and ASP.NET Core API) to IIS
color 0A
echo =============================================================
echo   AXIOM SOLUTION - AUTOMATIC IIS DUAL BUILD AND PUBLISH  
echo =============================================================
echo.

:: -----------------------------------------------------------------
:: STEP 1: PUBLISH ASP.NET CORE BACKEND WEB API (next-demo-api)
:: -----------------------------------------------------------------
echo [1/2] Building and Publishing ASP.NET Core Web API...
set "API_PROJ_DIR=D:\Meet Projects\next-demo-api"
set "API_PUB_DIR=D:\Meet Projects\next-demo-api\publish"

pushd "%API_PROJ_DIR%"
call dotnet publish "next-demo-api.csproj" -c Release -o "%API_PUB_DIR%"
if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo [ERROR] .NET Web API build failed! Check errors above.
    popd
    pause
    exit /b %ERRORLEVEL%
)
popd
echo [SUCCESS] Backend API published to: %API_PUB_DIR%
echo.

:: -----------------------------------------------------------------
:: STEP 2: BUILD NEXT.JS FRONTEND UI (next-demo)
:: -----------------------------------------------------------------
echo [2/2] Building Next.js Static UI Export...
set "UI_PROJ_DIR=D:\Meet Projects\next-demo"

pushd "%UI_PROJ_DIR%"
call npm run build
if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo [ERROR] Next.js UI build failed! Check errors above.
    popd
    pause
    exit /b %ERRORLEVEL%
)

:: Ensure web.config exists in out\ directory for clean IIS routing
if not exist "out\web.config" (
    echo Creating web.config for IIS clean URL rewrites...
    (
        echo ^<?xml version="1.0" encoding="UTF-8"?^>
        echo ^<configuration^>
        echo     ^<system.webServer^>
        echo         ^<defaultDocument^>
        echo             ^<files^>
        echo                 ^<clear /^>
        echo                 ^<add value="index.html" /^>
        echo             ^</files^>
        echo         ^</defaultDocument^>
        echo         ^<rewrite^>
        echo             ^<rules^>
        echo                 ^<rule name="Clean URLs" stopProcessing="true"^>
        echo                     ^<match url=".*" /^>
        echo                     ^<conditions logicalGrouping="MatchAll"^>
        echo                         ^<add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" /^>
        echo                         ^<add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" /^>
        echo                     ^</conditions^>
        echo                     ^<action type="Rewrite" url="{R:0}/index.html" /^>
        echo                 ^</rule^>
        echo             ^</rules^>
        echo         ^</rewrite^>
        echo     ^</system.webServer^>
        echo ^</configuration^>
    ) > "out\web.config"
)
popd

echo.
echo =============================================================
echo  [SUCCESS] Both UI and API Projects Successfully Published!
echo -------------------------------------------------------------
echo  1. Backend API (IIS Site: AXIOM-API):
echo     Physical Path: %API_PUB_DIR%
echo.
echo  2. Frontend UI (IIS Site: AXIOM-UI):
echo     Physical Path: %UI_PROJ_DIR%\out
echo =============================================================
echo.
pause
