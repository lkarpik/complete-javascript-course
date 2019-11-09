// MODEL
const budgetController = (function () {

    const data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    const Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function (totalIncome) {

        if (totalIncome > 0) {

            this.percentage = Math.round(this.value / totalIncome * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    }

    const Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const calculateTotal = function (type) {

        data.totals[type] = data.allItems[type].reduce((acc, cur) => {
            return acc + cur.value;
        }, 0);

    };

    const addItem = function (type, des, val) {

        let ID, newItem;

        // create new ID
        if (data.allItems[type].length > 0) {
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        } else {
            ID = 0;
        }

        // Create new item based on type
        if (type === `exp`) {
            newItem = new Expense(ID, des, val);
        } else if (type === `inc`) {
            newItem = new Income(ID, des, val)
        }

        // Push item into data structure
        data.allItems[type].push(newItem);

        // Return new element
        return newItem;
    };

    const deleteItem = function (type, ID) {

        let ids, index;

        ids = data.allItems[type].map(el => {
            return el.id;
        });

        index = ids.indexOf(ID);

        if (index !== -1) {
            data.allItems[type].splice(index, 1);
        }

    };

    const calculateBudget = function () {

        // calculate total income and expenses
        calculateTotal(`exp`);
        calculateTotal(`inc`);
        // calculate budget income - expetnses
        data.budget = data.totals.inc - data.totals.exp;

        // calculate percentage
        data.percentage = data.totals.inc > 0 ? Math.round(data.totals.exp / data.totals.inc * 100) : -1;
    };

    const calculatePercentage = function () {

        data.allItems.exp.forEach(el => {
            el.calcPercentage(data.totals.inc);
        });
    };

    const getPercentages = function () {
        const allPercentages = data.allItems.exp.map(el => {
            return el.percentage;
        });
        return allPercentages;
    };

    const getBudget = function () {
        return {
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.percentage,
        }
    };

    return {
        addItem: addItem,
        calculateBudget: calculateBudget,
        getBudget: getBudget,
        deleteItem: deleteItem,
        calculatePercentage: calculatePercentage,
        getPercentages: getPercentages,
        data: data
    };


})();


// VIEW
const UIController = (function () {

    const getDomItems = function () {

        return {
            // btns
            addBtn: document.querySelector(`.add__btn`),
            // inputs
            addType: document.querySelector(`.add__type`),
            addDescription: document.querySelector(`.add__description`),
            addValue: document.querySelector(`.add__value`),
            allInputs: document.querySelectorAll(`input, select`),
            // content
            incList: document.querySelector(`.income__list`),
            expList: document.querySelector(`.expenses__list`),
            budgetValue: document.querySelector(`.budget__value`),
            budgetIncome: document.querySelector(`.budget__income--value`),
            budgetExpences: document.querySelector(`.budget__expenses--value`),
            budgetPercentage: document.querySelector(`.budget__expenses--percentage`),
            eventContainer: document.querySelector(`.container`),
            expencePercents: document.querySelectorAll(`.item__percentage`),
            month: document.querySelector(`.budget__title--month`)
        }
    };

    const getInput = function () {

        return {
            type: getDomItems().addType.value,
            description: getDomItems().addDescription.value,
            value: parseFloat(getDomItems().addValue.value)
        };

    };

    const addListItem = function (newItem, type) {
        // Create HTML string
        let html, list;

        if (type === `inc`) {
            html =
                `<div class="item clearfix" id="inc-${newItem.id}">
                    <div class="item__description">${newItem.description}</div>
                    <div class="right clearfix">
                        <div class="item__value">${formatNumber(newItem.value)}</div>
                        <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>`;
            list = getDomItems().incList;
        } else if (type === `exp`) {
            html =
                `<div class="item clearfix" id="exp-${newItem.id}">
                    <div class="item__description">${newItem.description}</div>
                    <div class="right clearfix">
                        <div class="item__value">${formatNumber(newItem.value)}</div>
                        <div class="item__percentage">21%</div>
                        <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>`;
            list = getDomItems().expList;
        }

        list.insertAdjacentHTML(`beforeend`, html);

    };

    const deleteListItem = function (type, id) {
        console.log(type, id);
        getDomItems().eventContainer.querySelector(`#${type}-${id}`).remove();
    };

    const clearFields = function () {

        document.querySelectorAll(`input`).forEach(el => el.value = ``);
        getDomItems().addDescription.focus();

    };

    const displayBudget = function (obj) {

        getDomItems().budgetValue.textContent = formatNumber(obj.budget, obj.budget > 0 ? `inc` : `exp`);
        getDomItems().budgetIncome.textContent = formatNumber(obj.totalInc, `inc`);
        getDomItems().budgetExpences.textContent = formatNumber(obj.totalExp, `exp`);
        getDomItems().budgetPercentage.textContent = obj.percentage > 0 ? obj.percentage + `%` : `--`;

    };

    const displayPercetages = function (allPercentages) {

        getDomItems().expencePercents.forEach((el, index) => {
            el.textContent = allPercentages[index] > 0 ? allPercentages[index] + `%` : `--`;
        });

        // With callbacks

        // let nodeFields = getDomItems().expencePercents;

        // function foreachField(nodeFields, callback) {
        //     for (let i = 0; i < nodeFields.length; i++) {
        //         callback(nodeFields[i], i);
        //     }
        // };

        // function callbackPercentage(curr, index) {
        //     curr.textContent = allPercentages[index]
        // };

        // foreachField(nodeFields, callbackPercentage);

    };

    const formatNumber = function (num, type) {
        num = Math.abs(num);
        // num = num.toFixed(2);
        num = num.toLocaleString(`pl`, {
            useGrouping: 'true',
            minimumFractionDigits: "2",
            maximumFractionDigits: "2",
            // style: "currency",
            // currency: "PLN"
        });
        let sign = type === `exp` ? `-` : `+`;
        return `${sign} ${num}`;
    }

    const displayMonth = function () {
        let now = new Date;

        let month = now.toLocaleDateString(`en`, {
            month: `long`
        });
        getDomItems().month.textContent = month;
    };

    const changeType = function () {
        // # Check checked type
        // let typeSelected = this.options[this.selectedIndex].value;

        // if (typeSelected === `exp`) {
        //     getDomItems().allInputs.forEach(input => {
        //         input.classList.add(`red-focus`);
        //     });
        //     getDomItems().addBtn.classList.add(`red`);
        // } else {
        //     getDomItems().allInputs.forEach(input => {
        //         input.classList.remove(`red-focus`);
        //     });
        //     getDomItems().addBtn.classList.remove(`red`);
        // }

        // Only toggle - no checking input value
        getDomItems().allInputs.forEach(input => {
            input.classList.toggle(`red-focus`);
        });
        getDomItems().addBtn.classList.toggle(`red`);
    };

    return {

        domItems: getDomItems,
        getInput: getInput,
        addListItem: addListItem,
        clearFields: clearFields,
        displayBudget: displayBudget,
        deleteListItem: deleteListItem,
        displayPercetages: displayPercetages,
        formatNumber: formatNumber,
        displayMonth: displayMonth,
        changeType: changeType

    };

})();


// CONTROLLER
const controller = (function (budgetCtrl, UICtrl) {

    const domItems = UIController.domItems;

    // Event Listeners
    const setEventListeners = function () {

        domItems().addBtn.addEventListener(`click`, ctrlAddItem);

        document.addEventListener(`keypress`, (e) => {
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        });

        domItems().eventContainer.addEventListener(`click`, ctrlDeleteItem)

        domItems().addType.addEventListener(`change`, UICtrl.changeType)

    };

    // Update and display data
    const updateBudget = function () {

        // 5. Calculate and return the budget 
        budgetCtrl.calculateBudget()
        // 6. Display the budget
        UICtrl.displayBudget(budgetCtrl.getBudget());

    }

    const updatePercentage = function () {

        // Calc percentage
        budgetCtrl.calculatePercentage();
        // Read percentages from budget ctrl
        UICtrl.displayPercetages(budgetCtrl.getPercentages());
        // Update UI
    }

    // Add new item 
    const ctrlAddItem = function () {

        // 1. Get the input
        const input = UICtrl.getInput();
        // Data validation
        if (input.description !== `` && !isNaN(input.value) && input.value > 0) {
            // 2. Add new item to budget ctrl
            const newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            // 3. Add item to the UI 
            UICtrl.addListItem(newItem, input.type);
            // 4. Clear the fields
            UICtrl.clearFields();
            // 5. Update and show updated budget
            updateBudget();
            // 6. Calc and update percentages
            updatePercentage();
        }
    };

    // Delete item
    const ctrlDeleteItem = function (e) {

        if (e.target.parentNode.className === `item__delete--btn`) {

            // Method #1
            // let itemID;
            // e.path.forEach(node => {
            //     if (node.id && (node.id.split(` - `)[0] === `
            // inc ` || node.id.split(` - `)[0] === `
            // exp ` ) {
            //         itemID = node.id;
            //     }
            // });

            // Method #2 
            // let itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;

            // Method #3
            let itemID = e.target.closest(`.item`).id;
            let type = itemID.split(`-`)[0];
            let ID = parseInt(itemID.split(`-`)[1]);

            // 1. Delete item from data
            budgetCtrl.deleteItem(type, ID);
            // 2. Delete from UI
            UICtrl.deleteListItem(type, ID);
            // 3. Update budget
            updateBudget();
            // 4. Update percentage
            updatePercentage();

        }
    };

    return {
        init: function () {
            console.log(`App has been started!`);
            setEventListeners();
            UICtrl.displayBudget(budgetCtrl.getBudget());
            UICtrl.displayMonth();
        }
    };

})(budgetController, UIController)

controller.init();