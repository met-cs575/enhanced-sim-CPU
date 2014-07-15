App.View.Viewport = Backbone.View.extend({
  initialize: function() {
    // console.log("viewport initialized");
    $(".how-many-processes").val(5);
    App.Global.howManyProcesses = $(".how-many-processes").val();
    //App.Global.howManyProcesses = parseInt($(".how-many-processes").text(), 10);
  },
  el: 'div.container',
  render: function(){
    // Main view port dose not need to render
  },
  events: {
    // Bind event here
    'click a.generate-processes': 'generateProcesses',
    'change input.how-many-processes': 'setHowManyProcesses',
    'submit form.set-how-many-processes': 'generateProcesses'
  },
  setHowManyProcesses: function(ev) {
    self = ev.currentTarget;
    App.Global.howManyProcesses = parseInt(self.value, 10);
  },
  generateProcesses: function(ev) {
    // Note: this dose not refer to the event target.
    // This refer to Backbone view object it self.
    if(ev != null) {
      self = ev.currentTarget;
    }
    App.Global.processes.reset();
    var models = new Array();
    for(var i = 0; i < App.Global.howManyProcesses; i++) {
      processData = {
        serial: i,
        name: "Awesome process",
        arrive_at: Math.floor((Math.random() * 20) + 1),
        burst_time: Math.floor((Math.random() * 30) + 1),
        deadline: Math.floor((Math.random() * 40) + 1)
      }
      process = new App.Model.Process(processData);
      models.push(process);
    }
    App.Global.processes.add(models);
    //process.save(processData);
    //console.log("processes generated");
    // console.log(processes);
    return false;
  }
});
var viewport = new App.View.Viewport();