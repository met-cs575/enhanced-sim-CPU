App.Module.AlgorithmRR = function(processes, atTime) {
  
  //var quantum = 2;

  atTime = typeof atTime == 'undefined' ? 0 : atTime;

  // Make a clone of input processes so the original data won't be changed.
  var theseProcesses = processes.clone();
  // Sort collection by the arrive time.
  theseProcesses.comparator = 'arrive_at';
  theseProcesses.sort();

  var tasks = new App.Collection.Tasks();  
  var count = 0

  var queue = new App.Collection.Processes();
  var time = 0;
  var idleStart = 0;
  var idleEnd = 0;
  var idling = false;

  // Build the tasks
  while(theseProcesses.length > 0) {
    arrivals = theseProcesses.atTime(time);
    // If processes arrive at time x
    if (arrivals.length > 0) {
      // Add processes to ready queue.
      queue.add(arrivals.models);
      // Remove these processes from process list.
      theseProcesses.remove(arrivals);
    }

    // Add "idle" task.
    if(queue.length == 0) {
      if(!idling) {
        idleStart = time;
        idling = true;
      }
    } else {
      if(idling) {
        idleEnd = time;
        idling = false;
        var task = new App.Model.Task();
        task.set('type', 'idle');
        task.set('time', time);
        task.set('duration', idleEnd - idleStart);
        tasks.add(task);
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
     // add the task object to tasks collection.
      task.set('type', 'process');
      task.set('process', runningTask);
      task.set('time', time);
      tasks.add(task);
      // add burstime (duration) to the time.
      time += duration;
    }
    time += 0.1;
  }
  return tasks;

}