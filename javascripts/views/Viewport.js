App.View.Viewport = Backbone.View.extend({
  initialize: function() {
     //console.log("viewport initialized");
    //$(".how-many-processes").val(5);
    //$(".how-many-processes").val();
    App.Global.howManyProcesses = parseInt($(".how-many-processes").val(), 10);
  },
  el: 'div.container',
  render: function(){
    // Main view port dose not need to render
  },
  events: {
    // Bind event here
    'click .start-simulation': 'startSimulation',
    'click .pause-simulation': 'pauseSimulation',
    'change input.how-many-processes': 'setHowManyProcesses'
  },
  running: false,
  pauseSimulation: function(ev) {
    if(this.running) {
      simulatorFIFO.pause();
      simulatorRR.pause();
      simulatorSJF.pause();
      this.running = false;
      $('.pause-simulation').text('Resume');
    } else {
      simulatorFIFO.start();
      simulatorRR.start();
      simulatorSJF.start();
      this.running = true;
      $('.pause-simulation').text('Pause');
      
    }
  },

  startSimulation: function(ev) {
    App.Controller.HomeController.start();
    $('.pause-simulation').removeAttr('disabled');
    this.running = true;
  },
  setHowManyProcesses: function(ev) {
    self = ev.currentTarget;
    App.Global.howManyProcesses = parseInt(self.value, 10);
  }
});
