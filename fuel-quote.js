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

const gallons = document.getElementsByName('gallons')[0].value
const clientAddress = `${objUser[0].primary_address} ${objUser[0].secondary_address} ${objUser[0].city} ${objUser[0].state} ${objUser[0].zipcode}`
const marketPrice = 5.00
const totalDue = gallons * marketPrice

document.getElementById('shipping-address').innerHTML = clientAddress
document.getElementById('price').innerHTML = marketPrice

function calcTotal() {
    document.getElementById('total').innerHTML = totalDue
}
