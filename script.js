window.onbeforeunload = function () {
  document.getElementById("code").value = "";
  document.getElementById("fname").value = "";
  document.getElementById("number").value = "";
  document.getElementById("email").value = "";

  // const test1 = document.getElementsByClassName("area-lang-es");
  // test1.style.display = "none";
};

// function onPageLoad() {
//   document.getElementById("card-sucess").style.display = "block";

//   const test = document.getElementsByClassName("area-lang-es");
//   test.style.display = "none";
// }

function onSubmit(event) {
  event.preventDefault();
  var code = document.getElementById("code").value;
  var name = document.getElementById("fname").value;
  var number = document.getElementById("number").value;
  var email = document.getElementById("email").value;
  console.log("code", code);

  if (code !== "") {
    var url = "https://71lvgmcupd.execute-api.us-east-1.amazonaws.com/users/";

    fetch(url + code).then((response) => {
      console.log(response.status);
      if (response.status === 404) {
        var errorElement = document.getElementById("card-errors3");
        errorElement.textContent = "Invalid Code";
        errorElement.style.display = "block";
        document.getElementById("code").focus();
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
    });
  } else {
    var fname = document.getElementById("fname").value;
    var { fistName, middleName, lastName, fullName } = getNames(fname);
    var phone = document.getElementById("number").value;
    var email = document.getElementById("email").value;

    //var postid = generateRandomString(5);
    if (email == "") {
      var errorElement = document.getElementById("card-errors");
      errorElement.textContent = "email is required*";
      errorElement.style.display = "block";
      return;
    } /* if(phone == ""){
                { 
            var errorElement = document.getElementById("card-errors1");
              errorElement.textContent = "required*";
              errorElement.style.display = "block";
              return }
              }else if(fullName == ""){
                { 
            var errorElement = document.getElementById("card-errors2");
              errorElement.textContent = "required*";
              errorElement.style.display = "block";
              return (false)}
              }else */

    // if (confirm("Data Saved!")) {
    //         window.location.href = "index.html";
    //     }
    else
      var user = {
        first_name: fistName,
        middle_name: middleName,
        last_name: lastName,
        combined_name_field: fullName,
        user_email: email,
        user_phone: phone,
      };

    // alert(JSON.stringify(user))
    //console.log(JSON.stringify(user));

    var url =
      "https://71lvgmcupd.execute-api.us-east-1.amazonaws.com/createLeads";

    if (url) {
      fetch(url, {
        // Adding method type
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
        },
      })
        // .then(res => {
        //     if (res.status === 201) {
        //         localStorage.setItem("user", JSON.stringify(res.result));
        //         window.location.href = "form.html";
        //     } else if (res.status === 200) {
        //         window.location.href = "form.html";
        //     }
        //     console.log("whats inside res>>>", res);
        // }

        // )
        .then((res) => {
          if (res.status === 201) {
            return res.json();
          } else if (res.status === 200) {
            window.location.href = "form.html";
          }
        })
        .then((data) => {
          localStorage.setItem("userDataNew", JSON.stringify(data));
          //console.log("This saved in>>", data)
          setTimeout(() => {
            const box = document.getElementById("form-submit-after");

            // 👇️ removes element from DOM
            box.style.display = "block";
            const dissapermesg = document.getElementById(
              "form-submit-getstatred"
            );
            dissapermesg.style.display = "none";
            const myTimeout = setTimeout(msgDisplay, 4000);
            // 👇️ hides element (still takes up space on page)
            // box.style.visibility = 'hidden';
          }, 5000); // 👈️ time in milliseconds
          //window.location.href = "index.html";
        });
    }
  }
}

function msgDisplay() {
  const disbox = document.getElementById("form-submit-after");
  disbox.style.display = "none";

  //Form Area
  const dissapermesgshow = document.getElementById("form-submit-getstatred");
  dissapermesgshow.style.display = "block";
  const mailerromsg = document.getElementById("card-errors");
  mailerromsg.style.display = "none";
  document.getElementById("code").value = "";
  document.getElementById("fname").value = "";
  document.getElementById("number").value = "";
  document.getElementById("email").value = "";
}

function generateRandomString(length) {
  var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function getNames(fullName) {
  var fistName = "";
  var middleName = "";
  var lastName = "";
  var names = fullName.split(" ");
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

function showMe() {
  console.log("test");
}
