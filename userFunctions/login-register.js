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

function login() {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    for (var i = 0; i < objUser.length; i++) {
        if (username == objUser[i].username && password == objUser[i].password) {
            alert(username + " is logged in!")
            return
        }
    }
    alert("Incorrect Username or Password.")
}

function registerUser() {
    var registerUsername = document.getElementById("newUsername").value
    var registerPassword = document.getElementById("newPassword").value
    var newUser = {
        username: registerUsername,
        password: registerPassword
    }

    for (var i = 0; i < objUser.length; i++) {
        if (registerUsername == objUser[i].username) {
            alert("Username is already taken.")
            return
        } else if (registerUsername.length < 6) {
            alert("Username must be at least 6 characters.")
            return
        } else if (registerPassword.length < 8) {
            alert("Password must be at least 8 characters.")
            return
        }
    }

    objUser.push(newUser)
    console.log(objUser)
}