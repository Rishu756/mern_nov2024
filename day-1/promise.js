function orderFood(item) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.2 
                ? resolve(`${item} order accepted!`)
                : reject(`Sorry, ${item} is unavailable.`);
        }, 500);
    });
}

function prepareFood(item) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`${item} is prepared!`), 1000);
    });
}

function deliverFood(item) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`${item} delivered! Enjoy!`), 700);
    });
}

// Usage
orderFood("Burger")
    .then((status) => {
        console.log(status);
        return prepareFood("Burger");
    })
    .then((status) => {
        console.log(status);
        return deliverFood("Burger");
    })
    .then((status) => console.log(status))
    .catch((error) => console.log(error));
