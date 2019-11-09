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