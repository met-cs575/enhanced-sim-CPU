App.View.Simulator = Backbone.View.extend({
  el: '',
  events: {
    // Bind event here
    'mousemove div.simulator .task': 'moveCursor'
    //'change input.how-many-processes': 'setHowManyProcesses',
    //'submit form.set-how-many-processes': App.Module.generateProcesses(10)
  },
  moveCursor: function(ev) {
    $('tr.data-row').removeClass('current-task');
    ev.stopPropagation();
    var self = ev.currentTarget;
    //console.log(self);
    var taskSerial = $(self).data('task-serial');
    var tgt = $('.task-serial-' + taskSerial).parents('tr');
    tgt.addClass('current-task');
    return false;
  },
  initialize: function() {
    // this.listenTo(this.collection, 'add', this.addProcess);
  },
  runAlgorithm: function() {
    return tasks = App.Module.AlgorithmFIFO(App.Global.processes);
  },
  render: function(){
    this.$el.find('.simulator').eq(0).html('');
    var resTasks = this.runAlgorithm();
    var template = _.template($('#task-template').html(), {tasks: resTasks} );
    this.$el.find('.simulator').eq(0).append(template);
    this.start();
  },
  doAnimation: function(tgt) {
    clearInterval(this.timer);
    var self = this;
    var lastTask = self.$el.find('.simulator .task:last');
    //console.log(lastTask.outerWidth());
    var rightBorder = lastTask.position().left + lastTask.outerWidth();
    //self.$el.find('.simulator').css('width', rightBorder);
    self.$el.find('.simulator').css('width', 65535);
    //tgt.css({'width': rightBorder});
    tgt.css({'width': rightBorder});
    
    this.timer = setInterval(function(){
      var left = parseInt(tgt.css('left'), 10)
      left += 10;
      //console.log(left);
      tgt.css({'width': '-=10', 'left': left + 'px'});
      if(left >= rightBorder) {
        clearInterval(self.timer);
      }
    }, 100);
  },
  start: function() {
    this.doAnimation(this.$el.find('.simulator .mask'));
  },
  pause: function() {
    clearInterval(this.timer);
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
