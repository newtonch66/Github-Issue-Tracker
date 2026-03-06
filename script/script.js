document.getElementById("sign-btn").addEventListener("click", function () {
    // console.log("sign In")
    const userNameInput = document.getElementById("username-input")
    const UserName = userNameInput.value;
    console.log(UserName);

    const passwordInput = document.getElementById("password-input")
    const pass = passwordInput.value;
    console.log(pass);

    if (UserName == "admin" && (pass == "admin123")) {
        alert("LOGIN SUCCESS")
        window.location.assign("./home.html")
    } else {
        alert("LOGIN FAIL")
        return;
    }
});