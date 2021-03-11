
function deepCopy(arg) {
    if (typeof arg === "object" && arg !== null && !Array.isArray(arg)) {
        const result = {};
        for (const key in arg) {
            const value = arg[key];
            const clone = deepCopy(value);
            result[key] = clone;
        }
        return result;
    } else if (Array.isArray(arg)) {
        const result = [];
        for (const element of arg) {
            const clone = deepCopy(element);
            result.push(clone);
        }
        return result;
    } else {
        return arg;
    }
}

const mainObj={
    name: "Yulya",
    occupation: true,
    age: 21,
    friendsList: [
        {
            name:"Iliia",
            age:22
        },
        {
            name:"Katya",
            age:37
        },
        {
            name:"Sasha",
            age:19
        }
    ]
}

const copiedObj = deepCopy(mainObj);
console.log(copiedObj === mainObj,copiedObj.friendsList === mainObj.friendsList,copiedObj.friendsList[1] === mainObj.friendsList[1]);
console.log(copiedObj.name === mainObj.name,copiedObj.friendsList[1].age === mainObj.friendsList[1].age);

function createSum(){
    let result;
    return function(arg) {
        result = result === undefined? arg : result + arg;
        return result;
    }
}

const sum=createSum();
console.log(sum(3));
console.log(sum(78));
console.log(sum(-20));