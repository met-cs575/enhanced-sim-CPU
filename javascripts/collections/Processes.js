// Colleciton
App.Collection.Processes = Backbone.Collection.extend({
  model: App.Model.Process,
  //comparator: 'arrive_at'
});
App.Global.processes = new App.Collection.Processes();
App.Global.howManyProcesses = 0;