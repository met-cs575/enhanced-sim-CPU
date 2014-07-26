App.Module.AlgorithmRR = function(processes, atTime) {
  // RR quantum
  var quantum = 2;

  atTime = typeof atTime == 'undefined' ? 0 : atTime;

  // Make a clone of input processes so the original data won't be changed.
  var theseProcesses = processes.clone();
  // Sort collection by the arrive time.
  theseProcesses.comparator = 'arrive_at';
  theseProcesses.sort();

  var tasks = new App.Collection.Tasks();  
  var count = 0

  var queue = new Array();
  var time = 0.0;
  var idleStart = 0;
  var idleEnd = 0;
  var idling = false;

  // Build the tasks
  while(theseProcesses.length > 0) {
    arrivals = theseProcesses.atTime(time);
    // If processes arrive at time x
    if (arrivals.length > 0) {
      // Add processes to ready queue.
      queue = queue.concat(arrivals);
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
      
    }
    time += 0.1;

  }
  return tasks;

}