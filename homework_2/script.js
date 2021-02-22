console.log("Task #1");
const num_1 = Number(prompt("Enter the first number"));
const num_2 = Number(prompt("Enter the second number"));

if (Number.isNaN(num_1) || Number.isNaN(num_2)) {
    console.log("ERROR");
} else {
    console.log("Your numbers:",num_1," ",num_2)
    if(num_1===num_2){
        console.log("This numbers are equal");
    } else if(num_1>num_2){
        console.log("The first number is greater than the second");
    } else {
        console.log("The second number is greater than the first");
    }
}

console.log("Task #2");
const number = Number(prompt("Enter any number"));
if (Number.isNaN(number)) {
    console.log("ERROR");
} else {
    console.log("Your number:",number)
    const last_digit=number%10;
    if(last_digit%2===0){
        console.log("This number is even");
    }
    else{
        console.log("This number is odd");
    }
    console.log("The last digit of your number is",last_digit);
}

console.log("Task #3");
const name = prompt("Введите ваше имя") || "Аноним";
const age = Number(prompt("Введите ваш возраст"));
if (Number.isNaN(age) || age<0 || !isNaN(Number(name))) {
    console.log("Вы ввели неверные данные");
} else {
    console.log("Ваше имя и возраст - ", name,age);
    const isDrinking = confirm("Алкоголь употребляем?");
    if(isDrinking){
        if(age>40){
            console.log("Не злоупотребляйте,",name);
        } else if(age<18){
            console.log(name,"! Ты что?! Маме расскажу!");
        } else{
            console.log("Только водку с пивом не мешай", name,"...");
        }
    } else{
        console.log(name,", так держать!");
    }
}