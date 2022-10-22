
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
class myPlayer{
    constructor(){
        this.position ={
            x:canvas.width/2,
            y:500,
        }
 
       this.width=50;
        this.height=50
        }
    
        draw(){
    ctx.fillStyle="green ";
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
        }
    update(){  
        this.draw() 
 
    
    }
    
    
    }

const player = new myPlayer();
  const keys ={
right:{
    pressed:false
},
left:{
    pressed:false
},
up:{
    pressed:false
},
down:{
    pressed:false
}

  }

function animation(){
    requestAnimationFrame(animation)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  
    player.update(); 
    if(keys.left.pressed){
 player.position.x= player.position.x-5;

  } if(keys.up.pressed){
   
 
player.position.y= player.position.y-5;
  } if(keys.down.pressed){
    player.position.y= player.position.y+5;

  
  } if(keys.right.pressed){
    player.position.x =  player.position.x+5;
 
  }

}
animation();
addEventListener('keydown',({keyCode}) =>{
    switch(keyCode){
    case 65:    
    keys.left.pressed=true
    break
    case 68 :   
    keys.right.pressed=true
    break
    case 87:    
   keys.up.pressed = true
    break
    case 83:
    keys.down.pressed=true
    
    
   } })
  
