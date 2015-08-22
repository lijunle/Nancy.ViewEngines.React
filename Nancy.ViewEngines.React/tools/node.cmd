@echo off
for /f "delims=" %%A in ('dir "%~dp0..\..\node.js.*" /b') do set "nodePath=%%A"

if not "%nodePath%" == "" (
  "%~dp0..\..\%nodePath%\node" %*
  goto exit
)

REM for example project which reference target file directly
for /f "delims=" %%A in ('dir "%~dp0..\..\packages\node.js.*" /b') do set "nodePath=%%A"
"%~dp0..\..\packages\%nodePath%\node" %*

:exit
