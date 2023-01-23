var income, loanamount, loanpurpose = 0;
var address, city, zip, state, socialseq = ""
var socialseq, e, x = "";
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
        let timestamp = data[0].user_dob;
        let currentDate = new Date(timestamp);
        
        let month = currentDate.getMonth() + 1; // getMonth() returns a 0-based index, so we add 1
        let day = currentDate.getDate();
        let year = currentDate.getFullYear();
        let newmonth = month < 10 ?'0'+month:month;
        let newday = day < 10 ?'0'+day:day;

        let formattedDate = `${year}-${newmonth}-${newday}`;
        console.log(formattedDate); // Output: "1-10-2023"

        
        console.log("check date", formattedDate)
        document.getElementById("dob").value = formattedDate;

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

var url="https://71lvgmcupd.execute-api.us-east-1.amazonaws.com/users/"

function getReservationCode() {
    var revCode = document.getElementById("rev-code").value;
    if (revCode !== "") {
        fetch(url + revCode,
            {
                headers: {
                    
                    'Accept': '*/*',
                    'Access-Control-Allow-Headers': "*",
                    'Access-Control-Allow-Origin': '*'
                    
                  },
            }
        
        )
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
    var score = document.getElementById("score").checked;
    if (!score){
        alert("Click the accept button.");
        document.getElementById("score").focus();
        return
    }
    // alert("finished")
    var contactId = document.getElementById("rev-code").value;

    //Step One
    var fname = document.getElementById("fname").value;
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
    var postid = "";
    var fmmethod = "";
    var uurl = "https://#";
    var temprecord = "Null";
    var url = ""

    console.log("test id", contactId)
    if (contactId !== ""){
        postid = contactId;
        fmmethod = "PUT";
        url="https://71lvgmcupd.execute-api.us-east-1.amazonaws.com/users/" + contactId;
        
        

    }else{
        postid = id;
        fmmethod = "POST";
        url="https://71lvgmcupd.execute-api.us-east-1.amazonaws.com/users/";

        if(confirm("Data Saved!")) {
            window.location.href = "index.html";
        }
    }

    var user = {
        "contactid": postid,
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

    regexp = /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/;
  
        if (!regexp.test(socialseq))
          {
            alert("You have entered an invalid social security number!")
            return (false)
          }
        else
         

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

    //var url="https://els6tc7eroa6blwd2d3pfcprvu0cmjps.lambda-url.us-east-1.on.aws/users/"

    

    //var url="https://71lvgmcupd.execute-api.us-east-1.amazonaws.com/users/"

    if (url){
        fetch(url, {
     
            // Adding method type
            method: fmmethod,
            //mode: 'no-cors',
             
            // Adding body or contents to send
            body: JSON.stringify(user),
        
            //credentials: 'include',
             //'Access-Control-Allow-Credentials': true,
            // Adding headers to the request
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Control-Allow-Headers': "*",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': fmmethod
              },
            
        })
         
        // Converting to JSON
        //.then(response => response.json())
         
        // Displaying results to console
        .then(res => 
            {
                if(res.status == 200 || res.status == 201) {
                   window.location.href = "index.html";
                }
                console.log(res);
            }
            
        ) 
        
        }
        
    }

    



function generateRandomString(length) {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var result = "";
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}