function MakeDayLoad(){
var exID = sessionStorage.getItem("clickedExID");
var day = sessionStorage.getItem("SelectedDay");
var aDate = new Day(day);
MakeDay();
}


// 1) Check if Exercises exists within date 2) checks if Exercises already has exercises added 3) if not, adds it 4) if does, alerts
function AddExercise(exID){
    var day = sessionStorage.getItem("SelectedDay");
    var dayParsed = fromJSON(day); //made an obj
    var newExercise = new Exercises(exID);
    var hasEx = false;

    //1st check if has prop exercises, THEN check if exercises arr matches id
    if(dayParsed.hasOwnProperty('Exercises')){
        for(var i = 0; i< dayParsed.Exercises.length; i++){
           if(dayParsed.Exercises[i].name == exID){hasEx=true; console.log("matched")} 
                    }
            }
    if(hasEx== false){
        dayParsed.Exercises.push(newExercise);
        var dayStringified = toJSON(dayParsed);
        localStorage.setItem(day, dayStringified);
        addEx(exID);
    }else{
        alert("Already added");
    }
   
}

function addSetStorage(ex, rep, kg){
    var day = sessionStorage.getItem("SelectedDay");
    var dayParsed = fromJSON(day); //made an obj
    var exID = ex;
    var reps = Number(rep);
    var weight = Number(kg);
    var JSONd;

    for(var i = 0; i< dayParsed.Exercises.length; i++){
       if(dayParsed.Exercises[i].name == exID){
           hasEx=true; console.log("matched");
           console.log(dayParsed.Exercises[i].sets);
           var aSet = new Set(reps, weight);
           dayParsed.Exercises[i].sets.push(aSet);
            // JSONd =JSON.stringify(dayParsed)
            // localStorage.setItem(day, JSONd);
            JSONd = toJSON(dayParsed);
            console.log(dayParsed);
            console.log(JSONd);
            localStorage.setItem(day, JSONd);
        }
            // else {console.log("no match")}
    }
}

function UpdateExercisesPage (){
    var day = sessionStorage.getItem("SelectedDay");
    var dayParsed = fromJSON(day); //made an obj
    MakeDay();

if(dayParsed.hasOwnProperty('Exercises')){
    for(var i = 0; i < dayParsed.Exercises.length; i++){
        var storedEx = dayParsed.Exercises[i].name;
        addEx(storedEx); //adds the visual button to matches ids
    }
  }
}

function updateSetPage(){  
    var day = sessionStorage.getItem("SelectedDay");
    var dayParsed = fromJSON(day); //made an obj
    var selEx = sessionStorage.getItem("clickedExID");//selectedEx
    var rep;
    var weight;
    var setNum = 0;
    var totalRep = 0;
    var setWeight = 0;
    var totalWeight = 0;

         for(var i = 0; i < dayParsed.Exercises.length; i++){
              if(dayParsed.Exercises[i].name == selEx){
                  //does if true   loops through sets array
                  for(var k = 0; k < dayParsed.Exercises[i].sets.length; k++){
                         //looping through sets of selected exercise
                            rep = dayParsed.Exercises[i].sets[k].rep;
                            weight = dayParsed.Exercises[i].sets[k].weight;
                            //html part
                           var nameData = "1 set of "+rep+" reps at "+weight+"KGs.";
                           var fullHTML = '<li id="rep'+rep+'weight'+weight+'"> <a href="#" class="ui-btn ui-btn-icon-right ui-icon-delete" onClick="deleteSet(this.parentNode.id)"><h2>' + nameData + '</h2></a> </li>';
                           $("#setList").append(fullHTML);  
                  }
             }
         }
}

function MakeDay(){  
    var day = sessionStorage.getItem("SelectedDay");

    if (localStorage.getItem(day) === null) {
        var newDay = new Day(day);
    newDayStringified= toJSON(newDay);
    localStorage.setItem(day, newDayStringified);
      }else{}
}

function toJSON(obj){ //turns obj into JSON string
    return JSON.stringify(obj);
}

function fromJSON(key){ //turns JSON to an obj
    var keyed = localStorage.getItem(key);
    return JSON.parse(keyed);
}

class Day {
    constructor(date){
        this.Date = date;
        this.Exercises = [];
        
    }
}

class Exercises {
    constructor(id){
        this.name = id;
        this.sets = [];
       
    }
}

class Set {
    constructor(rep, weight){
        this.rep = rep;
        this.weight = weight;
    }
}

function deleteEx(id){ 
var id = id;
var idBase = id.substr(0, id.length-2);//is a string

var btnID = idBase + "-B";
var day = sessionStorage.getItem("SelectedDay");
var dayParsed = fromJSON(day); //made an obj

    for(var i = 0; i < dayParsed.Exercises.length; i++){
        if(dayParsed.Exercises[i].name == idBase){
            dayParsed.Exercises.splice(i, 1); //removes exercise
             var removed = toJSON(dayParsed);
             localStorage.setItem(day, removed);

             var part = document.getElementById(btnID);
             part.parentNode.parentNode.removeChild(part.parentNode);
        }
    }
}

function deleteSet(id){
    var day = sessionStorage.getItem("SelectedDay");
    var ex = sessionStorage.getItem("clickedExID");
    var dayParsed = fromJSON(day); //made an obj
    var dayParsedRemoved;
    var id=id;
    var idrep1 = id.replace('rep', '');
    var idrep2 = idrep1.replace(/weight.*$/, '') 
    var idweight1 = id.replace(/.+?(?=weight)/, '')  
    var idweight2 = idweight1.replace('weight', '');
    var idDelete;
    
    for(var i = 0; i<dayParsed.Exercises.length; i++){ //find matching exercise
        if(dayParsed.Exercises[i].name == ex){
            //do it looping through the matched ex sets
            for(var k = 0; k<dayParsed.Exercises[i].sets.length; k++){
              if(dayParsed.Exercises[i].sets[k].rep == idrep2 && dayParsed.Exercises[i].sets[k].weight == idweight2){
                  //if match, delete it
                  //local storage remove element and then to json then to store it
                   dayParedRemoved = dayParsed.Exercises[i].sets.splice(k, 1);
                    console.log(dayParsed);
                    var dayParsedJSON = toJSON(dayParsed);
                    localStorage.setItem(day, dayParsedJSON);
                 
                idDelete = document.getElementById(id);
                idDelete.parentNode.removeChild(idDelete);
                break;
                }
            }
        }
    }
}

function selectedDate(){
//gets selected date
var $j = jQuery.noConflict();
var day = $j('#calendar').date("getDate"); 
//formating 
    var dd = String(day.getDate()).padStart(2, '0');
    var mm = String(day.getMonth() + 1).padStart(2, '0');
    var yyyy = day.getFullYear();
    day = mm + '/' + dd + '/' + yyyy;  
//session stores selected day
var selectedDay = sessionStorage.setItem("SelectedDay", day);
}
