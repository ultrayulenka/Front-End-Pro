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
    square.style.backgroundColor="blue";
    wrapper2.appendChild(square);
}

function getNewColor(color,array){
    for(let i=0;i<array.length-1;i++){
        if(color===array[i]){
            return array[i+1];
        }
    }
    return array[0];

}
wrapper2.addEventListener("click", function (event) {
    if(event.target.className!=="square"){
        return;
    }
    event.target.style.backgroundColor = getNewColor(event.target.style.backgroundColor,["blue","green","yellow"]);
})


