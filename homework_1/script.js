console.log("Task #1");
const name = prompt("Введите ваше имя");
const YOB = Number(prompt("Какого ты года рождения?"));
if (Number.isNaN(YOB) || YOB<0 || YOB>=2021 || !isNaN(Number(name))) {
    console.log("Вы ввели неверные данные");
} else {
    console.log(name,2021-YOB);
}

console.log("Task #2");
const a = Number(prompt("Введите ваше число А"));
const b = Number(prompt("Введите ваше число B"));
const c = Number(prompt("Введите ваше число C"));
if (Number.isNaN(a) || Number.isNaN(b) || Number.isNaN(c)) {
    console.log("Вы ввели неверные данные");
} else {
    const sum=a+b+c;
    console.log("Сумма введенных чисел а+b+c=",sum);
    if (a%2>0) {
        console.log("Переменная А =",a,"- четное число");
    } else{
        console.log("Переменная А =",a,"- нечетное число");
    }
    if (b%2>0) {
        console.log("Переменная B =",b,"- четное число");
    } else{
        console.log("Переменная B =",b,"- нечетное число");
    }
    if (c%2>0) {
        console.log("Переменная C =",c,"- четное число");
    } else{
        console.log("Переменная C =",c,"- нечетное число");
    }
    console.log("Среднее арифметическое введенных чисел",sum/3);
}

console.log("Task #3");
const number = Number(prompt("Введите пятизначное число"));
if (Number.isNaN(number) || number<10000) {
    console.log("Вы ввели неверные данные");
} else{
    const digit5=number%10;
    const digit4=(number%100 - digit5)/10;
    const digit3=(number%1000 - digit4*10 - digit5)/100;
    const digit2=(number%10000 - digit3*100 - digit4*10 - digit5)/1000;
    const digit1=(number - digit2*1000 - digit3*100 - digit4*10 - digit5)/10000;
    console.log(digit1,digit2,digit3,digit4,digit5);
}