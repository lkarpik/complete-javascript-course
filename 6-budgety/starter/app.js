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
    };

    const Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const calculateTotal = function (type) {

        data.totals[type] = data.allItems[type].reduce((acc, cur) => {
            return acc + cur.value;
        }, 0);

    }

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
    }

    const calculateBudget = function () {

        // calculate total income and expenses
        calculateTotal(`exp`);
        calculateTotal(`inc`);
        // calculate budget income - expetnses
        data.budget = data.totals.inc - data.totals.exp;

        // calculate percentage
        data.percentage = data.totals.inc > 0 ? Math.round(data.totals.exp / data.totals.inc * 100) : -1;
    }

    const getBudget = function () {
        return {
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.percentage
        }
    }

    return {
        addItem: addItem,
        calculateBudget: calculateBudget,
        getBudget: getBudget
    };


})();


// VIEW
const UIController = (function () {

    const domItems = {
        // btns
        addBtn: document.querySelector(`.add__btn`),
        // inputs
        addType: document.querySelector(`.add__type`),
        addDescription: document.querySelector(`.add__description`),
        addValue: document.querySelector(`.add__value`),
        // content
        incList: document.querySelector(`.income__list`),
        expList: document.querySelector(`.expenses__list`),
    };

    const getInput = function () {
        return {
            type: domItems.addType.value,
            description: domItems.addDescription.value,
            value: parseFloat(domItems.addValue.value)
        };
    };

    const addListItem = function (newItem, type) {
        // Create HTML string
        let html, list;
        if (type === `inc`) {
            html =
                `<div class="item clearfix" id="income-${newItem.id}">
                    <div class="item__description">${newItem.description}</div>
                    <div class="right clearfix">
                        <div class="item__value">${newItem.value}</div>
                        <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>`;
            list = domItems.incList;
        } else if (type === `exp`) {
            html =
                `<div class="item clearfix" id="expense-${newItem.id}">
                    <div class="item__description">${newItem.description}</div>
                    <div class="right clearfix">
                        <div class="item__value">${newItem.value}</div>
                        <div class="item__percentage">21%</div>
                        <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>`;
            list = domItems.expList;
        }

        list.insertAdjacentHTML(`beforeend`, html);

    }

    const clearFields = function () {
        document.querySelectorAll(`input`).forEach(el => el.value = ``);
        domItems.addDescription.focus();
    }


    return {
        domItems: domItems,
        getInput: getInput,
        addListItem: addListItem,
        clearFields: clearFields
    };

})();


// CONTROLLER
const controller = (function (budgetCtrl, UICtrl) {

    const domItems = UIController.domItems;

    const setEventListeners = function () {

        domItems.addBtn.addEventListener(`click`, ctrlAddItem);

        document.addEventListener(`keypress`, (e) => {
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        });
    };

    const updateBudget = function () {
        // 5. Calculate and return the budget 
        budgetCtrl.calculateBudget()

        // 6. Display the budget
        console.log(budgetCtrl.getBudget());

    }

    function ctrlAddItem() {
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

            updateBudget();

        }
    }

    return {
        init: function () {
            console.log(`App has been started!`);
            setEventListeners();
        }
    };

})(budgetController, UIController)

controller.init();