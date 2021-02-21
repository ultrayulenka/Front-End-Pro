
function calculateArea(radius){
    return 3.14*radius*radius;
}

function calculateCircumference(radius) {
    return 2 * 3.14 * radius;
}

function checkIfNumber(value){
    if (Number.isNaN(value)) {
        console.log("Вы ввели неверные данные");
        return false;
    } else{
        return true;
    }
}
function checkIfPositive(value){
    if (value<=0) {
        console.log("Вы ввели неверные данные");
        return false;
    } else{
        return true;
    }
}

function calculateAverage(a,b){
    return (a+b)/2;
}

function calc(x, y, action){
    if(action==="+" || action==="-" ||action==="*" ||action==="/" ||action==="%" ||action==="^"){
        switch(action){
            case "+":{
                console.log("Результат: x",action,"y =",x+y);
                break;
            }
            case "-":{
                console.log("Результат: x",action,"y =",x-y);
                break;
            }
            case "*":{
                console.log("Результат: x",action,"y =",x*y);
                break;
            }
            case "/":{
                if(y===0){
                    console.log("Деление на 0");
                    break;
                }
                console.log("Результат: x",action,"y =",x/y);
                break;
            }
            case "%":{
                if(y===0){
                    console.log("Деление на 0");
                    break;
                }
                console.log("Результат: x",action,"y =",x%y);
                break;
            }
            case "^":{
                console.log("Результат: x",action,"y =",Math.pow(x, y));
                break;
            }
        }
    } else{
        console.log("Вы ввели неверный знак");
    }
}

const radius=Number(prompt("Введите радиус круга в метрах"));
if(checkIfNumber(radius) && checkIfPositive(radius)){
    console.log("Площадь круга",calculateArea(radius),"м");
    console.log("Длина окружности",calculateCircumference(radius),"м");
}
const x=Number(prompt("Введите число х"));
const y=Number(prompt("Введите число y"));
if(checkIfNumber(x) && checkIfNumber(y)){
    console.log("Введеные числа - ",x,y)
    console.log("Среднее арифметическое ваших чисел",calculateAverage(x,y))
    const action=prompt("Введите математических знак +, -, *, /, %, ^");
    calc(x, y, action);
}

