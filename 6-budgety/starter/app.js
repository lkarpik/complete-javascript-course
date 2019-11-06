// MODEL
const budgetController = (function () {

})();


// VIEW
const UIController = (function () {

    const domItems = {
        addBtn: document.querySelector(`.add__btn`),
        addType: document.querySelector(`.add__type`),
        addDescription: document.querySelector(`.add__description`),
        addValue: document.querySelector(`.add__value`),
    }

    const getInput = function () {
        return {
            type: domItems.addType.value,
            description: domItems.addDescription.value,
            value: parseInt(domItems.addValue.value)
        }
    }


    return {
        domItems: domItems,
        getInput: getInput
    }

})();


// CONTROLLER
const controller = (function (budgetCtrl, UICtrl) {

    function ctrlAddItem() {
        console.log(UICtrl.getInput())
    }

    UICtrl.domItems.addBtn.addEventListener(`click`, ctrlAddItem)

    document.addEventListener(`keypress`, (e) => {
        if (e.keyCode === 13 || e.which === 13) {
            ctrlAddItem();
        }
    })

})(budgetController, UIController)