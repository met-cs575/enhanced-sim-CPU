App.Module.AlgorithmSJF = function(processes, atTime) {
  //debugger;
  //var quantum = 2;

  atTime = typeof atTime == 'undefined' ? 0 : atTime;

  // Make a clone of input processes so the original data won't be changed.
  var theseProcesses = new App.Collection.Processes(processes.toJSON());
  // Sort collection by the arrive time.
  theseProcesses.comparator = 'arrive_at';
  theseProcesses.sort();

  var tasks = new App.Collection.Tasks();  
  var count = 0

  
  //var queue = new Array();
  var time = 0;
  var idleStart = 0;
  var idleEnd = 0;
  var idling = false;
  var arrivals = null;
  // Build the tasks
  while(theseProcesses.length > 0) {
    var queue = new App.Collection.Processes();
    arrivals = theseProcesses.atTime(time);
    //console.log(arrivals);
    // If processes arrive at time x
    if (arrivals.length > 0) {

      // Add processes to ready queue.
      //queue = queue.concat(arrivals);
      queue.add(arrivals);
      // Remove these processes from process list.
      theseProcesses.remove(arrivals);
    }

    // Add "idle" task.
    if(queue.length == 0) {
      if(!idling) {
        idleStart = time;
        idling = true;
      }
      time += 1;
    } else {
      
      if(idling) {
        idleEnd = time;
        idling = false;
        var task = new App.Model.Task();
        task.set('type', 'idle');
        task.set('time', time);
        task.set('duration', idleEnd - idleStart);
        task.set('process_serial', 'null');
        tasks.add(task);
        //debugger;
      }
    }
    
    // This while loop processes ready queue.
    while(queue.length > 0) {
      // Find the process with the most less burst time
      queue.comparator = 'burst_time';
      queue.sort();
      // make a task from the process above.
      var runningTask = queue.shift();
      var task = new App.Model.Task();
      var duration = runningTask.get('burst_time');
      //debugger;
     // add the task object to tasks collection.
      task.set('type', 'process');
      task.set('process', runningTask);
      task.set('time', time);
      task.set('duration', duration);
      task.set('process_serial', runningTask.get('serial'));
      tasks.add(task);
      // add burstime (duration) to the time.
      time += duration;
    }

    
  }
  return tasks;

}