@echo off
for /f "delims=" %%A in ('dir "%~dp0..\..\node.js.*" /b') do set "nodePath=%%A"

REM This works for shipped NuGet package structure.
if exist "%~dp0..\..\%nodePath%\node.exe" (
  "%~dp0..\..\%nodePath%\node.exe" %*
  exit /b %errorlevel%
)

REM This works for development structure.
for /f "delims=" %%A in ('dir "%~dp0..\..\packages\node.js.*" /b') do set "nodePath=%%A"
if exist "%~dp0..\..\packages\%nodePath%\node.exe" (
  "%~dp0..\..\packages\%nodePath%\node.exe" %*
  exit /b %errorlevel%
)
