App.Module.AlgorithmRR = function(processes, atTime) {
  // RR quantum
  var quantum = 2;

  atTime = typeof atTime == 'undefined' ? 0 : atTime;

  // Make a clone of input processes so the original data won't be changed.
  var theseProcesses = new App.Collection.Processes(processes.toJSON());
  //theseProcesses processes.clone();
  // Sort collection by the arrive time.
  theseProcesses.comparator = 'arrive_at';
  theseProcesses.sort();

  var tasks = new App.Collection.Tasks();  
  var count = 0

  var queue = new Array();
  // var time = 0.0;
  var time = 0;
  var idleStart = 0;
  var idleEnd = 0;
  var idling = false;
  var arrivals = null;
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
      time += 1;
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
      var runningTask = queue.shift();
      var task = new App.Model.Task();
      var burstTime = runningTask.get('burst_time');
      var remainingBurst = burstTime - quantum;
      
      if(remainingBurst < 0) {
        task.set('duration', burstTime);
      } else {
        task.set('duration', quantum)
        
        if(remainingBurst > 0) {
          queue.push(runningTask);
        }
      }

      runningTask.set('burst_time', remainingBurst);
      task.set('type', 'process');
      task.set('process', runningTask);
      task.set('time', time);
      task.set('process_serial', runningTask.get('serial'));
      tasks.add(task);
      time += quantum;
    }
    

  }
  return tasks;

}