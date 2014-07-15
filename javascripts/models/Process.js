// Model
App.Model.Process = Backbone.Model.extend({
  // urlRoot for AJAX requests.
  urlRoot: "/process", 
  initialize: function() {
    arrive_at = 0;
    burst_time = 0;
    period = 0;
    priority = 0;
    serial = 0;
    name = '';
    deadline = 0;

  }

});