module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/components/**/*.js',
      'app/authentication/**/*.js',
      'app/view*/**/*.js'
    ],

    autoWatch : true,
    
    frameworks: ['jasmine', 'sinon'],

    browsers : ['Chrome'],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
