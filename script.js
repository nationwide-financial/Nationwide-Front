function onSubmit() {
    var code = document.getElementById("code").value;
    var name = document.getElementById("name").value;
    var number = document.getElementById("number").value;
    var email = document.getElementById("email").value;
    console.log('code', code);
    var url="https://71lvgmcupd.execute-api.us-east-1.amazonaws.com/users/"
    if (code !== "") {
        fetch(url + code)
            .then((response) => {
                console.log(response.status)
                if (response.status === 404) {
                    alert("code is invalied.");
                    document.getElementById("code").focus()
                } else if (response.status === 200) {
                    response.json().then((data) => {
                        // var { fistName, middleName, lastName, fullName } = getNames(name);
                        localStorage.setItem("data", JSON.stringify(data));
                        // localStorage.setItem("contactId", data[0].contactid);
                        // localStorage.setItem("fistName", data[0].first_name);
                        // localStorage.setItem("middleName", data[0].middle_name);
                        // localStorage.setItem("lastName", data[0].last_name);
                        // localStorage.setItem("fullName", data[0].combined_name_field);
                        // localStorage.setItem("number", number);
                        // localStorage.setItem("email", email);
                        
                        window.location.href = "form.html";
                    });
                }
            })
    } else {
        var { fistName, middleName, lastName, fullName } = getNames(name);
        localStorage.setItem("data", "");
        localStorage.setItem("contactId", code);
        localStorage.setItem("fistName", fistName);
        localStorage.setItem("middleName", middleName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("number", number);
        localStorage.setItem("email", email);
        window.location.href = "form.html";
    }
}

function getNames(fullName) {
    var fistName = "";
    var middleName = "";
    var lastName = "";
    var names = fullName.split(' ');
    console.log(names);
    if (names.length === 1) {
        fistName = names[0];
        middleName = "";
        lastName = "";
    }
    if (names.length === 2) {
        fistName = names[0];
        middleName = "";
        lastName = names[1];
    }
    if (names.length > 2) {
        fistName = names[0];
        middleName = names[1];
        lastName = names[names.length - 1];
    }
    return { fistName, middleName, lastName, fullName };
}