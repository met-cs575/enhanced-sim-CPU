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
    'change input.how-many-processes': 'setHowManyProcesses'
  },

  startSimulation: function(ev) {
    App.Controller.HomeController.start();
  },
  setHowManyProcesses: function(ev) {
    self = ev.currentTarget;
    App.Global.howManyProcesses = parseInt(self.value, 10);
  }
});
