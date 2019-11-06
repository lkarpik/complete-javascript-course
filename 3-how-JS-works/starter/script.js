///////////////////////////////////////
// Lecture: Hoisting

getAge(1982);

function getAge(year) {
    console.log(2019 - year);
}


const yearsLeft = function (year) {
    console.log(65 - (2019 - year));
    console.log(this);
}

yearsLeft(1982);

// let age = 18;

// function testAge() {
//     // console.log(age);
//     let age = 33;
//     console.log(age);
// }
// testAge();
// console.log(age);













///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword

const john = {
    name: `John`,
    age: 1987,
    getAge: function () {
        return 2019 - this.age
    }
}

const mike = {
    name: `Mike`,
    age: 1999,
}
mike.getAge = john.getAge;