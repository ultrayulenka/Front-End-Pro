const select = document.querySelector("select");
let ACTIVE_INTERVAL_CONSOLE;
let ACTIVE_INTERVAL_SCREEN;

select.addEventListener('change', e =>{
   const wrapper = document.querySelector(".wrapper");
   clearInterval(ACTIVE_INTERVAL_CONSOLE);
   clearInterval(ACTIVE_INTERVAL_SCREEN);
   deleteElemets(wrapper);
   let elements = wrapper.children;
   let timeFunction,interval,newFormat;
   switch(e.target.selectedIndex){
        case 0: {
            timeFunction = getTime;
            interval = 1000;
            break;
        }
        case 1: {
            timeFunction = getShortTime;
            interval = 1000;
            break;
        }
        case 2:{
            timeFunction = getLongTime;
            interval = 1000;
            break;
        }
   }
   newFormat = timeFunction();
   createElements(newFormat,wrapper);
   ACTIVE_INTERVAL_CONSOLE =showTimeConsole(interval,timeFunction);
   ACTIVE_INTERVAL_SCREEN = showTimeScreen(interval,timeFunction,elements);
})

function addElements(number,parent){
    for(let i=0; i<number; i++){
        const container = document.createElement("div");
        container.style.color = colors[colors.length % i];
        parent.appendChild(container);
    }
}

function deleteElemets(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}

function getShortTime(divider){
    divider = divider? divider: ":";
    const date = new Date();
    const time = {};
    time.hours = date.getHours();
    time.minutes = date.getMinutes();
    if(time.hours>12){
        time.hours -= 12;
    } else if(time.hours===0){
        time.hours = 12;
    }
    for (key in time) {
        time[key] = time[key]<10? "0"+time[key] : time[key];
    }
    if(time.hours>=12){
        time.ampm = "PM";
    } else {
        time.ampm = "AM";
    }
    return time.hours + divider + time.minutes + ' ' + time.ampm;
}

function getTime(divider){
    divider = divider? divider: ":";
    const date = new Date();
    const time = {};
    time.hours = date.getHours();
    time.minutes = date.getMinutes();
    time.seconds = date.getSeconds();
    for (key in time) {
        time[key] = time[key]<10? "0"+time[key] : time[key];
    }
    return time.hours + divider + time.minutes + divider + time.seconds;
}

function getLongTime(timeDivider,dateDivider){
    dateDivider = dateDivider? dateDivider: "/";
    timeDivider = timeDivider? timeDivider: ":";
    const date = new Date();
    const time = {};
    time.day = date.getDate();
    time.month = date.getMonth()+1;
    time.hours = date.getHours();
    time.minutes = date.getMinutes();
    for (key in time) {
        time[key] = time[key]<10? "0"+time[key] : time[key];
    }
    time.year = date.getFullYear();
    return time.year + dateDivider + time.month + dateDivider + time.day + ' ' + time.hours + timeDivider + time.minutes;
}

function showTimeConsole(interval,timeFunction){
    return setInterval(function(){
        console.clear();
        console.log(timeFunction(":"));
    },interval);
}

function createElements(string,parent){
    var colors = ["#d45a26", "#d46c3f", "#d98764", "#d46c3f", "#d45a26"];
    for(let i=0; i<string.length; i++){
        const container = document.createElement("div");
        container.style.color = colors[i % colors.length];
        parent.appendChild(container);
    }
}

function showTimeScreen(interval,timeFunction,containers){
    return setInterval(function(){
        const time = timeFunction(":");
        for(let i=0; i<containers.length; i++){
            containers[i].innerText = time[i];
        }
    },interval);
}
const wrapper = document.querySelector(".wrapper");
createElements("HH:MM:SS",wrapper);
elements = wrapper.children;
ACTIVE_INTERVAL_CONSOLE=showTimeConsole(1000,getTime);
ACTIVE_INTERVAL_SCREEN = showTimeScreen(1000,getTime,elements);
