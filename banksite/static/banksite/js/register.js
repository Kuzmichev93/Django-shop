

let inputs=document.querySelectorAll(".user-input");
let user_name=document.querySelectorAll(".user-name");
let user_contact=document.querySelectorAll(".user-contact");
let er=document.querySelectorAll(".user-error")
let button_register=document.querySelector(".button-container");
let ms_error=document.querySelector(".ms-error");
let error_captha = document.querySelector(".error-captcha");
let background_register=document.querySelector(".background-register");



async function set_register_key(){

   url="http://"+hosts+"register/"
   const response = await fetch(url,{
       method: "GET",

   })

   return await response.text();
}


//вход и регистрация
function enter(){
    try{
        let enter_page=document.querySelector(".enter");

        enter_page.addEventListener("click",function(){
             document.body.style.overflowY = "hidden";
             background_register.style.display="block";
             background_register.style.position="absolute";
             background_register.style.zIndex=99;})}
            //window.location.href="//"+main_menu[0]['register']});
    catch (er){console.log(er) }
    let enter_close=document.querySelector(".enter-close div");

    enter_close.addEventListener("click",function(){
            document.body.style.overflow = "";
            background_register.style.display="none";
            background_register.style.position="absolute";
            background_register.style.zIndex=0;
            ms_error.style.display="none";
            set_register_key();
            error_captha.style.display = "none";
            try{
                for(let i=0;i<user_name.length;i++){
                        user_name[i].style.top="auto"
                        inputs[i].value="";
                        user_name[i].style.fontSize="16px"
                        er[i].style.display="none";
                        button_register.style.display="block"}

                }
                catch (er){console.log(er)}
})
//скрыть title в input формы






}


enter();

//let user_name=document.querySelectorAll(".user-name");

function register_features(){

   for(let z=0;z<inputs.length;z++){
      inputs[z].addEventListener("mouseover",function(){

         inputs[z].style.borderBottom="1px solid rgb(255, 0, 255)"
         })
      inputs[z].addEventListener("mouseout",function(){

               inputs[z].style.borderBottom="1px solid #aaa"
               })

      }


   let teg=document.querySelector(".user-osn");
   let tegs_all=teg.querySelectorAll("*");
   tegs_all[0].addEventListener("click",function(event){

   if(event.target.className=="user-input" || event.target.className=="user-name"){
       //event.target.style.top="10px";

       for(let k=0;k<user_name.length;k++){
                if(user_name[k].style.top=="10px" && inputs[k].value!=""){

                    user_name[k].style.top="10px"}
                else{
                     if(user_name[k].style.top=="10px" && inputs[k].value==""){
                     user_name[k].style.top="auto";
                     user_name[k].style.fontSize="16px"}

                    }



       }
       try{
           event.target.previousElementSibling.style.top="10px";
           event.target.previousElementSibling.style.fontSize="14px";
           //event.target.style.top="10px";

       }catch{
           event.target.style.top="10px";
           event.target.style.fontSize="14px";
           }



       }
   else{
        try{
        for(let i=0;i<user_name.length;i++){
            if(user_name[i].style.top=="10px" && inputs[i].value==""){
             user_name[i].style.top="auto";
             user_name[i].style.fontSize="16px"}
             }
       }
       catch (er){console.log(er)}}



   })
}

register_features();



