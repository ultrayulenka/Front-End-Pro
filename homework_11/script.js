const wrapper1 = document.createElement("div");
wrapper1.className="wrapper";
document.body.appendChild(wrapper1);

const wrapper2 = document.createElement("div");
wrapper2.className="wrapper";
document.body.appendChild(wrapper2);

function createSquare(){
    const square = document.createElement("div");
    square.className="square";
    return square;
}

function createSpan(value){
    const span=document.createElement("span");
    span.innerText=value;
    return span;
}

function addButton(btn) {
    const button=document.createElement("button");
    button.className=btn.name;
    button.type=btn.type;
    button.innerText=btn.text;
    return button;
}

for(let i=0;i<5;i++){
    let square=createSquare();
    square.appendChild(createSpan(0));
    square.appendChild(addButton({
        name:"add_button",
        type:"submit",
        text:"+",
    }));
    square.appendChild(addButton({
        name:"deduct_button",
        type:"submit",
        text:"-",
    }));
    wrapper1.appendChild(square);  
}

wrapper1.addEventListener("click",function(event){
    if(event.target.tagName!=="BUTTON"){
        return;
    }
    const text = event.target.closest(".square").querySelector("span");
    const value = Number(text.innerText);
    switch(event.target.innerText){
        case "+": {
            text.innerText=value+1;
            break;
        }
        case "-": {
            text.innerText=value-1;
            break;
        }
    }

})

for(let i=0;i<5;i++){
    let square=createSquare();
    wrapper2.appendChild(square);
}
wrapper2.addEventListener("click", function (event) {
    if(event.target.className!=="square"){
        return;
    }
    bgColor=event.target.style.backgroundColor;
        switch(bgColor){
            case "blue": {
                bgColor="green";
                break;
            }
            case "green": {
                bgColor="yellow";
                break;
            }
            case "yellow": {
                bgColor="transparent"
                break;
            }
            default: bgColor="blue";
        }
    event.target.style.backgroundColor = bgColor;
})


