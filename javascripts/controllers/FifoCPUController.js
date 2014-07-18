App.Controller.FifoCPUController = {
  run: function(processes, atTime) {
    atTime = typeof atTime == 'undefined' ? 0 : atTime;

    // Make a clone of input processes so the original data won't be changed.
    var theseProcesses = processes.clone();
    // Sort collection by the arrive time.
    theseProcesses.comparator = 'arrive_at';
    theseProcesses.sort();

    var busy = false;
    // var timeline = new App.Collection.Timeline();
    var tasks = new App.Collection.Tasks();
    // Build the tasks
    var time = 0;
    for(var i = 0; i < theseProcesses.length; i++) {
      if(time < theseProcesses.at(i).get('arrive_at')) {
        time = theseProcesses.at(i).get('arrive_at');
      }
      var task = new App.Model.Task();
      var p = theseProcesses.at(i);
      task.set('process', p);
      task.set('duration', p.get('burst_time'));
      task.set('time', time);
      time += p.get('burst_time');
      tasks.add(task);
    }
    return tasks;
  }
}