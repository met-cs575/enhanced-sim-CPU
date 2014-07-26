App.View.Simulator = Backbone.View.extend({
  el: '',
  events: {
    // Bind event here
    'mousemove div.simulator:first': 'moveCursor'
    //'change input.how-many-processes': 'setHowManyProcesses',
    //'submit form.set-how-many-processes': App.Module.generateProcesses(10)
  },
  moveCursor: function(ev) {

    ev.stopPropagation();
    var tgt = ev.currentTarget;
    //console.log(tgt);
    var x = (ev.pageX - $(tgt).offset().left);
    var cursor = this.$el.find('.niddle').eq(0);
    cursor.css('left', x);
    var atTime = x;
    
    return false;
  },
  initialize: function() {
    // this.listenTo(this.collection, 'add', this.addProcess);
  },
  runAlgorithm: function() {
    return tasks = App.Module.AlgorithmFIFO(App.Global.processes);
  },
  render: function(){
    var resTasks = this.runAlgorithm();
    var template = _.template($('#task-template').html(), {tasks: resTasks} );
    this.$el.find('.simulator').eq(0).append(template);
  }
});




App.View.SimulatorFIFO = App.View.Simulator.extend({
  el: '#fifo-simulator',
  runAlgorithm: function() {
    return App.Module.AlgorithmFIFO(App.Global.processes);
  }
});
var simulatorFIFO = new App.View.SimulatorFIFO();


App.View.SimulatorRR = App.View.Simulator.extend({
  el: '#rr-simulator',
  runAlgorithm: function() {
    return App.Module.AlgorithmRR(App.Global.processes);
  }
});
var simulatorRR = new App.View.SimulatorRR();



App.View.SimulatorSJF = App.View.Simulator.extend({
  el: '#sjf-simulator',
  runAlgorithm: function() {
    return App.Module.AlgorithmSJF(App.Global.processes);
  }
});
var simulatorSJF = new App.View.SimulatorSJF();
