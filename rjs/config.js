({
    baseUrl: '../webgis',
    dir: '../built',
    modules: [
        {
            name: 'scripts/require_config',
            exclude: []
        }
    ],
    optimize: "uglify",
	uglify: {
        mangle: false 
    },
    fileExclusionRegExp: '/^(r|build)\.js|.*\.scss$/', 
    optimizeCss: 'standard',
    removeCombined: true,
	findNestedDependencies: true
})