function onSubmit() {
    var code = document.getElementById("code").value;
    var name = document.getElementById("name").value;
    var number = document.getElementById("number").value;
    var email = document.getElementById("email").value;
    if (code !== "") {
        fetch('https://els6tc7eroa6blwd2d3pfcprvu0cmjps.lambda-url.us-east-1.on.aws/users/' + code)
            .then((response) => {
                console.log(response.status)
                if (response.status === 404) {
                    alert("Plese enter valid code");
                } else if (response.status === 200) {
                    response.json().then((data) => { 
                        console.log(data) 
                        document.getElementById("name").value = data[0].first_name + " " + data[0].last_name;
                        document.getElementById("number").value = data[0].contactid
                        document.getElementById("email").value = data[0].stdaddr_citynme

                        localStorage.setItem("contactId", data[0].contactid);
                        window.location.href = "form.html";
                    });
                }
            })
    }
}