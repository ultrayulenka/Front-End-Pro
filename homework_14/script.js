function getTime(divider){
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

function showTimeConsole(interval){
    setInterval(function(){
        console.clear();
        console.log(getTime(":"));
    },interval);
}

function createElements(string,parent){
    colors = ["#B0D0D3","#C08497","#0A1045","#F7AF9D","#F7E3AF","#0A1045","#F3EEC3","#324376"];
    for(let i=0; i<string.length; i++){
        const container = document.createElement("div");
        container.style.color = colors[i];
        parent.appendChild(container);
    }
}

function showTimeScreen(interval,containers){
    setInterval(function(){
        const time = getTime(":");
        for(let i=0; i<containers.length; i++){
            containers[i].innerText = time[i];
        }
    },interval);
}

const wrapper = document.querySelector(".wrapper");
createElements("HH:mm:ss",wrapper);
elements = wrapper.children;
console.log(elements.length);
showTimeConsole(1000);
showTimeScreen(1000,elements);
