function Unit(type, health, maxHealth, maxDistance) {
    this.type = type;
    this.health = health;
    this.maxHealth = maxHealth;
    this.maxDistance = maxDistance;
}

Unit.prototype.isReadyToMove = function(distance){
    return distance <= this.maxDistance? true : false;
}

Unit.prototype.isReadyToFight = function(){
    return this.health >= (this.maxHealth/2)? true : false;
}
Unit.prototype.restore = function(){
    if(this.health < this.maxHealth){
        this.health = this.maxHealth;
    }
}
Unit.prototype.clone = function(){
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
}

function Army(defaultUnits) {
    this.units = [];
    if (defaultUnits) this.combineUnits(defaultUnits);
}

Army.prototype.isReadyToMove = function(distance){
    if(this.units.length===0) return false;
    for(unit of this.units){
        if(!unit.isReadyToMove(distance)){
            return false;
        }
    }
    return true;
}
Army.prototype.isReadyToFight = function(){
    if(this.units.length===0) return false;
    for(unit of this.units){
        if(!unit.isReadyToFight()){
            return false;
        }
    }
    return true; 
}
Army.prototype.restore = function(){
    for(unit of this.units){
        unit.restore();
    }
}
Army.prototype.getReadyToMoveUnits = function(distance){
    const readyUnits=[];
    for(unit of this.units){
        if(unit.isReadyToMove(distance)){
            readyUnits.push(unit);
        }
    }
    return readyUnits;
}
Army.prototype.combineUnits = function(newUnits){
    for(unit of newUnits){
        this.units.push(unit);
    }
}
Army.prototype.cloneUnit = function(index){
    if(this.units.length>index) return this.units[index].clone();
}

function Animal(sex) {
    this.sex = sex;
}

Animal.prototype.run = function(){
    console.log(`${this.name} is running`);
}

Animal.prototype.run = function(){
    console.log(`${this.name} is running`);
}

const animal = {
    name: "Animal",
    sex: "male",
    run: function(){
        console.log(`${this.name} is running`);
    },
    jump: function(){
        console.log(`${this.name} is jumping`);
    }
}

const mammal = {
    name: "Mammal",
    __proto__: animal,
    givesMilk: function(){
        if(this.sex==="female"){
            console.log(`This ${this.name} can give milk`);
        } else {
            console.log(`This ${this.name} cannot give milk`);
        }
    }
}

const predator ={
    name: "Predator",
    __proto__: mammal,
    hunt: function(){
        console.log(`${this.name} is hunting`);
    }
}


const raccoon = {
    name: "Raccoon",
    __proto__: predator,
    steal: function(item){
        console.log(`${this.name} is stealing your ${item}!`);
    }
}

animal.run();
animal.jump();

mammal.run();
mammal.givesMilk();
mammal.sex="female";
mammal.givesMilk();

raccoon.sex="male";
raccoon.givesMilk();
raccoon.jump();
raccoon.hunt()
raccoon.steal("food");
