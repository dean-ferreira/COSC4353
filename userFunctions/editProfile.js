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
    objUser[0].fullName = document.getElementsByName('fullname')[0].value
    objUser[0].primary_address = document.getElementsByName('address_1')[0].value
    objUser[0].secondary_address = document.getElementsByName('address_2')[0].value
    objUser[0].city = document.getElementsByName('city')[0].value 
    objUser[0].state = document.getElementsByName('state')[0].value
    objUser[0].zipcode = document.getElementsByName('zipcode')[0].value 
    console.log(objUser)
}

