@cd %~dp0
@chcp 65001
@echo on
@echo **************************************************
@echo 请以管理员身份运行
@echo 如果出现乱码请修改cmd的字体
@echo cmd->属性->font 或者运行 font.reg自动更改字体为宋体
@echo 默认是 raster font（点阵字体）
@echo **************************************************
@echo 正在清除打包结果...
node checkfolder.js
@echo 正在构建打包配置文件...
node prebuild.js
@echo 正在检查文件是否存在，文件是否重复引用...
node checkfile.js
@echo 打包进行中...
node r.js -o build.js
@echo 清理打包中间文件...
node afetrbuild.js
@echo ###############################
@echo 完成(success)...
@echo ###############################
@pause