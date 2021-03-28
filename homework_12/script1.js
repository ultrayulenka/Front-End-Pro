const inputs = [
    {
        id: "email",
        name: "Email",
        type: "text",
        required: true,
    },
    {
        id: "password",
        name: "Пароль",
        type: "password",
        required: true,
    }
]

const buttons = [
    {
        name: "submit_button",
        type: "submit",
        text: "Отправить"
    }
]

function createForm(name,inputList,buttons){
    const form = document.createElement("form");
    form.className = name;
    inputList.map(addInput).forEach(function(input){
        form.appendChild(input);
    });
    buttons.map(addButton).forEach(function(button){
        form.appendChild(button);
    });
    return form;
}

function addInput(input) {
    const inputField=document.createElement("input");
    inputField.id = input.id;
    inputField.type = input.type;
    inputField.placeholder = input.name;
    if(input.required) inputField.setAttribute("required","");
    return inputField;
}

function addButton(btn) {
    const button = document.createElement("button");
    button.className = btn.name;
    button.type = btn.type;
    button.innerText = btn.text;
    return button;
}

const form = createForm("login_form",inputs,buttons);
document.body.appendChild(form);

function validateEmail(email){
    return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email);
}

function validatePassword(password){
   const messages=[];
    if(password.length<8){
        messages.push("Пароль должен состоять минимум из 8 символов");
    }
    if(!/[0-9]/.test(password)){
        messages.push("Пароль должен содержать минимум одну цифру");
    }
    if(!/[@$#!?&]/.test(password)){
        messages.push("Пароль должен содержать минимум один из перечисленных символов: @$#!?&");
    }
    if(messages.length>0){
        alert(messages.join("\n"));
        return false;
    }
    return true;
}


form.addEventListener("change", function (event) {
    if(event.target.tagName!=="INPUT"){
        return;
    }
    button=this.querySelector("button");
    let isValid;
    switch(event.target.id){
        case "email":{
            isValid = validateEmail(event.target.value);
            break;
        }
        case "password":{
            isValid = validatePassword(event.target.value);
            break;
        }
        default: return;
    }
    if(!isValid){
        event.target.classList.add("invalid");
        button.id = "disabled";
        button.disabled = true;
        return;
    } else {
        event.target.classList.remove("invalid");
        if(this.querySelectorAll(".invalid").length>0){
            return;
        }
    }
    button.id = "";
    button.disabled = false;
})


wrapper = document.createElement("div");
wrapper.className = "wrapper";
document.body.appendChild(wrapper);


function createParagraph(text){
    const paragraph = document.createElement("p");
    paragraph.innerText = text;
    return paragraph;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const user={};
    for (const element of this.elements) {
        if (element instanceof HTMLInputElement) {
            user[element.id] = element.value;
            element.value = "";
        }
    }
    wrapper.appendChild(createParagraph(JSON.stringify(user))); 
})