function regular(){

   regular_value=/[("*#@!^%?+-=''():;{}/|._"0-9]/g
   regular_value1=/[(" *#!^%?+=''():;{}/|"]/g
   for(let k=0;k<inputs.length-1;k++){
       inputs[k].addEventListener("keyup",function(){


           if((inputs[k].value.match(regular_value)!=null && inputs[k].name!="email") ||
              inputs[k].value.match(regular_value1)!=null &&inputs[k].name=="email"){

              er[k].style.display="block"
              button_register.style.display="none"}

           else{
                  er[k].style.display="none";
                  for (let i=0;i<er.length;i++){
                                  if(er[i].style.display=="block"){
                                      button_register.style.display="none";
                                      break
                                  }
                                  else{
                                       button_register.style.display="block"}
                             }
                  }

              })
       }
   let enter_regular=document.querySelectorAll(".enter-input");
   let enter_error=document.querySelector(".enter-error");
   let enter_botton_container=document.querySelector(".enter-botton-container");
   for(let i=0;i<enter_regular.length-1;i++){
       enter_regular[i].addEventListener("keyup",function(){
       if(enter_regular[i].name=="login" && enter_regular[i].value.match(regular_value1)!=null){
                enter_error.style.display="block";
                enter_botton_container.style.display='none';}
       else{ enter_error.style.display="none";

             enter_botton_container.style.display='block';
             }
              })

              }
}

regular()

function error_email(){
  if (ms_error.innerText){

      for (let k=0;k<inputs.length;k++){
               if(inputs[k].value!=''){
                  user_name[k].style.top="10px"}
               }

     let background_register=document.querySelector(".background-register");
     let user_general=document.querySelector(".user-osn");
     background_register.style.display="block";
     background_register.style.position="absolute";
     background_register.style.zIndex=1;
     user_general.style.display="flex";


     }
  }

//error_email();


function choice_windows(){
   //переключение между вход и регистрация
   let left=document.querySelector(".user-value-left");
   let right=document.querySelector(".enter-right");

   let user_enter=document.querySelector(".user-enter");
   let user_osn=document.querySelector(".user-osn");

   left.addEventListener("click",function(){
      let left=document.querySelector(".enter-left");
      right.style.opacity="0.4";
      left.style.opacity="1";
      user_enter.style.display="flex";

      user_osn.style.display="none";

      enter_close(user_osn);
      })

   right.addEventListener("click",function(){
         user_enter.style.display="none";
         user_osn.style.display="flex";

         })
   }
choice_windows();

function enter_close(user_osn){
   let close_bottom=document.querySelector(".enter-bottom-close");
   let user_enter=document.querySelector(".user-enter");

   close_bottom.addEventListener("click",function(){

        user_enter.style.display="none";
        background_register.style.display="none";
        // background_register.style.position="absolute";
        // background_register.style.zIndex=0;
        user_osn.style.display="flex";
   })

   }

//свойства окна входа
function enter_features(){
  //проверка полей ввода на наличие данных
  let enter_value=document.querySelectorAll(".enter-value");
  let enter_input=document.querySelectorAll(".enter-input");
  for(let k=0;k<enter_input.length;k++){
      if (enter_input[k].value!=""){
         enter_value[k].style.top="5px";
         enter_value[k].style.fontSize="14px";
         if(enter_input[k].name=="password"){
           enter_input[k].style.webkitTextSecurity="disc"}
      }
      }

  let teg=document.querySelector(".window-enter");
  let tegs_all=teg.querySelectorAll("*");

  tegs_all[0].addEventListener("click", function(event){
    for(let k=0;k<enter_value.length;k++){
               if(enter_value[k].style.top=="5px" && enter_input[k].value==""){
                  enter_value[k].style.top="auto"
                  enter_value[k].style.fontSize="16px"}
               else{
                   if(enter_value[k].style.top=="5px" && enter_input[k].value!=""){
                     enter_value[k].style.fontSize="14px"}
               }}
    if(event.target.className=="enter-input" || event.target.className=="user-name enter-value"){
        try{
            if(event.target.value=="" || event.target.value==undefined){
               try{event.target.previousElementSibling.style.top="5px";
                   event.target.previousElementSibling.style.fontSize="14px";

                  }
               catch{event.target.style.top="5px";
                     event.target.style.fontSize="14px";}
               }
            //else{ }
        }catch (er){console.log(er)}
        }
    })

  }
enter_features();

function regular_enter(){
 let enter_regular=document.querySelectorAll(".enter-input");
    let enter_error=document.querySelector(".enter-error");
    regular_value1=/[(" *#!^%?+=''():;{}/|"]/g
     for(let i=0;i<enter_regular.length;i++){
           enter_regular[i].addEventListener("keyup",function(){
           if(enter_regular[i].name=="login" && enter_regular[i].value.match(regular_value1)!=null){
             enter_error.style.display="block"}
           else{ enter_error.style.display="none";
               // email_enter_er();
                }
           })

           }
}

async function resp_login(label,selector,key){
   const form= new FormData();
   form.append(label,selector[key].value);
   form.append("password",selector[key+1].value);

   url="http://"+hosts+"login/"
   const response = await fetch(url,{
       method: "POST",
       headers:{"X-CSRFToken":TOKEN},
       body:form
   })

   return await response.text();
}



function email_enter_er() {
let enter_input=document.querySelectorAll(".enter-input");
let error_input_value=document.querySelector(".error-input-value");
let hidden_button=document.querySelector(".enter-botton-container button");
let window_enter=document.querySelector(".window-enter");
let tag_all_window=window_enter.querySelector("*");
let error_password=document.querySelector(".error-password");

tag_all_window.addEventListener("click",function(event){
    hidden_button.disabled=false;
    if(event.target.className!="enter-input"){
      if(enter_input[0].value=="" || enter_input[1].value==""){

        error_input_value.innerText="Все поля обязательны к заполнению";
        error_input_value.style.display="block";
        hidden_button.disabled=true;
        }
      else{
           if(event.target.className == "enter-button"){
           error_input_value.style.display="none";
           hidden_button.disabled=true;
           resp_login("email",enter_input,0).then((result)=>{
                          // hidden_button.disabled=false;
                           const parser = new DOMParser();
                           const response=parser.parseFromString(result,'text/html');
                           if(response.querySelector(".error-email").innerText==1
                              && response.querySelector(".error-password").innerText==1){
                           resp_login("login",enter_input,0)
                           //window.location.reload();
                           setTimeout(function(){
                           		location.reload();
                           	}, 2000);}
                           else{
                               if(response.querySelector(".error-email").innerText==1
                                  && response.querySelector(".error-password").innerText==0){

                                   error_password.innerText='Неверный пароль';
                                   error_password.style.display='block';
                                   enter_input[1].addEventListener("mousedown",function(){
                                                            error_password.style.display='none';
                                                       })
                                   }
                               else{
                               let error_email=document.querySelector(".error-email");
                               error_email.innerText='Пользователь с таким email не зарегистрирован';
                               error_email.style.display='block';
                               error_password.style.display='none';
                               enter_input[0].addEventListener("mousedown",function(){
                                    error_email.style.display='none';
                               })}
                           }
                   //hidden_button.click();
                   })
         }}
    }

})



}

email_enter_er();


async function resp_register(selector){
   const form= new FormData();

   form.append("email",selector[2].value);
   url="http://"+hosts+"register/"
   const response = await fetch(url,{
       method: "POST",
       headers:{"X-CSRFToken":TOKEN},
       body:form
   })

   return await response.text();
}




function email_register_er(){
     let user_input = document.querySelectorAll(".user-input");
     let button_reg = document.querySelector(".user-buttom");
     let window_user = document.querySelector(".user");
     let tag_all_user = window_user.querySelector("*");
     let error_value = document.querySelector(".user-error-value");
     let captcha = document.querySelector(".rc-anchor-aria-status");
     let email_er=document.querySelector(".ms-error");


     tag_all_user.addEventListener("click",function(event) {
         button_reg.disabled=false;
         if(event.target.className != 'user-input'){

           if(user_input[0].value == "" ||
              user_input[1].value == "" ||
              user_input[2].value == "" ||
              user_input[3].value == "" )

             { error_value.innerText = "Все поля обязательны к заполнению";
               error_value.style.display = "block";
               error_captha.style.display = "none";
               button_reg.disabled=true;


              }
           else{
                 if(event.target.className == "user-buttom"){
                    error_value.style.display = "none";



                    button_reg.disabled=true;
                    resp_register(user_input).then((result)=>{
                      button_reg.disabled=false;

                      const parser = new DOMParser();
                      const response=parser.parseFromString(result,'text/html');
                      if (response.querySelector(".ms-error").innerText == 1) {
                          email_er.innerText="Пользователь с таким email зарегистрирован";
                          email_er.style.display = "block";

                          //button_reg.disabled=true;

                      }
                      else{//button_reg.disabled=false;

                          let form=document.querySelector(".user-form");
                          email_er.style.display = "none";
                          form.submit();

                      }

                     })
                    }
                   //button_reg.disabled=true;

           }
         }})

}
email_register_er();

function error_captcha(){


   if (error_captha.innerText == 1){
   error_captha.innerText = "CAPTCHA не пройдена";
   error_captha.style.display = "block";
   background_register.style.display = "block";}
   background_register.style.zIndex = "99";

}
error_captcha();


//подстветка поле входа

function get_color_enter(){
  let enter = document.querySelectorAll(".enter-input");

  for(let k=0;k<enter.length;k++){
     enter[k].addEventListener("mouseover", function(){
        enter[k].style.borderBottom = "1px solid rgb(255,0,255)"
        })
     enter[k].addEventListener("mouseout", function(){
         enter[k].style.borderBottom = "1px solid rgb(170,170,170)"
        })
  }
}
get_color_enter();