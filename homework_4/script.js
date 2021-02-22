
function calculateArea(radius){
    return Math.PI*radius*radius;
}

function calculateCircumference(radius) {
    return 2 * Math.PI * radius;
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
                return x+y;
            }
            case "-":{
                return x-y;
            }
            case "*":{
                return x*y;
            }
            case "/":{
                if(y===0){
                    console.log("Деление на 0");
                    break;
                }
                return x/y;
            }
            case "%":{
                if(y===0){
                    console.log("Деление на 0");
                    break;
                }
                return x%y;
            }
            case "^":{
                return Math.pow(x, y);
            }
        }
    } else{
        console.log("Вы ввели неверный знак");
        return;
    }
}

const radius=Number(prompt("Введите радиус круга в метрах"));
if(checkIfNumber(radius) && checkIfPositive(radius)){
    console.log("Площадь круга",calculateArea(radius),"м^2");
    console.log("Длина окружности",calculateCircumference(radius),"м");
}

const x=Number(prompt("Введите число х"));
const y=Number(prompt("Введите число y"));
if(checkIfNumber(x) && checkIfNumber(y)){
    console.log("Введеные числа - ",x,y)
    console.log("Среднее арифметическое ваших чисел",calculateAverage(x,y))
    const action=prompt("Введите математических знак +, -, *, /, %, ^");
    const result=calc(x, y, action);
    if(result!=undefined){
        console.log("Результат: x",action,"y =",result);
    }
}

