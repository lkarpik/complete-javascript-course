/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

class TownElement {

    constructor(name, buildYear) {

        this.name = name;
        this.buildYear = buildYear;

    }

    getAge() {

        return (new Date).getFullYear() - this.buildYear;

    }
};

class Park extends TownElement {

    constructor(name, buildYear, area, treesNum) {

        super(name, buildYear);
        this.area = area;
        this.treesNum = treesNum;

    }

    getTreeDens() {

        return this.treesNum / this.area;

    }
};

class Street extends TownElement {

    constructor(name, buildYear, length = 250) {

        super(name, buildYear);
        this.length = length;

    }

    getSizeClass() {

        const sizeClases = new Map();

        sizeClases.set(`tiny`, 0);
        sizeClases.set(`small`, 100);
        sizeClases.set(`normal`, 200);
        sizeClases.set(`big`, 300);

        let sizeClass;

        sizeClases.forEach((value, key) => {

            if (this.length >= value) {
                sizeClass = key;
            }

        });

        return sizeClass ? sizeClass : sizeClass = `normal`;

    }
};

const allStreets = [
    new Street(`Street1`, 2012, 1000),
    new Street(`Street2`, 2010, 150),
    new Street(`Street3`, 2012),
    new Street(`Street4`, 2016, 200)
];

const allParks = [
    new Park(`Park1`, 1878, 3000, 10000),
    new Park(`Park2`, 1955, 300, 100),
    new Park(`Park3`, 1867, 1300, 1001),
];

function raport(itemsArray) {

    let nameOfItems = itemsArray[0].constructor.name.toUpperCase();
    /*     
    1. Tree density of each park in the town (forumla: number of trees/park area)
    2. Average age of each town's park (forumla: sum of all ages/number of parks)
    3. The name of the park that has more than 1000 trees
    4. Total and average length of the town's streets
    5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal 
    */
    console.log(`===============`);
    console.log(`${nameOfItems}'S REPORT`);
    console.log(`===============`);


    // Common functions
    const averageAge = () => {

        let msg, sumOfAage;

        sumOfAage = itemsArray.reduce((acc, cur) => {
            return acc + cur.getAge();
        }, 0);

        msg = `Average age of all ${nameOfItems}'s is ${sumOfAage/itemsArray.length}`;

        console.log(msg);

    };
    // Trees functions
    const moreThan = (number) => {

        let moreThan = itemsArray.filter(el => {

            if (`treesNum` in el && el.treesNum > number) {
                return true;
            }

        }).map(el => [el.name, el.treesNum]);

        moreThan.forEach(el => {
            [name, numOfTrees] = el;
            let msg = `There is ${numOfTrees} trees in ${name}`;
            console.log(msg);
        });

    };

    const averageTreeDens = () => {

        itemsArray.forEach(el => {

            if (`getTreeDens` in el) {

                let msg = `In ${el.name} tree density is: ${(el.getTreeDens()).toFixed(2)}`;
                console.log(msg);
            }

        });

    };

    // Streets functions 
    const streetLenghts = () => {

        let lenghts = itemsArray.reduce((acc, cur) => acc + cur.length, 0);
        if (lenghts) {
            console.log(`Total length of streets is ${lenghts} with average of ${lenghts/itemsArray.length} `);
        }

    };

    const sizeClassification = () => {

        itemsArray.forEach(el => {

            if (`getSizeClass` in el) {
                let strClass = el.getSizeClass();
                console.log(`${el.name} is classified to ${strClass}`);
            }

        });

    };

    averageAge();
    averageTreeDens();
    moreThan(1000);
    streetLenghts();
    sizeClassification();

    console.log(`==============`);
    console.log(`END ${nameOfItems} REPORT`);

}

raport(allParks);
raport(allStreets);