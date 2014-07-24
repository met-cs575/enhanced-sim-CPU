App.Module.AlgorithmRR = function(processes, atTime) {
  // RR quantum
  var quantum = 2;

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
  
  var count = 0

  var queue = new Array();
  var time = 0.0;
  var output = "";
  while(theseProcesses.length > 0) {
    arrivals = theseProcesses.atTime(time);
    if (arrivals.length > 0) {
      var howMany = arrivals.length;
      queue = queue.concat(arrivals);
      theseProcesses.remove(arrivals);
      output += "At time: " + time;
      output += ", " + howMany + " processes have arrived.\n";

    }
    // If ready queue is not empty and CPU is not busy
    if(queue.length > 0 && !busy) {
      idleEnd = time;
      idleStart = -1;
      taskStart = time;
      taskEnd = taskStart + quantum;
      busy = true;
      output += "Idle ends at " + idleEnd + "\n";
    } else {
      
      idleStart = time;
      busy = false;
      output += "Idle starts at " + idleStart + "\n";
    }
    time += 0.1;

    //console.log(queue);
    //break;
    //if
  }
  console.log(output);
  console.log( queue);


  for(var i = 0; i < theseProcesses.length; ) {
    var task = new App.Model.Task();
    var p = theseProcesses.at(i);
    var arrive_at = p.get('arrive_at');

    var duration = 0;
    var type = '';
    var start_at = 0;

    if(arrive_at > time) { // means idle
      duration = p.get('arrive_at') - time;
      type = 'idle';
      p = null;
    } else { // means busy
      //arrive_at = time;
      duration = p.get('burst_time');
      if(duration > quantum) { //RR
        duration = quantum; 
        // var newProcess = p.clone();
        // newProcess.set('burst_time', burst_time - quantum);
      }
      type = 'process';
      i++;
    }

    //console.log("i:" + i + ", arr: " + arrive_at + ", time: " + time + ", duration: " + duration);
    time += duration;
    
    
    task.id = count;
    task.set('type', type);
    task.set('process', p);
    task.set('duration', duration);
    task.set('time', time);
    tasks.add(task);
    
    count++;
  }
  return tasks;
}