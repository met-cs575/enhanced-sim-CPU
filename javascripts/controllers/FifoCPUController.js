App.Controller.FifoCPUController = {
  run: function(processes, timeframe) {
    timeframe = typeof timeframe == 'undefined' ? 0 : timeframe;

    // Make a clone of input processes so the original data won't be changed.
    var theseProcesses = processes.clone();
    // Sort collection by the arrive time.
    theseProcesses.comparator = 'arrive_at';
    theseProcesses.sort();
    var busy = false;
    var timeline = new App.Collection.Timeline();
    for(var i = 0; i <= timeframe; i++) {
      var tf = new App.Model.Timeframe;
      tf.id = i;
      tf.set('time', i);
      var arrivals = tf.get('arrivals') || new Array();
      
      //while(theseProcesses.length > 0 && i == theseProcesses.at(0).get('arrive_at')) {
      for(var j = 0; j < theseProcesses.length; j++) {
        if(theseProcesses.at(0).get('arrive_at') == i) {
          p = theseProcesses.get(j);
          arrivals.push(p);
          if(!busy) {
            tf.set('process', p);    
            busy = true;
          }
        }
      }
      if(busy) {
        
      }
      tf.set('arrivals', arrivals)
      timeline.add(tf);
    }
    
    return timeline;
    

    //while(processes.length > 0) {
      // Draw:
      //console.log(processes.length);

    //}
  }
}