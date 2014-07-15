// Model
App.Model.CPU = Backbone.Model.extend({
  // urlRoot for AJAX requests.
  urlRoot: "/cpu",
  run: function(processes) {},
  initialize: function() {
    algorithm = '';
  }
});

App.Model.FifoCPU = App.Model.CPU.extend({
  initialize: function(){
    algorithm = 'FIFO';
  },

  /*
   * Parameters:
   * App.Collections.Processes processes
   *   The input processes
   * int timeframe
   *   How many timeframe to be simulated.
   * Return:
   * App.Collections.Timeline
   */
  

});