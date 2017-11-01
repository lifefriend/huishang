@echo off&setlocal enabledelayedexpansion
if defined flag goto next
title n_p_bar  
mode con cols=60 lines=12

for /l %%a in (1,1,22) do set "t=!t!"
echo,&echo,&echo,
echo %tab%┌──────────────────────────────────┐
echo %tab%│      READY GO ...                │ 
echo %tab%└──────────────────────────────────┘
echo %tab%%t%&set /p=%tab% <nul
@echo.
set "flag=a"
start /b %~fs0
:lp
for /l %%a in (1,1,30) do (
   set /p=■<nul
   for /l %%a in (1,1,600) do echo>nul
)
for /l %%a in (1,1,30) do (
    set /p= <nul
    for /l %%a in (1,1,600) do echo>nul
)
goto lp    
:next

@cd %~dp0
@node checkfolder.js > log.txt
@node prebuild.js >> log.txt
@node checkfile.js >> log.txt
@node r.js -o build.js >> log.txt
@node afetrbuild.js >> log.txt
@echo success...

taskkill /f /fi "windowtitle ne n_p_bar" /im "cmd.exe"
exit