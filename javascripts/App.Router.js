// Router
App.Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'generate_processes': 'generateProcesses'
  }
});

var router = new App.Router();
router.on('route:home', function(){
  //viewport.render();
  // processList.render();
});
router.on('route:generateProcesses', function(){
  // processList.render();
});

Backbone.history.start();