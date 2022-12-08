//Once the page loads execute these commands.
window.addEventListener("load", () => {
  //After the page loads, fetch the initial user info.
  async function loadInitialInfo() {
    var resp = await fetch('/account/user_info');
    var userData = await resp.json();
    //populate the page with the response body.
    document.querySelector("#fullName").value = userData.fullName;
    document.querySelector("#gender").value = userData.gender;
    document.querySelector("#birthday").value = userData.birthday;
    document.querySelector("#emailUser").value = userData.email;
    //hide the loader.
    document.querySelector(".loader").classList.add("loader--hidden");
  }
  loadInitialInfo();
});


//Handling function for the save button
function saveButton(){
  //Check if the form is valid then continue.
  if(document.querySelector('form').checkValidity()){
    event.preventDefault();
  //Sending the updated personal info to our server
  async function updateUserInfo() {
    var resp = await fetch('/account/user_info',
                               {method: "POST",
                               headers: {"accept": "application/json",
                                        "content-type": "application/json"},
                               body: JSON.stringify({fullName: document.querySelector("#fullName").value,
                                                    gender: document.querySelector("#gender").value,
                                                    birthday: document.querySelector("#birthday").value,
                                                    emailUser: document.querySelector("#emailUser").value})
                               });
    await resp.json();
    window.location.reload();
  }
  updateUserInfo();
}
}


// -----------------Ripple Effect--------------------------- //
const buttons = document.querySelectorAll('.ripple')
buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const x = e.pageX
        const y = e.pageY

        const buttonTop = e.target.offsetTop
        const buttonLeft = e.target.offsetLeft

        const xInside = x - buttonLeft
        const yInside = y - buttonTop

        const circle = document.createElement('span')
        circle.classList.add('circle')
        circle.style.top = yInside + 'px'
        circle.style.left = xInside + 'px'

        this.appendChild(circle)

        setTimeout(() => circle.remove(), 500)
    })
})
