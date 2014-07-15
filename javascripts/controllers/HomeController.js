App.Controller.HomeController = {

  index: function(){
    viewport.generateProcesses(null);
    var fifoCPU = new App.Model.FifoCPU();
    var timeframe = 30;
    var timeline = App.Controller.FifoCPUController.run(App.Global.processes, timeframe);

    var output = '';
    var currentTask = null;
    
    console.log(timeline.at(0));

    for(var i = 0; i < timeline.length; i++) {
      var tf = timeline.get(i);
      //console.log("typeof:" + typeof tf);
      output += 'At timeframe: ' + tf.get('time');
     // console.log(output);
      //continue;
      //console.log(tf.toJSON());
      var ps = tf.get('process');
      if(ps) {
        output += ' working on #p' + ps.get('serial');
      }
      //if(ps.get('arrive_at') == i) {
      currentTask = ps;
        
      //}
        if(currentTask) {
          
          output += ' working on process: ' + currentTask.get('serial') + ' with burst time: ' + currentTask.get('burst_time');
          currentTask.set('burst_time', currentTask.get('burst_time') - 1);
          //if(currentTask.get('burst_time') == 0) {
            currentTask = null;
          //}
        }

      
      //$('div.result').append(' Burst time: ' + ps[i].get('burst_time') + '<br>' );
      output += "<br>";
    }

    $('div.result').append(output);
    // processList.render();
  }

};

