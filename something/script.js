localStorage.clear()

let ID_COUNTER = localStorage.getItem("id_counter");
if(ID_COUNTER===null || ID_COUNTER==="") ID_COUNTER = 0;
console.log(ID_COUNTER);



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


const users = [];

for(let i=0;i<=ID_COUNTER;i++){
    let user;
    let username = localStorage.getItem(`text-element-data-${i}`);
    if(username!==null && username!=="") {
        user = new User(username,i);
        users.push(user);
    }
}

const button = document.createElement("button");
button.innerText = "Add"
button.addEventListener("click", function(){
    const newUser = new User("username",ID_COUNTER);
    ID_COUNTER++;
    localStorage.setItem("id_counter",ID_COUNTER);
    localStorage.setItem(`text-element-data-${newUser.getID()}`,newUser.getName());
    users.push(newUser);
})

document.body.appendChild(button);

const button_show = document.createElement("button");
button_show.innerText = "Show"
button_show.addEventListener("click", function(){
    console.log(users);
})
document.body.appendChild(button_show);

const button_edit = document.createElement("button");
button_edit.innerText = "Edit"
button_edit.addEventListener("click", function(){
    const id = prompt("Enter id");
    let username = localStorage.getItem(`text-element-data-${id}`);
    if(username!==null && username!=="") {
        let user = users.find(function(user){
            if(user.getName()===username){
                return true;
            } else{
                return false;
            }
        });
        let newName = prompt("Enter name");
        let userInArray = users[users.indexOf(user)];
        userInArray.setName(newName);
        localStorage.setItem(`text-element-data-${id}`,userInArray.getName());
    }
})
document.body.appendChild(button_edit);

const button_delete = document.createElement("button");
button_delete.innerText = "Delete"
button_delete.addEventListener("click", function(){
    const id = prompt("Enter id");
    let username = localStorage.getItem(`text-element-data-${id}`);
    if(username!==null && username!=="") {
        let user = users.find(function(user){
            if(user.getName()===username){
                return true;
            } else{
                return false;
            }
        });
        let index = users.indexOf(user);
        users.splice(index,1);
        localStorage.removeItem(`text-element-data-${id}`);
    }
})

document.body.appendChild(button_delete);