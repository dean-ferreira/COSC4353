var objUser = [
    {
        username: "test-user01",
        password: "password25",
        fullName: "Test User01",
        primary_address: "4800 Calhoun Rd",
        secondary_address: "",
        city: "Houston",
        state: "TX",
        zipcode: "77004"
    },
    {
        username: "test-user02",
        password: "password88",
        fullName: "Test User02",
        primary_address: "9001 Kirby Dr",
        secondary_address: "",
        city: "Houston",
        state: "TX",
        zipcode: "77054"
    }
]

const clientAddress = `${objUser[0].primary_address} ${objUser[0].secondary_address} ${objUser[0].city} ${objUser[0].state} ${objUser[0].zipcode}`
const marketPrice = 4.15

document.getElementById('shipping-address').innerHTML = clientAddress
document.getElementById('price').innerHTML = marketPrice

function calcTotal() {
    const gallons = document.getElementsByName('gallons')[0].value
    if (gallons == null || gallons == '') {
        alert("Please enter the amount in Gallons")
        return
    }
    const totalDue = gallons * marketPrice
    document.getElementById('total').innerHTML = totalDue
}

var objOrder = [
    {
        amountInGallons: 15,
        shippingAddress: clientAddress,
        deliveryDate: '2022-03-12',
        marketPrice: 3.90,
    },
    {
        amountInGallons: 10,
        shippingAddress: clientAddress,
        deliveryDate: '2022-03-01',
        marketPrice: 3.24,
    },
    {
        amountInGallons: 20,
        shippingAddress: clientAddress,
        deliveryDate: '2022-02-22',
        marketPrice: 2.50,
    },
]

const orderHistoryTable = document.getElementById('orderHistory')

for (var i = 0; i < objOrder.length; i++) {
    var keyCounter = 0
    row = orderHistoryTable.insertRow(i)
    for (var key in objOrder[i]) {
        var cell = row.insertCell(keyCounter)
        cell.innerHTML = objOrder[i][key]
        keyCounter += 1
    }
    cell = row.insertCell(keyCounter)
    cell.innerHTML = (objOrder[i].amountInGallons * objOrder[i].marketPrice).toFixed(2)
}

function placeOrder() {

    var newGallons = parseInt(document.getElementById('gallons').value)
    var newAddress = clientAddress
    var newDeliveryDate = String(document.getElementById('delivery-date').value)
    var newMarketPrice = parseInt(marketPrice)
    var newTotal = (newGallons * newMarketPrice).toFixed(2)

   if (isNaN(newGallons)) {
        alert("Please enter the amount in Gallons")
       return
   }
   if (newDeliveryDate === null || newDeliveryDate === '') {
    alert("Please enter a delivery date.")
       return
   }
    var newOrder = {
        amountInGallons: newGallons,
        shippingAddress: newAddress,
        deliveryDate: newDeliveryDate,
        marketPrice: newMarketPrice,
    }
    objOrder.push(newOrder)
    console.log(objOrder)

    var keyCounter = 0
    row = orderHistoryTable.insertRow(0)
    for (var key in objOrder[objOrder.length - 1]) {
        var cell = row.insertCell(keyCounter)
        cell.innerHTML = objOrder[i][key]
        keyCounter += 1
    }
    cell = row.insertCell(keyCounter)
    cell.innerHTML = newTotal
}
