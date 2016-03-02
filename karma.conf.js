module.exports = function(config){
    config.set({

        basePath : './',

        files : [
            'node_modules/angular/angular.js',
            'node_modules/angular-route/angular-route.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'app/auth/**/*.js',
            'app/store/**/*.js'
        ],

        autoWatch : true,

        frameworks: ['jasmine', 'sinon'],

        browsers : ['PhantomJS'],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
