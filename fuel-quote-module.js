const amtInGallons = document.getElementById('gallons')
const deliverDate = document.getElementById('dd')
const error = document.getElementById('error')
const address = document.getElementById('address')
const ppg = document.getElementById('ppg')
const total = document.getElementById('total')
const form = document.getElementById('form')

ppg.innerText = 5
address.innerText = ("1234 cherry lane")

form.addEventListener("submit", (e) => {
    calcTotal = ppg*amtInGallons
    total.innerText = calcTotal
})

document.writeln(`<p>${ppg}</p>`)
