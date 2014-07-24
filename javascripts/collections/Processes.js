// Colleciton
App.Collection.Processes = Backbone.Collection.extend({
  model: App.Model.Process,
  atTime: function (time) {

    var models = this.select(function (model) {

        return model.get('arrive_at') <= time;

    });

    return models;

  }
  //comparator: 'arrive_at'
});
App.Global.processes = new App.Collection.Processes();
App.Global.howManyProcesses = 0;