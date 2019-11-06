// const names = [`Luck`, `Marry`, `John`];
// const years = new Array(2000, 2001, 2002);

// console.log(names, years);

// names[0] = `New name`;
// names.push(`Henry`);
// names.shift();
// names.unshift(`Bob`);
// let poped = names.pop()

// /******** CODIN CHALLANE 2 ********/

// const bills = [124, 48, 268];

// const tip = (bill) => {
//     let percenctage = .0
//     if (bill < 50) {
//         percenctage = .2;
//     } else if (bill < 200) {
//         percenctage = .15;
//     } else {
//         percenctage = .10;
//     }
//     return Math.floor(bill * percenctage);
// }
// const tips = bills.map(bill => {
//     return tip(bill);
// });
// const finalPay = bills.map(bill => {
//     return bill + tip(bill);
// });
// console.log(tips, finalPay);

// /* ******** OBJECTS AND PROPERTIES ******** */

// const johny = {
//     name: `John`,
//     lastname: `Borys`,
//     birthYear: 2000,
//     family: [`Marry`, `Alice`],
//     calcAge: function () {
//         this.age = (new Date).getFullYear() - this.birthYear;
//     }

// };
// johny.calcAge();
// console.log(johny);

// johny.birthYear = 1990;

// const jane = new Object();
// jane.body = 'Great!';
// jane.iq = 160;

/* CODING CHALLANGE 4 */

// const John = {
//     name: `John`,
//     mass: 100,
//     height: 1.85,
//     bmi: function () {
//         return this.bmiValue = Math.round(this.mass / this.height ** 2 * 100) / 100;
//     }
// }

// const Mark = new Object();

// Mark.name = `Mark`;
// Mark[`mass`] = 100;
// Mark[`height`] = 1.88;
// Mark.bmi = function () {
//     return this.bmiValue = Math.round(this.mass / this.height ** 2 * 100) / 100;
// };

// let msg = Mark.bmi() > John.bmi() ? `${Mark.name} have ${Mark.bmiValue} BMI` : `${John.name} have ${John.bmiValue}`;

// console.log(msg);

/*****************************
 * CODING CHALLENGE 5
 */

/*
Remember the tip calculator challenge? Let's create a more advanced version using everything we learned!

This time, John and his family went to 5 different restaurants. The bills were $124, $48, $268, $180 and $42.
John likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200, and 10% if the bill is more than $200.

Implement a tip calculator using objects and loops:
1. Create an object with an array for the bill values
2. Add a method to calculate the tip
3. This method should include a loop to iterate over all the paid bills and do the tip calculations
4. As an output, create 1) a new array containing all tips, and 2) an array containing final paid amounts (bill + tip). HINT: Start with two empty arrays [] as properties and then fill them up in the loop.


EXTRA AFTER FINISHING: Mark's family also went on a holiday, going to 4 different restaurants. The bills were $77, $375, $110, and $45.
Mark likes to tip 20% of the bill when the bill is less than $100, 10% when the bill is between $100 and $300, and 25% if the bill is more than $300 (different than John).

5. Implement the same functionality as before, this time using Mark's tipping rules
6. Create a function (not a method) to calculate the average of a given array of tips. HINT: Loop over the array, and in each iteration store the current sum in a variable (starting from 0). After you have the sum of the array, divide it by the number of elements in it (that's how you calculate the average)
7. Calculate the average tip for each family
8. Log to the console which family paid the highest tips on average
*/

const johnsFamily = {
    bills: [124, 48, 268, 180, 42],
    calcTip: function () {
        this.tip = [];
        this.pay = [];
        for (let i = 0; i < this.bills.length; i++) {
            let percentage;
            if (this.bills[i] < 50) {
                percentage = 0.2;
            } else if (this.bills[i] < 200) {
                percentage = 0.15;
            } else {
                percentage = 0.10;
            }
            this.tip.push(percentage * this.bills[i]);
            this.pay.push(this.tip[i] + this.bills[i]);
        };
        return this.tip;
    },
};
const marksFamily = {
    bills: [77, 375, 110, 45],
    calcTip: function () {
        this.tip = [];
        this.pay = [];
        for (let i = 0; i < this.bills.length; i++) {
            let percentage;
            if (this.bills[i] < 100) {
                percentage = 0.2;
            } else if (this.bills[i] < 300) {
                percentage = 0.10;
            } else {
                percentage = 0.25;
            }
            this.tip.push(percentage * this.bills[i]);
            this.pay.push(this.tip[i] + this.bills[i]);
        };
        return this.tip;
    },
};

const averageTip = (tips) => {
    let sum = 0;
    for (let i = 0; i < tips.length; i++) {
        sum += tips[i];
    }
    return sum / tips.length;
};

marksFamily.averageTip = averageTip(marksFamily.calcTip());
johnsFamily.averageTip = averageTip(johnsFamily.calcTip());

let msg = marksFamily.averageTip > johnsFamily.averageTip ? `Marks family paid more on average: ${marksFamily.averageTip} vs ${johnsFamily.averageTip}` : `Johns Family paid more on average: ${johnsFamily.averageTip} vs ${marksFamily.averageTip}`;

console.log(msg);