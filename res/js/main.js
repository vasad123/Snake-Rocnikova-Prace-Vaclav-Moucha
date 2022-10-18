
const mybutton = document.getElementById("mybutton");  
const wrapper= document.getElementById("wrapper");
const footer = document.getElementById("footer");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1380
canvas.height = window.innerHeight;


mybutton.onclick= () =>  {
    wrapper.style.display ="none";
    canvas.style.display ="flex";
    footer.style.display ="none";
   
};
