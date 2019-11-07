// MODEL
const budgetController = (function () {

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

    const data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function (type, des, val) {

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

        },
        data: data,
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
    };

    const getInput = function () {
        return {
            type: domItems.addType.value,
            description: domItems.addDescription.value,
            value: parseFloat(domItems.addValue.value)
        };
    };


    return {
        domItems: domItems,
        getInput: getInput
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

    function ctrlAddItem() {
        // 1. Get the input
        const input = UICtrl.getInput();

        // 2. Add new item to budget ctrl
        const newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        // 3. Add item to the UI 

        // 4. 

        // 5. 

    }

    return {
        init: function () {
            console.log(`App has been started!`);
            setEventListeners();
        }
    };

})(budgetController, UIController)

controller.init();