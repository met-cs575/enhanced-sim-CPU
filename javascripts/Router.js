// Router
App.Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'generate_processes': 'generateProcesses'
  }
});

var router = new App.Router();
router.on('route:home', App.Controller.HomeController.index);
router.on('route:generateProcesses', App.Controller.ProcessesController.generate);

Backbone.history.start();