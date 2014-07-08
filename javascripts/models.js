var CPU = Backbone.Model.extend({
  
  initialize: function() {
    this.algorithm = "fifo";
  }

});

var Algorithm = Backbone.Model.extend({
  initialize: function() {
    this.name = "";
  },
  run: function(){

  }
  
});

var Process = Backbone.Model.extend({
  initialize: function() {
    arriveTime = 0;
    burstTime = 0;
    period = 0;
    priority = 0;
  }

});
