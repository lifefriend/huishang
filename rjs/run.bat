@echo off&setlocal enabledelayedexpansion
if defined flag goto next
title node-progress-bar  
mode con cols=60 lines=20
call :get_tab tab
for /l %%a in (1,1,22) do set "t=!t!"
echo,&echo,&echo,
echo %tab%┌──────────────────────────────────┐
echo %tab%│      READY GO ...                │ 
echo %tab%└──────────────────────────────────┘
echo %tab%%t%&set /p=%tab% <nul
set "flag=a"
start /b %~fs0
:lp
for /l %%a in (1,1,20) do (
   set /p=■<nul
   for /l %%a in (1,1,500) do echo>nul
)
goto lp    
:next

@cd %~dp0
@echo on
@echo clear...
@node checkfolder.js > log.txt
@echo build config...
@node prebuild.js >> log.txt
@echo check file...
@node checkfile.js >> log.txt
@echo build...
@node r.js -o build.js >> log.txt
@echo clear...
@node afetrbuild.js >> log.txt
@echo ###############################
@echo success...
@echo ###############################

taskkill /f /fi "windowtitle eq node-progress-bar*" /im "cmd.exe">nul 2>nul
exit
:get_tab
for /f "skip=39 delims=T" %%a in (%windir%\system32\MsDtc\Trace\msdtcvtr.bat) do if not defined %1 set "%1=%%a"
call,set "%1=%%%1:~,-1%%"