App.Controller.HomeController = {

  index: function(){
    viewport.generateProcesses(null);
    var fifoCPU = new App.Model.FifoCPU();
    var timeframe = 30;
    var tasks = App.Controller.FifoCPUController.run(App.Global.processes, timeframe);

    var output = '';
    var currentTask = null;
    //console.log(timeline.at(0));

    for(var i = 0; i < tasks.length; i++) {
      var task = tasks.at(i);
      //console.log("typeof:" + typeof tf);
      output += 'At timeframe: ' + task.get('time');
      var ps = task.get('process');
      if(ps) {
        output += ' working on #p' + ps.get('serial');
        output += ' burst for ' + task.get('duration');
      }
      //if(ps.get('arrive_at') == i) {
      
      //$('div.result').append(' Burst time: ' + ps[i].get('burst_time') + '<br>' );
      output += "<br>";
    }

    $('div.result').append(output);
    // processList.render();
  }

};

