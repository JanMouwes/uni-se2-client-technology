function bestelBroodje(name) {
    return new Promise((resolve) => {
        resolve({
            name: name,
            price: null
        });
    });
}

function broodjeKlaarmaken(bestelling) {
    return new Promise((resolve) => setTimeout(() => {
        resolve(bestelling);
    }, 2000));
}

function bestellingAfrekenen(bestelling) {
    return new Promise((resolve, reject) => {
        let price;
        switch (bestelling.name) {
            case "broodje kaas":
                price = 1.80;
                break;
            case "broodje kroket":
                price = 2.50;
                break;
            default:
                reject("broodjestype niet bekend");
        }
        bestelling.price = price;

        resolve(bestelling);
    });
}

Promise.all([
    bestelBroodje("broodje kaas")
        .then(broodjeKlaarmaken)
        .then(bestellingAfrekenen)
        .then(console.log)
        .catch(console.log),
    bestelBroodje("broodje onbekend")
        .then(broodjeKlaarmaken)
        .then(bestellingAfrekenen)
        .then(console.log)
        .catch(console.log),
    bestelBroodje("broodje kroket")
        .then(broodjeKlaarmaken)
        .then(bestellingAfrekenen)
        .then(console.log)
        .catch(console.log)
]);