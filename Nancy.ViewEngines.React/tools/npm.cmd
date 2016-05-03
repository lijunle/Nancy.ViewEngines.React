@echo off
for /f "delims=" %%A in ('dir "%~dp0..\..\Npm.*" /b') do set "npmPath=%%A"

REM This works for shipped NuGet package structure.
if exist "%~dp0..\..\%npmPath%\node_modules\npm\bin\npm-cli.js" (
  "%~dp0node" "%~dp0..\..\%npmPath%\node_modules\npm\bin\npm-cli.js" %*
  exit /b %errorlevel%
)

REM This works for development structure.
for /f "delims=" %%A in ('dir "%~dp0..\..\packages\Npm.*" /b') do set "npmPath=%%A"
if exist "%~dp0..\..\packages\%npmPath%\node_modules\npm\bin\npm-cli.js" (
  "%~dp0node" "%~dp0..\..\packages\%npmPath%\node_modules\npm\bin\npm-cli.js" %*
  exit /b %errorlevel%
)
