class Button {
    #button;
    #defaultText;

    constructor(className, type, text, onClick) {
        this.#button = document.createElement("button");
        this.#button.className = className;
        this.#button.type = type;
        this.#defaultText = text;
        this.setText(text);
        if(onClick!==undefined){
            this.#button.addEventListener("click", onClick);
        }
    }
    setText(text) {
        this.#button.innerText = text;
    }

    disableButton(text){
        this.setText(text);
        this.#button.id = "disabled";
        this.#button.disabled = true;
    }

    unableButton(){
        this.setText(this.#defaultText);
        this.#button.id = "";
        this.#button.disabled = false;
    }

    render() {
        return this.#button;
    }
}
class listItem {
    #listItem;

    constructor(className, text){
        this.#listItem = document.createElement("li");
        this.#listItem.className = className;
        this.#listItem.innerText = text;
    }

    render() {
        return this.#listItem;
    }
}

class List {
    #list;
    #items=[];

    constructor(className){
        this.#list = document.createElement("ul");
        this.#list.className = className;
    }

    addItems(array){
        for (let item of array) {
            let newItem = new listItem("list-item", item);
            this.renderNewItem(newItem);
        }
    }

    clearList(){
        this.#items.length = 0;
        const renderedList = this.render();
        while (renderedList.hasChildNodes()) {   
            renderedList.removeChild(renderedList.firstChild);
        }
    }

    renderNewItem(item){
        this.#items.push(item);
        this.#list.appendChild(item.render());
    }

    render(){
        return this.#list;
    }
    
}

class CharactersLoader {
    #button; 
    #list; 
    #title
    #pageCounter;

    constructor(){
        this.#pageCounter = 0;
        this.#button = new Button("button","submit","Get data",()=>{
            this.#pageCounter++;
            this.getData();
        });
        this.#list = new List("characters-list");
        this.#title = document.createElement("span");
        this.#title.innerText = `Characters (page counter: ${this.#pageCounter})`;
    }

    getData(){
        const url = `https://rickandmortyapi.com/api/character/?page=${this.#pageCounter}`;
        this.loadData(url);
    }

    loadData(url){
        const xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.open("GET",url);
        xhr.onload = () =>{
            this.#button.disableButton("Getting data...");
            this.#list.clearList();
            if(xhr.status !== 200){
               console.error(new Error("something went wrong!"));
               return; 
            }
            this.addCharactes(xhr.response);
            this.updateTitle();
            if(xhr.response.info.pages === this.#pageCounter){
                this.#button.disableButton("No more data");
                return;
            }
            this.#button.unableButton();
            
        }

        xhr.onerror = function(){
            console.error(new Error("something went wrong!"));
        }
        xhr.send();
    }

    addCharactes(data){
        const charactersNames = data.results.map(function(item){
            return item.name;
        });
        this.#list.addItems(charactersNames);
    }

    updateTitle(){
        this.#title.innerText = `Characters (page counter: ${this.#pageCounter})`;
    }

    render() {
        const container = document.createElement("div");
        container.className = "wrapper";
        container.appendChild(this.#button.render());
        container.appendChild(this.#title);
        container.appendChild(this.#list.render());
        return container;
    }
}
charList = new CharactersLoader();
document.body.appendChild(charList.render());