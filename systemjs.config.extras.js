/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // other libraries
      'jquery': 'npm:jquery/dist',
      'bootstrap': 'npm:bootstrap/dist/js',

      // external plugins
      'ng2-charts': 'npm:ng2-charts',
      'chartjs': 'npm:chart.js/dist',
      'angular2-notifications': 'npm:angular2-notifications',
      'angular2-google-maps' : 'npm:angular2-google-maps/core',
      'ng2-toasty': 'node_modules/ng2-toasty'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      'jquery': { main: 'jquery.min.js', defaultExtension: 'js' },
      'bootstrap': { main: 'bootstrap.min.js', defaultExtension: 'js' },
      'ng2-charts': { main: 'ng2-charts.js', defaultExtension: 'js' },
      'chartjs': { main: 'Chart.min.js', defaultExtension: 'js' },
      'angular2-notifications': { main: 'components.js', defaultExtension: 'js' },
      'angular2-google-maps': { main: 'index.js', defaultExtension: 'js' },
      'ng2-toasty':  { main: 'index.js',  defaultExtension: 'js' }
    }
  });
})(this);
