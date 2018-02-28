({
    baseUrl: '../src', //源代码根目录(*)
    dir: '../built',      //编译后存放目录
    modules: [
        {
            name: 'js/main', //入口文件(require.js引用) (*)
            exclude: []
        }
    ],
    optimize: "uglify",
	uglify: {
        mangle: false  //是否混淆代码
    },
    fileExclusionRegExp: '/^(r|build)\.js|.*\.scss$/', 
    optimizeCss: 'standard',
    removeCombined: true,   //是否从输出目录中删除已合并的文件
	findNestedDependencies: true //是否递归查找依赖
})