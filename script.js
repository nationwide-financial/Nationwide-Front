function onSubmit(event) {
    event.preventDefault()
    var code = document.getElementById("code").value;
    var name = document.getElementById("name").value;
    var number = document.getElementById("number").value;
    var email = document.getElementById("email").value;
    console.log('code', code);
    
    if (code !== "") {
        var url = "https://71lvgmcupd.execute-api.us-east-1.amazonaws.com/users/"
  
        fetch(url + code)
            .then((response) => {
                console.log(response.status)
                if (response.status === 404) {
                    //alert("code is invalied.");
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
        var fname = document.getElementById("name").value;
        var { fistName, middleName, lastName, fullName } = getNames(fname);
        var phone = document.getElementById("number").value;
        var email = document.getElementById("email").value;
        
        //var postid = generateRandomString(5);
        
        
        // if (confirm("Data Saved!")) {
        //         window.location.href = "index.html";
        //     }

        var user = {
            "first_name": fistName,
            "middle_name": middleName,
            "last_name": lastName,
            "combined_name_field": fullName,            
            "user_email": email,
            "user_phone": phone
        }

        // alert(JSON.stringify(user))
        console.log(JSON.stringify(user));

        var url = 'https://71lvgmcupd.execute-api.us-east-1.amazonaws.com/createLeads'
        


        if (url) {
            fetch(url, {
                // Adding method type
                method: 'POST',
                // Adding body or contents to send
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'Access-Control-Allow-Headers': "*",
                    'Access-Control-Allow-Origin': '*'
                },
            })
                .then(res => {
                    if (res.status == 200 || res.status == 201) {
                        window.location.href = "index.html";
                        //alert("Record Saved Check Your Email!.");
                    }
                    console.log(res);
                }

                )

        }
    }
  
    
}

function generateRandomString(length) {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var result = "";
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
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

