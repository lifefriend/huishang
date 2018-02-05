#VSCode 搭建TypeScript开发环境

##安装typescripts

npm install -g typescript

##创建tsconfig.json 文件

  3.1 tsc --init

  3.2 tsconfig.json 片段
  {
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "noImplicitAny": false,
        "sourceMap": false
    }
  }

  3.3 因为写node.js你可以修改tagget为es6, 要调试把 sourceMap改为true, 添加allowjs为true,就可以ts和js混合玩了.
  {
      "compilerOptions": {
          "module": "commonjs",
          "target": "es5",
          "noImplicitAny": false,
          "sourceMap": true,
          "allowJs": true
        }
  }

##安装 .d.ts 文件

npm install @types/node --dev-save

##编译文件

1.配置typescript 的task 编译文件

1.1 使用快捷键 command ＋ shift + b

1.2  点击“配置任务运行程序”

1.3 点击“TypeScript - tsconfig.json 创建TypeScript 项目” ，生成文件tasks.json 文件

##创建 .ts 文件并编译成 .js 文件

1.创建app.ts 文件
2.使用command ＋ shift ＋ b 编译出app.js


#用TypeScript开发爬虫程序
参考文档：http://developer.51cto.com/art/201611/520375.htm
