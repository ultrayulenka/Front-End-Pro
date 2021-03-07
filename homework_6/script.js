function forEach(array,callback){
    for (let i = 0; i < array.length; i++) {
        if(array[i] !== undefined ){
            callback(array[i],i,array);
        }
    }
}

function map(array,callback){
    const newArray=[];
    for (let i = 0; i < array.length; i++) {
        if(array[i]!==undefined){
            newArray.push(callback(array[i],i,array));
        }else{
            newArray.push(array[i]);
        }
    }
    return newArray;
}

function filter(array,callback){
    const newArray=[];
    for (let i = 0; i < array.length; i++) {
        if(array[i]!==undefined && callback(array[i],i,array)){
            newArray.push(array[i]);
        }
    }
    return newArray;
}

function some(array,callback){
    for (let i = 0; i < array.length; i++) {
        if(callback(array[i],i,array)){
            return true;
        }
    }
    return false;
}

function every(array,callback){
    for (let i = 0; i < array.length; i++) {
        if(!callback(array[i],i,array)){
            return false;
        }
    }
    return true;
}

//ПРОВЕРКИ

const people = [
    { name: 'Владилен', age: 25, budget: 40000 },
    { name: 'Елена', age: 17, budget: 3400 },
    { name: 'Игорь', age: 49, budget: 50000 },
    { name: 'Михаил', age: 15, budget: 1800 },
    { name: 'Василиса', age: 24, budget: 25000 },
    { name: 'Виктория', age: 38, budget: 2300 },
  ];

people[8]={ name: 'Юлия', age: 20, budget: 200 };
people[9]=null;

const prices=[10,12,53,90,63,5.5];

function printWithIndex(value,index){
    console.log(value,index);
}
function getNames(obj){
    if(obj!=undefined) {
        return obj.name;
    }
    return;
}

function deductBudget(obj){
    if(obj!=undefined) {
        obj.budget-=200;
        return obj;
    }
    return;
}

function multiplyByTwo(value){
    if(value!=undefined) {
        return value*2;
    }
    return;
}

function longerThanSix(text){
    if(text!=undefined) {
        return text.length>6;
    }
    return false;
}

function isEven(value){
    if(value!=undefined) {
        return value%2===0;
    }
    return false;
}

console.log("Массив №1")
forEach(people,printWithIndex);
console.log("Массив №2")
forEach(prices,printWithIndex);


const names=map(people,getNames);
console.log("Массив имен из массива №1")
forEach(names,printWithIndex);

const people2=map(people,deductBudget);
console.log("Массив №1, но с уменьшенным бюджетом на 200")
forEach(people2,printWithIndex);

const prices2=map(prices,multiplyByTwo);
console.log("Массив №2, где каждый элемент умножен на 2")
forEach(prices2,printWithIndex);


console.log("Массив №3, состоящий из имен, длинее 6-ти букв")
const longNames=filter(names,longerThanSix)
console.log(longNames);
console.log("Массив из четных элементов массива №2");
console.log(filter(prices,isEven));

console.log("Есть ли имя в массиве №1 длиннее 6ти букв?");
console.log(some(names,longerThanSix));
console.log("Есть ли имя в массиве №3 длиннее 6ти букв?");
console.log(some(longNames,longerThanSix));

console.log("Все ли имена в массиве №1 длиннее 6ти букв?");
console.log(every(names,longerThanSix));
console.log("Все ли имена в массиве №3 длиннее 6ти букв?");
console.log(every(longNames,longerThanSix));

