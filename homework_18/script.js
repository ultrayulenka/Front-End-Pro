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

    enableButton(){
        this.setText(this.#defaultText);
        this.#button.id = "";
        this.#button.disabled = false;
    }

    render() {
        return this.#button;
    }
}

class SelectList{
    #selectList;
    #options=[];
    #selectedIndex;

    constructor(optionsArray){
        this.#selectList = document.createElement("select");
        this.combineOptions(optionsArray);
        this.#selectList.addEventListener("change", () => {
            this.#selectedIndex = this.#selectList.selectedIndex;
        });
    }

    combineOptions(array){
        for(let item of array){
            const newOption = document.createElement("option");
            newOption.innerText = item;
            this.#options.push(newOption);
        }
    }

    getSelectedIndex(){
        return this.#selectedIndex;
    }
    
    render(){
        this.#options.forEach(option =>{
            this.#selectList.appendChild(option)
        })
        return this.#selectList;
    }
}

class ListItem {
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
            let newItem = new ListItem("list-item", item);
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
    #selectList;
    #button; 
    #list; 
    #title;
    #maxPages = 34;
    #pageNumber;


    constructor(){
        this.#selectList = new SelectList(this.createSelectOptions());
        this.#button = new Button("button","submit","Get data",()=>{
            this.getData();
        });
        this.#list = new List("characters-list");
        this.#title = document.createElement("span");
        this.#title.innerText = "Characters";
    }

    createSelectOptions(){
        const options = [];
        for(let i=0; i<this.#maxPages; i++){
            options.push(`Page ${i+1}`);
        }
        return options;
    }

    getData(){
        this.#list.clearList();
        this.#button.disableButton("Getting data...");
        this.#pageNumber = this.#selectList.getSelectedIndex() + 61;
        const url = `https://rickandmortyapi.com/api/character/?page=${this.#pageNumber}`;
        fetch(url)
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                throw new Error(`Something went wrong! Status ${response.status}`);
            })
            .then(data => {
                this.addCharactes(data);
                this.#button.enableButton();
            })
            .catch(error => {
                console.error(error);
                this.#button.enableButton();
            })
    }

 

    addCharactes(data){
        const charactersNames = data.results.map(function(item){
            return item.name;
        });
        this.#list.addItems(charactersNames);
    }

    render() {
        const container = document.createElement("div");
        container.className = "wrapper";
        container.appendChild(this.#selectList.render());
        container.appendChild(this.#button.render());
        container.appendChild(this.#title);
        container.appendChild(this.#list.render());
        return container;
    }
}

charList = new CharactersLoader();
document.body.appendChild(charList.render());