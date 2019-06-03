function populateExerciseList(){
//array of exercises
    var exArray = [ //Dumbbells
        "DumbbellPress", "DumbbellFly", "StandingDumbbellCurl", "ConcentrationCurl","Incline Hammer Curl", "Side Laterals to Front Raise", "DumbbellRomainianDeadlift", "StandingDumbbellPress", 
    "DumbbellFloorPress", "SpellCaster", "DumbbellVsitCrossJab", "Dumbbell Bench Press", "PowerPartials","Hammer Curls", "ZottmanCurl", "SeatedDumbbellPress", "DumbbellRow","DumbbellShoulderPress", 
    "DumbbellGobletSquat","DumbbellLunges",
         //machine
     "SingleLegPress","SmithMachineShrug", "SmithMachineCalfRaise", "ThighAdductor", "MachineBicepCurl","StandingCalfRaise", "LyingLegCurl", "SmithMachineOverheadShoulderPress", "SeatedRow", "LatPulldown", 
     "LegPress", "HackSquat", "LegExtensions","MachineChestPress", "AbCrunchMachine", "InclineSitup","SeatedLegCurl",
];
    var exerciseSearchList;
    var fullHTMLtest = '<li class="ui-screen-hidden"><a href="#" rel="external" id="DumbbellPress" onclick="storeDat(this.id);AddExercise(this.id);">Dumbbell Press</a></li>';
    var fullHTML;

    for(var i = 0; i< exArray.length; i++){
        console.log(exArray[i]);
        var id = exArray[i];
        var spacedName = id.replace(/([A-Z])/g, ' $1').trim()
        console.log(spacedName);
        var fullHTML = '<li class="ui-screen-hidden"><a href="#" rel="external" id="' + id + '"onclick="storeDat(this.id);AddExercise(this.id);">'+spacedName+'</a></li>';
        $("#exerciseSearchList").append(fullHTML);
    }
}

function selectExercise(text){
    $("#exerciseChosen").text(text);
    $("#autocomplete-input").get(0).reset();
}

function storeDat(clickedID) {
    var clickedIDname = clickedID;
    sessionStorage.setItem("clickedExID", clickedIDname);
    console.log(clickedIDname);
}

function updateAddEx() {
var name = sessionStorage.getItem("clickedExID");//SelectedEx
var nameSpaced = name.replace(/([A-Z])/g, ' $1').trim();
$('#addTitleP').html(nameSpaced);
}

//ADD EXERCISES
function addEx(nameID) {
    //Creates Button
    var nameData = nameID; 
    var uniqueID = nameData + "LI";
    var nameDataSpaced = nameData.replace(/([A-Z])/g, ' $1').trim();
    var fullHTML = '<li data-icon="delete" class="ui-li-has-alt ui-first-child ui-last-child"   > <a href="addExercises.html" rel="external" id="'+nameData+'" onclick="selectedEx(this.id)" class="ui-btn" ><h2>' + nameDataSpaced + '</h2></a>  <a href="#" id="'+nameData+'-B"onclick="deleteEx(this.id)" class="ui-btn ui-btn-icon-notext ui-icon-delete ui-btn-b"></a></li>'; //edited new one   -B is the added part to ID for button specific
    $("#exList").append(fullHTML);
}

function addSet() {
    var rep = $('#repNum').val();
    var kg = $('#kgNum').val();
    var repStr = toString(rep);
    var weight = toString(kg);
    var ex = sessionStorage.getItem("clickedExID");
    var nameData = "1 set of "+rep+" reps at "+kg+"KGs.";
    var fullHTML = '<li data-icon="delete" id="rep'+rep+'weight'+kg+'"> <a href="#" class="ui-btn ui-btn-icon-right ui-icon-delete" onClick="deleteSet(this.parentNode.id)"><h2>' + nameData + '</h2></a>  <a href="#"  ></a></li>';
    $("#setList").append(fullHTML);
    addSetStorage(ex, rep, kg);
}

function mainOL(){
    //gets today's date and sets format
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
   
    //datepicker (date in mobile
    var $j = jQuery.noConflict();
    $j('#calendar').date("setDate", today); 
    var selectedDay = sessionStorage.setItem("SelectedDay", today);
    document.getElementById("ui-datepicker-div").style.display = "none";
    MakeDayLoad();
}

function updateExTitle() {
    date = sessionStorage.getItem("SelectedDay");
    $("#addTitleEx").text(date + "   Exercises");
}

function selectedEx(clickedID){
    var selectExercise = sessionStorage.setItem("clickedExID", clickedID);
}