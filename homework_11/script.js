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
    button.addEventListener(btn.event, btn.action);
    return button;
}

for(let i=0;i<5;i++){
    let square=createSquare();
    square.appendChild(createSpan(0));
    square.appendChild(addButton({
        name:"add_button",
        type:"submit",
        text:"+",
        event:"click",
        action: function() {
            const text = this.parentNode.querySelector("span");
            const value = Number(text.innerText);
            text.innerText=value+1;
        }
    }));
    square.appendChild(addButton({
        name:"deduct_button",
        type:"submit",
        text:"-",
        event:"click",
        action: function() {
            const text = this.parentNode.querySelector("span");
            const value = Number(text.innerText);
            text.innerText=value-1;
        }
    }));
    wrapper1.appendChild(square);  
}


for(let i=0;i<5;i++){
    let square=createSquare();
    wrapper2.appendChild(square);
    square.addEventListener("click", function () {
        bgColor=square.style.backgroundColor;
        switch(bgColor){
            case "blue": {
                bgColor = "green";
                break;
            }
            case "green": {
                bgColor = "yellow";
                break;
            }
            case "yellow": {
                bgColor = "transparent"
                break;
            }
            default: bgColor = "blue";
        }
        square.style.backgroundColor = bgColor;
    })
}


