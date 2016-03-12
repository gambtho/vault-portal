module.exports = function(config){
    config.set({

        basePath : '../',

        files : [
            'dist/polyfills.bundle.js',
            'dist/vendor.bundle.js',
            'dist/app.bundle.js'
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