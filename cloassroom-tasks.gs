// Aggiungi tasks per ogni argomento del corso
function listTopics(courseid,taskListId) {
  var optionalArgs = {
    showCompleted : true,
    showHidden : true
  };
  var response = Classroom.Courses.Topics.list(courseid);
  var argomenti = response.topic;
  var tasks_da_scaricare = Tasks.Tasks.list(taskListId, optionalArgs);
  var task_presenti = tasks_da_scaricare.items;
  if (argomenti && argomenti.length > 0) {
    Logger.log('Numero argomenti %d', argomenti.length);
    for (i = 0; i < argomenti.length; i++) {
      var argomento = argomenti[i];
      if(task_presenti){
        var trovato = 0;
        for(j=0; j<task_presenti.length && !trovato; j++){
          if(task_presenti[j].title == argomento.name){
            trovato = 1;
          }
        }
        if(trovato == 0){
          var task = {
            title: argomento.name,
          };
          task = Tasks.Tasks.insert(task, taskListId);
        }  
      }else{
        var task = {
          title: argomento.name,
          
        };
        task = Tasks.Tasks.insert(task, taskListId);
      }
    }
  } else {
    Logger.log('Nessun argomento trovato');
  }
}

// Aggiungi tasks per ogni compito assegnato del corso (con data di scadenza)
function listCoursework(courseid,taskListId) {
  var optionalArgs = {
    showCompleted : true,
    showHidden : true
  };
  var response = Classroom.Courses.CourseWork.list(courseid);
  var compiti = response.courseWork;
  var tasks_da_scaricare = Tasks.Tasks.list(taskListId, optionalArgs);
  var task_presenti = tasks_da_scaricare.items;
  if (compiti && compiti.length > 0) {
    Logger.log('Numero compiti %d', compiti.length);
    for (i = 0; i < compiti.length; i++) {
      var compito = compiti[i];
      if(compito.dueDate){
        var scadenza = new Date();
        scadenza.setDate(compito.dueDate.day);
        scadenza.setMonth(compito.dueDate.month-1);
        scadenza.setFullYear(compito.dueDate.year);
        if(compito.dueTime.hours){
          scadenza.setHours(compito.dueTime.hours);
        }
        if(compito.dueTime.minutes){
          scadenza.setMinutes(compito.dueTime.minutes);
        }
        scadenza.setSeconds(0);
        scadenza.setMilliseconds(0);
      }
      if(task_presenti){
        var trovato = 0;
        for(j=0; j<task_presenti.length && !trovato; j++){
          if(task_presenti[j].title == compito.title){
            trovato = 1;
          }
        }
        if(trovato == 0){
          if(compito.dueDate){
          var task = {
            title: compito.title,
            notes : "Compito da svolgere",
            due: Utilities.formatDate(scadenza, "GMT", "yyyy-MM-dd'T'HH:mm:ss'Z'")
          };
          task = Tasks.Tasks.insert(task, taskListId);
          }else{
            var task = {
              title: compito.title,
              notes : "Compito da svolgere"
            };
            task = Tasks.Tasks.insert(task, taskListId);
          }
        }  
      }else{
        if(compito.dueDate){
          var task = {
            title: compito.title,
            notes : "Compito da svolgere",
            due: Utilities.formatDate(scadenza, "GMT", "yyyy-MM-dd'T'HH:mm:ss'Z'")
          };
          task = Tasks.Tasks.insert(task, taskListId);
          }else{
            var task = {
              title: compito.title,
              notes : "Compito da svolgere"
            };
            task = Tasks.Tasks.insert(task, taskListId);
          }
      }
    }
  } else {
    Logger.log('Nessun compito trovato');
  }
}

//Crea una lista su google task per ogni corso di classroom e inserisce gli argomenti e i compiti
function aggiornatutto(){
  var response = Classroom.Courses.list();
  var courses = response.courses;
  if (courses) {
    for (var i = 0; i < courses.length; i++) {
      var corso = courses[i];
      var taskLists = Tasks.Tasklists.list();
      if(taskLists.items && taskLists.items.length > 0){
        var trovato = 0;
        var tasklistid;
        for(var j = 0; j < taskLists.items.length && !trovato; j++){
         var taskList = taskLists.items[j];
         if(taskList.title == corso.name){
           trovato = 1;
           tasklistid = taskList.id;
         }
        }
        if(trovato){
          listTopics(corso.id, tasklistid);
          listCoursework(corso.id, tasklistid);
         }else{
          var dati_lista = {
            title : corso.name
          }
          var lista = Tasks.Tasklists.insert(dati_lista)
          listTopics(corso.id, lista.id);
          listCoursework(corso.id, lista.id);
         }
      }else{
        var dati_lista = {
           title : corso.name
        }
        var lista = Tasks.Tasklists.insert(dati_lista)
        listTopics(corso.id, lista.id);
        listCoursework(corso.id, lista.id);
      }
    }
  }
}