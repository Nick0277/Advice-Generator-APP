const adviceNumber = document.querySelector(".num");
const quote = document.querySelector(".quote");
const dice = document.querySelector(".dice");
const url = "https://api.adviceslip.com/advice";
let mobileViewport = window.matchMedia("(max-width: 450px)");

if (mobileViewport.matches) {
   let newSvg = document.querySelector(".svgContainer");
   newSvg.outerHTML = `<svg width="295" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z"/><g transform="translate(138)" fill="#CEE3E9"><rect width="6" height="16" rx="3"/><rect x="14" width="6" height="16" rx="3"/></g></g></svg>`;
}

function giveAdvice() {
   fetch(url)
      .then(Response => {
         return Response.json()
      })
      .then(data => {
         const id = data.slip.id;
         const advice = data.slip.advice;
         adviceNumber.innerText = id;
         quote.innerText = `"${advice}"`;
         if (mobileViewport.matches) {
            quote.innerText.length > 90 ? quote.style.fontSize = "20px" : quote.style.fontSize = "25px";
         }
      })
      .catch((error) => {
         console.error('Error:', error);
       });
}
giveAdvice();


let rotate = 0.5;
let delay = true;
dice.addEventListener('click', () => {
   if (delay) {
      delay = false;
      setTimeout(() => {
         delay = true;
      }, 2000);
      giveAdvice();
      quote.classList.add("load");
      dice.style.transform = `rotate(${rotate}turn)`;
      rotate += 0.5;
      setTimeout(() => {
         quote.classList.remove("load");
      }, 500);
   }
});
