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

document.getElementsByName('fullname')[0].value = `${objUser[0].fullName}`;
document.getElementsByName('address_1')[0].value = `${objUser[0].primary_address}`;
document.getElementsByName('city')[0].value = `${objUser[0].city}`;
document.getElementsByName('state')[0].value = `${objUser[0].state}`;
document.getElementsByName('zipcode')[0].value = `${objUser[0].zipcode}`;

function editProfile() {
    
    var newFullName = document.getElementsByName('fullname')[0].value
    var newPrimaryAddress = document.getElementsByName('address_1')[0].value
    var newSecondaryAddress = document.getElementsByName('address_2')[0].value
    var newCity = document.getElementsByName('city')[0].value 
    var newState = document.getElementsByName('state')[0].value
    var newZipCode = document.getElementsByName('zipcode')[0].value 

    var errors = []
    if (newFullName == null || newFullName == '') {
        errors.push('Full name is required')
    } else if (newPrimaryAddress == null || newPrimaryAddress == '') {
        errors.push('Primary Address is required')
    } else if (newCity == null || newCity == '') {
        errors.push('City is required')
    } else if (newState == null || newState == '') {
        errors.push('State is required')
    } else if (newZipCode == null || newZipCode == '') {
        errors.push('Zipcode is required')
    }
    
    if (errors.length > 0) {
        alert(errors)
        return
    }
    
    objUser[0].fullName = newFullName
    objUser[0].primary_address = newPrimaryAddress
    objUser[0].secondary_address = newSecondaryAddress
    objUser[0].city = newCity
    objUser[0].state = newState
    objUser[0].zipcode =newZipCode

    console.log(objUser)
}

