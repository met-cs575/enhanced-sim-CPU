App.View.Simulator = Backbone.View.extend({
  el: '.simulator',
  collection: App.Global.tasks,
  initialize: function() {
    // this.listenTo(this.collection, 'add', this.addProcess);
  },
  render: function(){
    var tasks = App.Controller.FifoCPUController.run(App.Global.processes);
    var self = this;
    // console.log(App.Global.tasks);
    //var tasks = App.Global.tasks;
    for(var i = 0; i < tasks.length; i++) {
      //var thisTask = new App.Model.Task(tasks.at(i));
      var thisTask = tasks.at(i);
      var template = _.template($('#task-template').html(), {task: thisTask});

      // $(template).addClass('task-process');
      
      //console.log(template);
      self.$el.append(template);
    }
  }
});
var simulator = new App.View.Simulator();
