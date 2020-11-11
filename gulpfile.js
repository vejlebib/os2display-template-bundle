var gulp = require('gulp');
var sass = require('gulp-sass');

var templatesPath = 'Resources/public/templates';
var appsPath = 'Resources/public/apps/toolsModule';

var templates = {
  'screens': [
    'vejlebib-portrait-split'
  ],
  'slides': [
    'vejlebib-calendar-list'
  ]
};

var apps = [
  'vejlebib-exchange-tool'
];

/**
 * Process SCSS using libsass
 */
gulp.task('sass', function (done) {
  'use strict';

  for (var templateType in templates) {
    var arr = templates[templateType];

    arr.forEach(function (element) {
      var path = templatesPath + '/' + templateType + '/' + element + '/';

      gulp.src(path + element + '.scss')
      .pipe(sass({
        outputStyle: 'compressed',
        includePaths: [
          'Resources/sass/compass-mixins/lib'
        ]
      }).on('error', sass.logError))
      .pipe(gulp.dest(path));
    });
  }

  apps.forEach(function (app) {
    gulp.src(appsPath + '/' + app + '.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [
        'Resources/sass/compass-mixins/lib'
      ]
    }).on('error', sass.logError))
    .pipe(gulp.dest(appsPath));
  });

  done();
});
