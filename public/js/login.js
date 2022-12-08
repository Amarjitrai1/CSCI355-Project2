/*----------- USING SCROLL REVEAL TO ANIMATE IN ELEMENTS -----------*/
const srev = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 1500,
  //delay: 100,
  // reset: true
})
srev.reveal(`#redeyeLogo`, { origin: 'top', delay:50});
srev.reveal(`.login-container`, { origin: 'bottom' });

function login(){
  //Check if the form is valid then continue.
  if(document.querySelector('form').checkValidity()){
    //Prevent the default action.
    event.preventDefault();
    window.location.replace("/home");
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
