var output="";
var i,j;
var sum=0;
var composition;
var willContinue;
for(i=10;i<=20;i++){
    output+=i+", ";
}
console.log(output);
output="";
for(i=10;i<=20;i++){
    output+=i*i+", ";
}
console.log(output);
console.log("Таблица умножения на 7");
for(i=1;i<=10;i++){
    console.log(i,"*",7,"=",i*7);
}
for(i=1;i<=15;i++){
    sum+=i;
}
console.log("Сумма всех целых чисел от 1 до 15",sum);
composition=1;
for(i=15;i<=35;i++){
    composition*=i;
}
console.log("Произведение всех целых чисел от 15 до 35",composition);
sum=0;
for(i=1;i<=500;i++){
    sum+=i;
}
console.log("Среднее арифметическое всех целых чисел от 1 до 500",sum/500);
sum=0;
for(i=30;i<=80;i=i+2){
    sum+=i;
}
console.log("Сумма только четных чисел в диапазоне от 30 до 80",sum);
console.log("Все числа в диапазоне от 100 до 200 кратные 3");
for(i=100;i<=200;i++){
    if(i%3===0){
        console.log(i);
    }
}
const number=Number(prompt("Введите натуральное число"));
if(!Number.isInteger(number) || number<0)
{
    console.log("Вы ввели неверные данные");
}
else{
    var quantity,dividersSum;
    quantity=0;
    dividersSum=0;
    i=1;
    console.log("Все делители данного числа -", number);
    while(i<=number)
    {
        if(number%i===0)
        {
            console.log(i);
            if(i%2===0){
                quantity++;
                dividersSum+=i;
            }
        }
        i++;
    }
    console.log("Количество его четных делителей",quantity);
    console.log("Сумма его четных делителей",dividersSum);
}
console.log("Полная таблица умножения от 1 до 10");
for(i=1;i<=10;i++){
    for(j=1;j<=10;j++){
        console.log(i,"*",j,"=",i*j);
    }
    console.log(" ");
}

i=Math.round(Math.random() * 10);
do{
    j=Number(prompt("Попробуйте угадать число от 0 до 10"));
    while (Number.isNaN(j)) {
        willContinue = confirm("Вы ввели неверные данные. Желаете продолжить?");
            if(!willContinue){
                break;
            }
        j=Number(prompt("Попробуйте угадать число от 0 до 10"));
    } 
        if(j===i){
            console.log("Поздравляю! Вы угадали, это",i);
        } else{
            willContinue = confirm("Вы не угадали. Желаете попробовать снова?");
            if(!willContinue){
                console.log("Вы проиграли. Загаданое число -",i);
                break;
            }
        }
}while(j!=i)