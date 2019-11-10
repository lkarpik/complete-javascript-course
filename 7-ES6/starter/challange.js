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



class TownElements {

    constructor(name, buildYear) {

        this.name = name;
        this.buildYear = buildYear;

    }
    getAge() {

        return (new Date).getFullYear() - this.buildYear;

    }
};

class Parks extends TownElements {

    constructor(name, buildYear, area, treesNum) {

        super(name, buildYear);
        this.area = area;
        this.treesNum = treesNum;

    }

    getTreeDens() {

        return this.treesNum / this.area;

    }
};

class Streets extends TownElements {

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
    new Streets(`Street1`, 2012, 1000),
    new Streets(`Street2`, 2010, 150),
    new Streets(`Street3`, 2012),
    new Streets(`Street3`, 2016, 200)
];

const allParks = [
    new Parks(`Park1`, 1878, 3000, 10000),
    new Parks(`Park1`, 1955, 300, 100),
    new Parks(`Park1`, 1867, 1300, 1000),
];

function raport(p) {
    /*     
    1. Tree density of each park in the town (forumla: number of trees/park area)
    2. Average age of each town's park (forumla: sum of all ages/number of parks)
    3. The name of the park that has more than 1000 trees
    4. Total and average length of the town's streets
    5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal 
    */
    console.log(`===============`);
    console.log(`Parks report`);
    console.log(`===============`);



    console.log(`==============`);
    console.log(`END`);
    console.log(`==============`);

}

raport(allParks);