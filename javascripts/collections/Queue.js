// Colleciton
App.Collection.Queue = Backbone.Collection.extend({
  model: App.Model.Process,
  //comparator: 'arrive_at'
});
App.Global.queue = new App.Collection.Queue();