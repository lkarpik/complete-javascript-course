const john = {
    name: `John`,
    yearOfBirth: 1980,
    job: `teacher`
}

let Person = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;

}

Person.prototype.calcAge = function () {
    this.age = 2019 - this.yearOfBirth;
}

let mike = new Person(`Mike`, 1999, `Student`);

const Car = function (horseP, color, mass) {
    this.horseP = horseP;
    this.color = color;
    this.mass = mass;
}

Car.prototype.maxSpeed = function () {
    return this.horseP / this.mass * 2000;
}
Car.prototype.changeColor = function (newColor) {
    this.color = newColor;
}

const junkCar = new Car(120, `green`, 1000);
const speedCar = new Car(222, `blue`, 1200);

// Object.create 

const personProto = {
    calcAge: function () {
        console.log(2019 - this.yearOfBirth);
    }
};

const jane = Object.create(personProto)

jane.yearOfBirth = 1982;
jane.name = `Jane`;

const rick = Object.create(personProto, {
    name: {
        value: `Rick`,
        enumerable: true,
        configurable: true,
        writable: true,
    },
    yearOfBirth: {
        value: 2000,
        enumerable: true,
        configurable: true
    }
});

let age = 30

let obj = {
    city: `Warsaw`,
    population: 1000000
}

function change(a, b) {
    a = 20;
    b = `Berlin`;
}

change(age, obj.city);

// first class functions 

let years = [1954, 1982, 1986, 2000];

function arrayCalc(array, fn) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray.push(fn(array[i]));
    }
    return newArray;
}

function calcAge(el) {
    return 2019 - el;
}

function calcRetirement(el) {
    return 65 - (2019 - el);
}


console.log(arrayCalc(years, calcAge));
console.log(arrayCalc(years, calcRetirement));

// function returning antother funciont

function inteview(job) {
    if (job === `teacher`) {
        return function (name) {
            console.log(name);
        }
    } else if (job === `designer`) {
        return function (name) {
            console.log(`${name}, what do You design?`);
        }
    } else {
        return function (name) {
            console.log(`${name}, waht do You do?`);
        }
    }
}

let teacherQ = inteview(`teacher`);
let designerQ = inteview(`designer`);

inteview()(`Yeti`);

// IIFE
(function (name) {
    console.log(`Hello ${name}`);
})(`Bob`);
// CLOSURES

function inteviewClosures(job) {
    return function (name) {
        if (job === `teacher`) {
            console.log(`${name}, what do You teach?`);
        } else {
            console.log(`${name}, what do You do?`);
        }
    }
}
inteviewClosures(`teacher`)(`Bobby`);

// Bind , call , apply
let bleau = {
    name: `John`,
    age: 26,
    job: `teacher`,
    presentation: function (style, timeOfDay) {
        if (style === `formal`) {
            console.log(`Good ${timeOfDay} Ladies and Gentelmans I'm ${this.name} and ${this.age}, I'm a ${this.job}`);
        } else if (style === `friendly`) {
            console.log(`Good ${timeOfDay} friends! I'm ${this.name} and ${this.age}, I'm a ${this.job}`);
        }
    }
}

let emily = {
    name: `Emily`,
    age: 25,
    job: `programmer`
}
bleau.presentation(`formal`, `afternoon`)
bleau.presentation.call(emily, `friendly`, `evening`);
console.log(`array in apply:`);
bleau.presentation.apply(emily, [`formal`, `morning`]);
console.log(`bind`);
let fucnFriendly = bleau.presentation.bind(emily, `friendly`);
fucnFriendly(`night`);
fucnFriendly(`morning`);

let funcFormal = bleau.presentation.bind(emily, `formal`, `morning`);
console.log(`bind 2 param`);
funcFormal();

function arrayCalcBind(array, fn) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray.push(fn(array[i]));
    }
    return newArray;
}

function isFullAge(limit, el) {
    console.log(el);
    return (2019 - el) >= limit;
}

const fullItaly = isFullAge.bind(this, 22);
const italyFull = arrayCalcBind(years, fullItaly);
console.log(italyFull);