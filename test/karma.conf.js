module.exports = function(config){
    config.set({

        basePath : '../',

        files : [
            'dist/bundle.js',
            'dist/vendor.bundle.js'
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