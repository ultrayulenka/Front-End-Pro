function isSymbolPresentInString(str,symbol){
    for (let char of str) {
        if(char===symbol){
            return true;
        }
    }
    return false;
}

function getSymbolIndex(str,symbol){
    for(let i=0; i<str.length;i++){
        if(symbol===str[i]){
            return i;
        }
    }
    return -1;
}

function copy(target,origin) {
    for (let key in mainObj) {
      target[key] = origin[key];
    }
    return target;
}

function compare(obj1, obj2){
    if(obj1===obj2){
        return true;
    }
    if(Object.keys(obj1).length!==Object.keys(obj2).length){
        return false;
    }
    for(var propName in obj1){
        if (! obj2.hasOwnProperty(propName)) { 
            return false;
        }
        if(obj1[propName]!== obj2[propName]){
            return false;
        }
    }
    return true;
}

function countChars(str){
    var result = {};
    var count;
    for(var i=0; i<str.length; i++){
        if(result[str[i]]){
           count=result[str[i]];
        }
        else {
            count=0;
        }
        result[str[i]]=count+1;
    }
    return result;
}

console.log(isSymbolPresentInString("abc","a"));
console.log(isSymbolPresentInString("abc","e")); 


console.log(getSymbolIndex("hello lol","h"));
console.log(getSymbolIndex("hello lol","l"));
console.log(getSymbolIndex("hello lol","v"));

  
const mainObj = {
    a: 2,
    b: 5,
    name: "Yulya",
    bool: false,
};

const copiedObj={};

console.log(copy(copiedObj,mainObj));
console.log(compare(copiedObj,mainObj));
const newObj = {
    a: 2,
    b: 9,
    name: "Yulya",
    bool: false,
};

console.log(compare(newObj,mainObj));

console.log(countChars("hello lol"));