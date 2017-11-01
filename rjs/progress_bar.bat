@echo off&setlocal enabledelayedexpansion
if defined flag goto next
title 进度条
mode con cols=60 lines=10
call :get_tab tab
for /l %%a in (1,1,22) do set "t=!t!"
echo,&echo,&echo,
echo %tab%┌────────────────────┐
echo %tab%│                                        │ 
echo %tab%└────────────────────┘
echo %tab%%t%&set /p=%tab%│<nul
set "flag=a"
start /b %~fs0
:lp
for /l %%a in (1,1,20) do (
   set /p=■<nul
   for /l %%a in (1,1,500) do echo>nul
)

::多行回退技术(1,1,40)
for /l %%a in (1,1,40) do (
    set /p= <nul
    for /l %%a in (1,1,500) do echo>nul
)
::多行回退技术(1,1,40)

goto lp    
:next

::::::这里改成你的代码::::::
for /l %%a in (1,1,100000) do echo>nul
::::::这里改成你的代码::::::

taskkill /f /fi "windowtitle eq 进度条*" /im "cmd.exe">nul 2>nul
exit
:get_tab
for /f "skip=39 delims=T" %%a in (%windir%\system32\MsDtc\Trace\msdtcvtr.bat) do if not defined %1 set "%1=%%a"
call,set "%1=%%%1:~,-1%%"