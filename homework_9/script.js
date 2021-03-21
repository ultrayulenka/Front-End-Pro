const usernameForm=document.createElement("form");
usernameForm.className="username_form";
document.body.appendChild(usernameForm);

const inputField=document.createElement("input");
inputField.className="username_input";
inputField.type="text";
inputField.name="username";
usernameForm.appendChild(inputField);

const buttonSubmit=document.createElement("button");
buttonSubmit.className="username_submit";
buttonSubmit.type="submit";
buttonSubmit.innerText="Отправить";
usernameForm.appendChild(buttonSubmit);

const usersList=document.createElement("ul");
usersList.className="users_list";
usersList.innerText="Пользователи:";

document.body.appendChild(usersList);

function createListItem(username){
    const listItem = {
        user : {
            name : username,
        },
        buttons:[
            {
                name:"edit_button",
                type:"submit",
                text:"Редактировать",
                event:"click",
                action: function() {
                    const newUsername=prompt("Введите новый никнейм");
                    const username=this.parentElement.querySelector("span");
                    if(newUsername) {
                        username.innerText=newUsername;}
                    else alert("Неудачная попытка изменения никнейма");
                }
            },
            {
                name:"delete_button",
                type:"submit",
                text:"Удалить",
                event:"click",
                action: function() {
                    const user=this.parentNode;
                    if(confirm("Вы действительно хотели бы удалить пользователя?")){
                        user.remove();
                    } else alert("Пользователь не был удален");
                }
            }
        ]
    }
    return listItem;   
}

function createLI(listItem){
    const item = document.createElement("li");
    item.className = "list-item"
    const username = document.createElement("span");
    username.innerText = listItem.user.name;
    item.appendChild(username);
    listItem.buttons.map(addButton).forEach(function(button){
        item.appendChild(button);
    });
    return item;
}

function addButton(btn) {
    const button=document.createElement("button");
    button.className=btn.name;
    button.type=btn.type;
    button.innerText=btn.text;
    button.addEventListener(btn.event, btn.action);
    return button;
}

const users=[];
const array =["yulya","illia1999","username"]
for (const value of array){
    const newItem=createListItem(value);
    users.push(newItem);
}

console.log(users);
users.map(createLI).forEach(function(li){
    usersList.appendChild(li);
})

usernameForm.addEventListener("submit", function (event) {
    event.preventDefault();
   for (const element of usernameForm.elements) {
        if (element instanceof HTMLInputElement) {
            const newUsername = element.value;
            element.value="";
            if(newUsername) {
                const newItem=createListItem(newUsername);
                document.body.querySelector("ul").appendChild(createLI(newItem));
            }
            else alert("Неудачная попытка добавления пользователя");
        }
    }        
})