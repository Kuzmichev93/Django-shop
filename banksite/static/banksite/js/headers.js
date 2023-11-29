
function header_right(){
let label=document.querySelectorAll(".label");
let button_text=document.querySelectorAll(".button-text");
let button_name=document.querySelectorAll(".button-name a");
   for(let k=0;k<label.length;k++){
       label[k].addEventListener("mouseover",function(){
       button_text[k].style.opacity="1";
       })

       label[k].addEventListener("mouseout",function(){
              button_text[k].style.opacity="0.5"})

       button_text[k].addEventListener("mouseover",function(){
          button_text[k].style.opacity="1"})

       button_text[k].addEventListener("mouseout",function(){
                 button_text[k].style.opacity="0.5"})

       label[k].addEventListener("click",function(){
             if(button_name[k].name!="enter"){
              window.location.href=button_name[k].href}
              })

       }

}

header_right()

function name_site(){
   let name_container=document.querySelector(".name-container");
   name_container.addEventListener("click", function(){
   let a=document.querySelector(".name-container a");
   location.href=a.href;

   })
}
name_site();

function get_session(){
//let session=document.querySelector("ff");
try {
//const value = JSON.parse(document.getElementById('hello-data').textContent);
 if (Object.keys(session).length>0){

     let value_sesson=document.querySelector(".button-basket-value");
     let sum_basket_value=document.querySelector(".sum-basket-value");
     sum_basket_value.innerText=Object.keys(session).length;

     value_sesson.style.display="flex";



     }}
 catch(err){
 };


    //for(let k=0;k<session.value.length;k++){
    //console.log(session.value[k])};

};

get_session();