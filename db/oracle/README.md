#start
npm install

npm index 

http://localhost:3000/oracle


# oracledb

1. 下载解压需要安装包(2个)
	下载页面：
	> http://www.oracle.com/technetwork/topics/winx64soft-089540.html
	
	下载名称：	
	> instantclient-basiclite-windows.x64-12.1.0.2.0.zip	
	> instantclient-sdk-windows.x64-12.1.0.2.0.zip	
	
	把两个文件解压到“C:\oracle\instantclient_12_1”文件目录不同，不会相互覆盖。

2. 添加环境变量
	> OCI_INC_DIR=C:\oracle\instantclient_12_1\sdk\include
	> OCI_LIB_DIR=C:\oracle\instantclient_12_1\sdk\lib\msvc
	
	注意！如果本机安装oracle服务器端，请把次环境变量如下地址：

	>OCI_INC_DIR = C:\app\Administrator\product\11.2.0\client_1\oci\include
	>OCI_LIB_DIR = C:\app\Administrator\product\11.2.0\client_1\oci\lib\msvc
	
3. npm执行安装命令
	>npm install oracledb

#参考文档

``https://github.com/oracle/node-oracledb

``https://github.com/featurist/sworm

``https://www.cnblogs.com/stone_w/p/4794747.html