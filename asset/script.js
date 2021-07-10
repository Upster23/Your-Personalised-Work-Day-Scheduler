const timeContainer = document.getElementById("time-container");
const currentDay = document.getElementById("current-day");

currentDay.textContent = moment().format("dddd, Do MMM YY");

const currentHour = moment().format('H');

function saveNote(event) {

    event.preventDefault();

    // grab the time
    const button = event.target;
    const buttonId = button.id;
    buttonIdLength = (buttonId.length);
  
    if (buttonIdLength===11) {    
        time = buttonId.slice(-4);        
    }else {
        time = buttonId.slice(-3)
    }
 
    // grab user input
    const textarea = document.getElementById('textarea-' + time);

    const userInput = textarea.value;
    
    // store in Local storage

    // check if local storage already has the data
    const noteData = getNoteData();

    // if yes , update
    noteData[time] = userInput;

    console.log(noteData);
   
    localStorage.setItem('notes', JSON.stringify(noteData));
}


function getNoteData(){
    return JSON.parse(localStorage.getItem("notes")) || {};
}

function getNoteByTime(time) {
    const noteData = getNoteData();
    return noteData[time] || ""
}

function createTimeRow(time) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    
    row.setAttribute("id", "row-" + time);

    // add a timestamp col to the row
    const timestampCol = document.createElement("div");
    timestampCol.setAttribute("class", "col-2", "hour");
    timestampCol.setAttribute("class", "hour");
    timestampCol.textContent = time;
    row.appendChild(timestampCol);

    // add a textarea col to the row
    const textareaCol = document.createElement("div");
    textareaCol.setAttribute("class", "col-8");

    const textarea = document.createElement("textarea");
    textarea.setAttribute("cols", "80");
    textarea.setAttribute("id", "textarea-" + time);
    textarea.textContent = getNoteByTime(time);

    textareaCol.appendChild(textarea);

    row.appendChild(textareaCol);

    // add a button col to the row
    const buttonCol = document.createElement("div");
    const button = document.createElement("button");
    button.setAttribute("class", "saveBtn");
    button.setAttribute("id", "button-" + time);
    button.textContent = "💾";

    button.addEventListener("click", saveNote);

    buttonCol.appendChild(button);
    row.appendChild(buttonCol);

    // add color to the text area
    const timeValue = (+timeNumber); 
    const momentValue = +currentHour;
   
    if (timeValue < momentValue) {
       textareaCol.setAttribute("class", "past")
    }
    else if (timeValue <= momentValue){
        textareaCol.setAttribute("class", "present")
    }

    else{
        textareaCol.setAttribute("class", "future")
    }
    return row;
}

function main(){

    // Generate the timeblocks
    // Loop for 9 times to generate these blocks
    for (let index = 0; index < 9; index++) {
        // for each loop we will create a row
        let time = index + 9;
        var timeConvert = +time;
        timeNumber = timeConvert;
        if (timeConvert<12) {
            time = time + "AM";
        }
        else if (timeConvert===12){
            time = time + "PM";
        }else {
            time = timeConvert - 12 + "PM";
        }     
        const row = createTimeRow(time);    
        timeContainer.appendChild(row);
       
    }
            
    }   
  

main();
