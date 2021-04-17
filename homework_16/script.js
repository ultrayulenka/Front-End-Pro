let ID_COUNTER = localStorage.getItem("id_counter");
if(ID_COUNTER===null || ID_COUNTER==="") ID_COUNTER = 0;

class Form {
    #form;
    #input;
    #button;

    constructor(className, inputClass, inputType, buttonName, buttonType, buttonText) {
        this.#form = document.createElement("form");
        this.#form.className = className;
        this.#input = new Input(inputClass,inputType);
        this.#button = new Button(buttonName, buttonType, buttonText);
    }

    render() {
        this.#form.appendChild(this.#input.render());
        this.#form.appendChild(this.#button.render());
        return this.#form;
    }
}

class Input {
    #input;

    constructor(className,type) {
        this.#input = document.createElement("input");
        this.#input.className = className;
        this.#input.type = type;
    }

    render() {
        return this.#input;
    }
}

class Button {
    #button;

    constructor(className,type,text, onClick) {
        this.#button = document.createElement("button");
        this.#button.className = className;
        this.#button.type = type;
        this.setText(text);
        if(onClick!==undefined){
            this.#button.addEventListener("click", onClick);
        }
    }
    setText(text) {
        this.#button.innerText = text;
    }

    render() {
        return this.#button;
    }
}

class User {
    #id;
    #username;

    constructor(username,id){
        this.#id = id;
        this.setName(username);
    }

    getName(){
        return this.#username;
    }

    setName(name){
        this.#username = name;
    }

    getID(){
        return this.#id;
    }
}


class listItem {
    #listItem;
    #user;
    #text;
    #buttons;

    constructor(className, user){
        this.#listItem = document.createElement("li");
        this.#listItem.className = className;
        this.#user = user;
        this.#text = document.createElement("span");
        this.showUsername();
        this.#buttons = this.defaultButtons();
    }

    defaultButtons(){
        const buttons=[];
        buttons.push(new Button("edit_button","submit","Редактировать",this.onClickEdit.bind(this)));
        buttons.push(new Button("delete_button","submit","Удалить",this.onClickDelete.bind(this)));
        return buttons;
    }

    showUsername(){
        this.#text.innerText = this.#user.getName()
    }

    getUser(){
        return this.#user;
    }

    onClickEdit(){
        const newUsername=prompt("Введите новый никнейм");
        if(newUsername) {
            this.#user.setName(newUsername);
            localStorage.setItem(`text-element-data-${this.#user.getID()}`,this.#user.getName());
            this.showUsername();
        } else alert("Неудачная попытка изменения никнейма");
    }

    onClickDelete(){
        if(confirm(`Вы действительно хотели бы удалить пользователя с ником ${this.#user.getName()}`)){
            localStorage.removeItem(`text-element-data-${this.#user.getID()}`);
            this.#user="";
            this.#text="";
            this.#buttons=[];
            this.#listItem.remove();
        } else alert("Пользователь не был удален");
    }


    render() {
        const item = this.#listItem;
        item.appendChild(this.#text);
        this.#buttons.map(function(button){
            return button.render();
        }).forEach(function(button){
            item.appendChild(button);
        });
        this.#listItem = item;
        return this.#listItem;
    }
}

class List {
    #list;
    #items=[];

    constructor(className, text){
        this.#list = document.createElement("ul");
        this.#list.className = className;
        this.#list.innerText = text;
        const storagedItems = this.loadItems();
        if(storagedItems.length>0) this.combineItems(storagedItems);
    }

    loadItems(){
        const items = [];
        for(let i=0; i<ID_COUNTER; i++){
            let username = localStorage.getItem(`text-element-data-${i}`);
            if(username !== null && username !== ""){
                let user = new User(username, i);
                let item = new listItem("list-item",user);
                items.push(item);
            }
        }
        return items;
    }

    getList(){
        return this.#list;
    }

    addItem(item){
        this.#items.push(item);
        localStorage.setItem(`text-element-data-${item.getUser().getID()}`,item.getUser().getName());
        this.#list.appendChild(item.render());
    }


    combineItems(items){
        for(let item of items){
            this.#items.push(item);
        }
    }


    render(){
        const list = this.#list;
        this.#items.map(function(item){
            return item.render();
        }).forEach(function(item){
            list.appendChild(item);
        });
        this.#list = list;
        return this.#list;
    }
}

//Default Users
if(ID_COUNTER===0){
    const defaultUsernames = ["yulya","illia1999","username"];
    const defaultUsers= defaultUsernames.map(function(username){
        const user = new User(username,ID_COUNTER);
        ID_COUNTER++;
        localStorage.setItem("id_counter", ID_COUNTER);
        return user;
    });
    console.log(defaultUsers);
    defaultUsers.forEach(function(user){
        localStorage.setItem(`text-element-data-${user.getID()}`,user.getName());
    })
}

const form = new Form("username_form", "username_input", "text", "username_submit", "submit", "Отправить");
usernameForm = form.render();
document.body.appendChild(usernameForm);

const list = new List("users_list","Пользователи:");
document.body.appendChild(list.render());


usernameForm.addEventListener("submit", function (event) {
   event.preventDefault();
   for (const element of usernameForm.elements) {
        if (element instanceof HTMLInputElement) {
            const newUsername = element.value;
            element.value="";
            if(newUsername) {
                const newUser = new User(newUsername,ID_COUNTER);
                ID_COUNTER++;
                localStorage.setItem("id_counter", ID_COUNTER);
                localStorage.setItem(`text-element-data-${newUser.getID()}`,newUser.getName());
                const newItem = new listItem("list-item",newUser)
                list.addItem(newItem);
            }
            else alert("Неудачная попытка добавления пользователя");
        }
    }        
})



