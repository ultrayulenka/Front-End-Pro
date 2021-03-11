function createList(array){
    const list= document.createElement("ul");
    for (const value of array){
        const listItem = document.createElement("li");
        if(Array.isArray(value)){
            const innerList=createList(value);
            listItem.appendChild(innerList);
        } else {
            listItem.innerHTML = value;
        }
        list.appendChild(listItem);
    } 
    return list;
}

const mainlist = createList([1, 2, 3]);
document.body.appendChild(mainlist);
const newlist = createList([1, 2, [1.1, 1.2, 1.3], 3]);
document.body.appendChild(newlist);