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
      'ng2-charts': 'node_modules/ng2-charts',
      'chartjs': 'node_modules/chart.js/dist'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      'jquery': { main: 'jquery.min.js', defaultExtension: 'js' },
      'bootstrap': { main: 'bootstrap.min.js', defaultExtension: 'js' },
      'ng2-charts': { main: 'ng2-charts.js', defaultExtension: 'js' },
      'chartjs': { main: 'Chart.min.js', defaultExtension: 'js' },
    }
  });
})(this);
