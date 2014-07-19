// Router
App.Router = Backbone.Router.extend({
  routes: {
    '': App.Controller.HomeController.index(),
    'generate_processes': 'generateProcesses'
  }
});

var router = new App.Router();
//router.on('route:home', App.Controller.HomeController.index);
//router.on('route:generateProcesses', App.Controller.ProcessesController.generate);
