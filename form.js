var loanamount, loanpurpose = 0;
//var income, loanamount, loanpurpose = 0;
//var address, city, zip, state, socialseq = ""
//var socialseq, e, x = "";
var dob = 0;

function onPageLoad() {
    var data = localStorage.getItem("data")
    if (localStorage.getItem("data") !== "") {
        data = JSON.parse(localStorage.getItem("data"));
    }
    if (data !== "") {
        //step One
        document.getElementById("rev-code").value = data[0].contactid;
        document.getElementById("fname").value = data[0].first_name;
        document.getElementById("lname").value = data[0].last_name;
        document.getElementById("email").value = data[0].user_email;
        document.getElementById("phone").value = data[0].user_phone;

        // Step Two
        document.getElementById("income").value = data[0].user_income;
        document.getElementById("form-field-loan").value = data[0].user_loan_amount;
        document.getElementById("form-field-loan_purpose").value = data[0].user_loan_purpose;

        //Step Three
        document.getElementById("address").value = data[0].user_address_one;
        document.getElementById("city").value = data[0].stdaddr_citynme;
        document.getElementById("zip").value = data[0].stdaddr_zipcde;
        document.getElementById("state").value = data[0].stdaddr_statecde;

        //Step Four
        document.getElementById("s-number").value = data[0].user_s_number;
        document.getElementById("dob").value = data[0].user_dob;

    } else {
        //Step One

        var fname = localStorage.getItem("fistName");
        var lname = localStorage.getItem("lastName");
        var middleName = localStorage.getItem("middleName");
        var fullName = localStorage.getItem("fullName");
        var email = localStorage.getItem("email");
        var phone = localStorage.getItem("number");

        //Step One
        document.getElementById("rev-code").value = "";
        document.getElementById("fname").value = fname;
        document.getElementById("lname").value = lname;
        document.getElementById("email").value = email;
        document.getElementById("phone").value = phone;
    }
    //  localStorage.removeItem('data')
}

function getReservationCode() {
    var revCode = document.getElementById("rev-code").value;
    if (revCode !== "") {
        fetch('https://els6tc7eroa6blwd2d3pfcprvu0cmjps.lambda-url.us-east-1.on.aws/users/' + revCode)
            .then((response) => {
                console.log(response.status)
                if (response.status === 404) {
                    alert("code is invalied.");
                    document.getElementById("rev-code").focus()
                } else if (response.status === 200) {
                    response.json().then((data) => {
                        document.getElementById("rev-code").value = data[0].contactid;
                        document.getElementById("fname").value = data[0].first_name;
                        document.getElementById("lname").value = data[0].last_name;
                        document.getElementById("email").value = data[0].user_email;
                        document.getElementById("phone").value = data[0].user_phone;
                    });
                }
            })
    }
}

function onFinished() {
    // alert("finished")
    //Step One
    var fname = document.getElementById("fname").value
    // var fname = localStorage.getItem("fistName");
    var lname = document.getElementById("lname").value;
    //  var middleName = document.getElementById("middleName").value;
    var middleName = localStorage.getItem("middleName") || "";
    var fullName = localStorage.getItem("fullName") || "";
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    //Step Two
    var income = document.getElementById("income").value;
    var e = document.getElementById("form-field-loan");
    var loanamount = e.value;
    var x = document.getElementById("form-field-loan_purpose");
    var loanpurpose = x.value;

    //Step Three
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var zip = document.getElementById("zip").value;
    var state = document.getElementById("state").value;

    //Step four
    var socialseq = document.getElementById("s-number").value;
    var dob = document.getElementById("dob").value;

    var id = generateRandomString(5);
    var uurl = "https://#";
    var temprecord = "";

    var user = {
        "contactid": id,
        "first_name": fname,
        "middle_name": middleName,
        "last_name": lname,
        "combined_name_field": fullName,
        "sec_primary_address": address,
        "primary_address": address + city + zip + state,
        "company": temprecord,
        "urbanization": temprecord,
        "city_state_zip": zip,
        "ase": temprecord,
        "oel": temprecord,
        "presorttrayid": temprecord,
        "presortdate": temprecord,
        "imbno": temprecord,
        "encodedimbno": address,
        "stdaddr_citynme": city,
        "stdaddr_statecde": state,
        "stdaddr_zipcde": zip,
        "qr_code": id,
        "qr_code_url": uurl,
        "user_email": email,
        "user_phone": phone,
        "user_income": income,
        "user_loan_amount": loanamount,
        "user_loan_purpose": loanpurpose,
        "user_address_one": address,
        "user_s_number": socialseq,
        "user_dob": dob,
    }

    // alert(JSON.stringify(user))
    console.log(JSON.stringify(user));

    //  var response = fetch('https://els6tc7eroa6blwd2d3pfcprvu0cmjps.lambda-url.us-east-1.on.aws/users/', {
    //     Method: 'POST',
    //     Headers: {
    //       Accept: 'application.json',
    //       'Content-Type': 'application/json'
    //     },
    //     Body: user,
    //     Cache: 'default'
    //   })

    // fetch('https://els6tc7eroa6blwd2d3pfcprvu0cmjps.lambda-url.us-east-1.on.aws/users', {
    //     Method: 'POST',
    //     Body: JSON.stringify(user)
    // }).then((response) => {
    //     return response.json()
    // }).then(function (data) {
    //     console.log(data)
    // }).catch(error => console.error('Error:', error));

    fetch("https://els6tc7eroa6blwd2d3pfcprvu0cmjps.lambda-url.us-east-1.on.aws/users/", {
     
    // Adding method type
    method: "POST",
    mode: 'no-cors',
    "statusCode": 200,

        
         // Adding headers to the request
   "headers": {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
    // Adding body or contents to send
    "body": JSON.stringify({
        "contactid": "Ss1234",
        "first_name": fname,
        "middle_name": middleName,
        "last_name": lname,
        "combined_name_field": fullName,
        "sec_primary_address": address,
        "primary_address": address + city + zip + state,
        "company": temprecord,
        "urbanization": temprecord,
        "city_state_zip": zip,
        "ase": temprecord,
        "oel": temprecord,
        "presorttrayid": temprecord,
        "presortdate": temprecord,
        "imbno": temprecord,
        "encodedimbno": address,
        "stdaddr_citynme": city,
        "stdaddr_statecde": state,
        "stdaddr_zipcde": zip,
        "qr_code": id,
        "qr_code_url": uurl,
        "user_email": email,
        "user_phone": phone,
        "user_income": income,
        "user_loan_amount": loanamount,
        "user_loan_purpose": loanpurpose,
        "user_address_one": address,
        "user_s_number": socialseq,
        "user_dob": dob,
    }),
             
   "isBase64Encoded": false     
})
 
// Converting to JSON
.then(response => response.json())
 
// Displaying results to console
.then(json => console.log(json));

}

function generateRandomString(length) {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var result = "";
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
