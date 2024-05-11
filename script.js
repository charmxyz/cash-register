document.addEventListener("DOMContentLoaded", function() {
    // Initialize cash in drawer display
    initializeCashDrawer();

    // Attach event listener to the purchase button
    document.getElementById("purchase-btn").addEventListener("click", handlePurchase);
});

function initializeCashDrawer() {
    const cid = [
        ["PENNY", 1.01],
        ["NICKEL", 2.05],
        ["DIME", 3.1],
        ["QUARTER", 4.25],
        ["ONE", 90],
        ["FIVE", 55],
        ["TEN", 20],
        ["TWENTY", 60],
        ["ONE HUNDRED", 100]
    ];
    const cidDisplay = {
        "PENNY": "pennies",
        "NICKEL": "nickels",
        "DIME": "dimes",
        "QUARTER": "quarters",
        "ONE": "ones",
        "FIVE": "fives",
        "TEN": "tens",
        "TWENTY": "twenties",
        "ONE HUNDRED": "hundreds"
    };

    cid.forEach(function(coin) {
        document.getElementById(cidDisplay[coin[0]]).textContent = `$${coin[1].toFixed(2)}`;
    });
}

function handlePurchase() {
    let cash = parseFloat(document.getElementById("cash").value);
    let priceText = document.getElementById("price").textContent;
    let price = parseFloat(priceText.replace('$', ''));

    if (isNaN(cash)) {
        alert("Please enter a valid amount of cash.");
        return;
    }

    let changeDue = cash - price;

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item.");
    } else {
        displayChange(changeDue);
    }
}

function calculateChange(changeDue) {
    const denominations = [
        { name: "ONE HUNDRED", value: 100.00 },
        { name: "TWENTY", value: 20.00 },
        { name: "TEN", value: 10.00 },
        { name: "FIVE", value: 5.00 },
        { name: "ONE", value: 1.00 },
        { name: "QUARTER", value: 0.25 },
        { name: "DIME", value: 0.10 },
        { name: "NICKEL", value: 0.05 },
        { name: "PENNY", value: 0.01 }
    ];

    let remaining = parseFloat(changeDue.toFixed(2));
    let results = {};

    for (let { name, value } of denominations) {
        if (remaining >= value) {
            let count = Math.floor(remaining / value);
            remaining = parseFloat((remaining - count * value).toFixed(2));
            results[name] = count * value;
        }
    }

    return results;
}

function displayChange(changeDue) {
    if (changeDue === 0) {
        document.getElementById("change-due-text").textContent = "No change due - customer paid with exact cash";
    } else {
        let changes = calculateChange(changeDue);
        let displayText = Object.entries(changes)
            .map(([denom, amount]) => `${denom}: $${amount.toFixed(2)}`)
            .join("\r\n");
        document.getElementById("change-due-text").textContent = displayText;
    }
}
