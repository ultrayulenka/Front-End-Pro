class Button {
    #button;
    #defaultText;

    constructor({className,text}) {
        this.#button = document.createElement("button");
        this.#button.className = className;
        this.#defaultText = text;
        this.setText(text);
    }
    setText(text) {
        this.#button.innerText = text;
    }

    setType(type){
        this.#button.type = type;
    }

    addEvent(event, action){
        this.#button.addEventListener(event, action());
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

class ButtonSubmit extends Button{
    constructor({className,text, onClick}) {
        super({className: className, text: text});
        this.setType("submit");
        if(onClick!==undefined){
            this.addEvent("click", () => onClick)
        }
    }
}


class TextArea {
    #textarea;

    constructor({className,text}) {
        this.#textarea = document.createElement("textarea");
        this.#textarea.className = className;
        this.#textarea.placeholder = text;
    }

    render() {
        return this.#textarea;
    }
}

class Bot {
    #messageClass;
    #replies;
    #greeting;
    #goodbye;

    constructor({className, greeting, replies, goodbye}){
        this.#messageClass = className;
        this.#greeting = greeting;
        this.#replies = [...replies];
        this.#goodbye = goodbye;
    }

    greet(){
        const message = new Message(this.#messageClass);
        message.setText(this.#greeting);
        return message;
    }

    reply(){
        const index = Math.floor(Math.random() * this.#replies.length);
        const message = new Message(this.#messageClass);
        message.setText(this.#replies[index]);
        return message;
    }

    sayGoodbye(){
        const message = new Message(this.#messageClass);
        message.setText(this.#goodbye);
        return message;
    }
}

class Message {
    #container;
    #message;
    #timestamp;

    constructor(className){
        this.#container = document.createElement("div");
        this.#container.className = className;
        this.#message = document.createElement("span");
        this.#message.className = `${className}-text`;
        this.#timestamp = document.createElement("span");
        this.#timestamp.className = `${className}-timestamp`;
        this.#timestamp.innerText = this.getTimestamp();
    }

    setText(text){
        this.#message.innerText = text;
    }
    getTimestamp(divider = ":"){
        const date = new Date();
        const time = {};
        time.hours = date.getHours();
        time.minutes = date.getMinutes();
        for (let key in time) {
            time[key] = time[key]<10? "0"+time[key] : time[key];
        }
        return time.hours + divider + time.minutes;
    }

    addClass(string){
        this.#container.classList.add(string);
    }

    render() {
        this.#container.appendChild(this.#message);
        this.#container.appendChild(this.#timestamp);
        return this.#container;
    }

}



class Chat {
    #class;
    #chat;
    #textarea;
    #button;
    #bot;
    #goodbyeMessages = ["Ой, все", "Пока", "Досвидания", "До встречи"];
    #isBotAvailable;

    constructor({chatClass, messageClass, botGreeting, botReplies, botGoodbye}){
        this.#chat = document.createElement("div");
        this.#class = {chat: chatClass, message: messageClass};
        this.#chat.className = `${this.#class.chat}-box`;
        this.#bot = new Bot({className: this.#class.message, greeting: botGreeting, replies: botReplies, goodbye: botGoodbye});
        this.#textarea = new TextArea({className: `${this.#class.message}-input`, text: "Type you message..."});
        this.#button = new ButtonSubmit({className:`${this.#class.message}-submit`, text: "Send", onClick: () => this.onClick()});
        this.#isBotAvailable = true;
    }

    waitRandom(){
        const delay = Math.floor(Math.random() * (3000 - 1000) + 1000);
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    async onClick(){
        const value = this.#textarea.render().value;
        if(value === ""){
            alert("Введите сообщение!");
            return;
        }
        this.#chat.appendChild(this.getUserMessage(value));
        this.updateScroll();
        this.#textarea.render().value="";
        if(!this.#isBotAvailable) return;
        const botReply = await this.getBotReply(value);
        this.#chat.appendChild(botReply);
        this.updateScroll();
    }

    updateScroll(){
        this.#chat.scrollTop = this.#chat.scrollHeight;
    }

    async getBotReply(text){
        await this.waitRandom();
        let botReply;
        if(this.#goodbyeMessages.includes(text)){
            this.#isBotAvailable = false;
            botReply = this.#bot.sayGoodbye();
        } else {
            botReply = this.#bot.reply();
        }
        botReply.addClass(`bot-${this.#class.message}`);
        return botReply.render();
    }

    getUserMessage(text){
        const newMessage = new Message(this.#class.message)
        newMessage.setText(text);
        newMessage.addClass(`user-${this.#class.message}`)
        return newMessage.render();
    }

    render(){
        const container = document.createElement("div");
        container.className = "chat";
        container.appendChild(this.#chat);
        const messageBox = document.createElement("div");
        messageBox.className = "message-box";
        messageBox.appendChild(this.#textarea.render());
        messageBox.appendChild(this.#button.render());
        container.appendChild(messageBox);
        const greeting = this.#bot.greet();
        greeting.addClass("bot-message");
        this.#chat.appendChild(greeting.render());
        return container;
    }
}

const chatProps = {
    chatClass: "chat", 
    messageClass: "message", 
    botGreeting: "Привет, я Ральф. Как дела?", 
    botReplies: [
        'Неплохо',
        '2+2=5',
        'Я много раз пишу одно и то же',
        'Круто',
        'Что делаешь сейчас?',
        'Какой твой любимый цвет?',
        'Как интересно!',
        'Надеюсь, завтра будет хорошая погода',
        ':)'],
    botGoodbye : "Пока-пока. Я пойду по своим делам :)"
}

const container = document.querySelector(".container");
const chat = new Chat(chatProps);
container.appendChild(chat.render());

