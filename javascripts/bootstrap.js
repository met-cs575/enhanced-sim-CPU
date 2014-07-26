App.Global.tasks = new App.Collection.Tasks();
App.Global.howManyProcesses = 5;

var viewport = new App.View.Viewport();
var processList = new App.View.ProcessList();
//var simulator = new App.View.Simulator();


//var router = new App.Router();
Backbone.history.start();
//viewport.render();

processList.render();