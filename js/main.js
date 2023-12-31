var signupName = document.getElementById('signUpName')
var signupEmail = document.getElementById('signUpEmail')
var signupPassword = document.getElementById('signUpPassword')
var signinEmail = document.getElementById('signinEmail')
var signinPassword = document.getElementById('signinPassword')

var pathparts = location.pathname.split('/');
var baseURL = ''   //C:/Users/trust/Documents/assignments/login%20system
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]
}
console.log(baseURL);

var username = localStorage.getItem('sessionUsername')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}

var signUpArray = []
if (localStorage.getItem('users') == null) {
    signUpArray = []
} else {
    signUpArray = JSON.parse(localStorage.getItem('users'))
}



function isEmpty() {

    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false ;
    } else {
        return true ;
    }
}

function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false
        }
    }
}

function signUp() {
    if (isEmpty() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    // to store all value as object
    var signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    }
    if (signUpArray.length == 0) {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
        return true
    }
    if (isEmailExist() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'

    } else {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'

    }


}




function isLoginEmpty() {

    if (signinPassword.value == "" || signinEmail.value == "") {
        return false
    } else {
        return true
    }
}

function login(){
    if (isLoginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var password = signinPassword.value
    var email = signinEmail.value

    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('sessionUsername', signUpArray[i].name)
            if (baseURL == '/') {
                location.replace('https://' + location.hostname + '/welcomesigin.html')
                

            } else { 
                location.replace(baseURL + '/welcomesigin.html')

            }
        } else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }

}
function logout() {
    localStorage.removeItem('sessionUsername')
}