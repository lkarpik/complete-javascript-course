// arrow funciton with "this" key word

var box = {
    color: `green`,
    position: 1,
    clickMe: function () {
        var self = this;
        document.querySelector(`.green`).addEventListener(`click`, function () {
            var str = `This is box number ${self.position}`;
            console.log(str);
        })
    }
}
box.clickMe();

const box6 = {
    color: `blue`,
    position: 2,
    clickMe: function () {
        document.querySelector(`.blue`).addEventListener(`click`, () => {
            let str = `This is box number ${this.position}`;
            console.log(str);
        });
    }
};
box6.clickMe()

// Cant get this world in this example!
const box66 = {
    color: `orange`,
    position: 3,
    clickMe: () => {
        document.querySelector(`.orange`).addEventListener(`click`, () => {
            let str = `This is box number ${this.position}`;
            console.log(str);
        });
    }
};
box66.clickMe()

// ***********************************

const friends = [`Bob`, `Mike`, `Jane`];

const Person = function (name) {
    this.name = name;
}

// ES5
Person.prototype.myFriends = function (friends) {
    let arr = friends.map(function (el) {
        return `${this.name} is friend with ${el}`
    }.bind(this));
    // console.log(arr);
}

const john = new Person(`John`);

john.myFriends(friends);

// ES6
Person.prototype.myFriends6 = function (friends) {
    let arr = friends.map((el) => `${this.name} is friend with ${el}`);
    // console.log(arr);
}
john.myFriends6(friends);


// Destucturing

// const [name, year] = [`john`, 1999];
// // name = `Bobby`
// console.log(name, year);

const obj = {
    name: `Bobby`,
    year: 1999,
    getAge: function () {
        // console.log(this);
        return 2019 - this.year;
    }
};

const {
    name,
    year,
    getAge
} = obj;
const {
    name: a,
    year: b,
    getAge: c
} = obj;

// console.log(name, year, getAge);
// console.log(a, b, c);

function calcAge(year) {
    const age = 2019 - year;
    return [age, 65 - age];
}

const [age, toRetire] = calcAge(1982);

// console.log(age, toRetire);

// Arrays in ES6

const boxes = document.querySelectorAll(`.box`);

const boxes6 = Array.from(boxes);

Array.from(boxes).forEach(el => el.style.backgroundColor = `steelblue`);

for (let curr of boxes) {
    if (curr.className === `box blue`) {
        continue;
    }
    curr.textContent = `Changed`;
};

// ****************
console.log(friends.findIndex(el => el.length === 4));
console.log(friends.find(el => el.length === 4));

// *************************
// Spread operator

function addFour(a, b, c, d) {
    return a + b + c + d;
}

let sum1 = addFour(1, 2, 3, 4);
console.log(sum1);

const array1 = [1, 2, 3, 8];
const array2 = [11, 22, 33, 88];

let sum2 = addFour.apply(null, array1);

console.log(sum2);

let sum3 = addFour(...array1);

console.log(sum3);

array3 = [...array1, ...array2];
console.log(array3);

// ******************
// Default parameters
// ES5
function PersonSmith(name, birth, lastName, nationality) {

    lastName === undefined ? lastName = `Smith` : lastName;

    nationality === undefined ? nationality = `PL` : nationality;


    this.name = name;
    this.birth = birth;
    this.lastName = lastName;
    this.nationality = nationality;
};

const johnny = new PersonSmith(`John`, 1988, `Borys`, `US`);

console.log(johnny);

// ES6
function PersonDoe(name, birth, lastName = `Doe`, nationality = `Mexican`) {

    this.name = name;
    this.birth = birth;
    this.lastName = lastName;
    this.nationality = nationality;
};

const amigo = new PersonDoe(`Amigo`, `2000`);

// ******************
// Maps

const question = new Map();

question.set(`question`, `First question`);
question.set(1, `First answer`);
question.set(2, `Second answer`);
question.set(3, `Third answer`);

question.forEach((el, key) => console.log(el, key));

for (let [key, value] of question.entries()) {
    console.log(key, value);
    if (typeof key === `number`) {
        console.log(value);
    }
}

// *********************
// Classes

class PersonES6 {
    constructor(name, year, job) {
        this.name = name;
        this.year = year;
        this.job = job;
    }
    // No prototype!!!
    calcAge() {
        return 2019 - this.year;
    }

    static greet() {
        console.log(`Hello`);
    }
}
// static methods are called only from class 
PersonES6.greet();

const mike = new PersonES6(`mike`, 2000, `none`);

class PersonES7 extends PersonES6 {
    constructor() {

    }
}

PersonES7.greet()