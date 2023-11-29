let search=document.querySelector(".search-top");  //search
let input=document.querySelector(".search-top input");
let search_history=document.querySelector(".search-bottom");
let a=document.querySelector(".search a");
let label_img=document.querySelector(".search-img")
//input.addEventListener("mouseover",history);


async function send_search_value(selector){
   const form= new FormData();
   form.append('del_key',selector.innerText);


   url="http://"+hosts+"search/"
   const response = await fetch(url,{
       method: "POST",
       headers:{"X-CSRFToken":TOKEN},
       body:form
   })

   return await response.text();
}



async function search_value(selector){


   const form= new FormData();
   form.append("search",selector.value);
   url="http://"+hosts+"search/"+"?"+input.name+"="+input.value;
   const response = await fetch(url,{
       method: "GET",
      // mode: "cors",
       //cache: "no-cache",

       //credentials: "include",
       //headers:{"X-CSRFToken":TOKEN},
       //redirect: "follow",
       //referrerPolicy: "no-referrer",
       //body:form


   })

   return await response.body;
}






input.addEventListener("click",function(event){
    label_img.style.background="url(https://api.iconify.design/material-symbols/search.svg?color=black)";
    label_img.style.backgroundRepeat="no-repeat";
    label_img.style.backgroundSize="100% 100%";

    search_history.style.display="flex";
    search_history.style.borderRadius="0px 0px 28px 28px";

    input.style.borderRadius="28px 28px 0 0";
    input.style.background="white";
    input.style.color = "";
    input.addEventListener("keydown",function(event){
    //let a=document.querySelector(".search a");

    //window.location.href=a.href;
    if (event.code=="Enter"){
        if (input.value.length>0){
            /*send_search(input);
            setTimeout(function(){
                    location.reload();
                         }, 1000)*/
            //search_value(input)
            window.location.href=a.href+"?"+input.name+"="+input.value;
            }
    }})


     })
function close_history(){
    let bod=document.querySelector("body");

    bod.addEventListener("click",function(event){

    if (event.target.name!="search"){
        if(event.target.className == "search-bottom-catalog-pd" || event.target.className == "search-bottom-catalog-pv"){
        search_history.style.display="flex";
        }
        else{
        label_img.style.background="url(https://api.iconify.design/material-symbols/search.svg?color=white)";
        label_img.style.backgroundRepeat="no-repeat";
        label_img.style.backgroundSize="100% 100%";
        input.style.background="rgba(255,255,255,.2)";
        input.style.borderRadius="56px";
        search_history.style.display="none";
        input.style.color = "rgba(255, 255, 255,.2)";
     }}
})
}

close_history();

function send_value_search(){
     try{

        for(let k=0;k<Object.keys(value_search).length;k++){
                  let ul=document.querySelector(".search-bottom-catalog-list");
                  let li=document.createElement("li");
                  let div_delete=document.createElement("div");
                  div_delete.className="search-bottom-catalog-delete";
                  let div_pd=document.createElement("div");
                  div_pd.className="search-bottom-catalog-pd";
                  div_delete.prepend(div_pd);
                  li.prepend(div_delete);
                  div_pd.innerText="удалить"
                  ul.prepend(li);


                 li.className="search-bottom-catalog-li";
                 let div_value=document.createElement("div");
                 div_value.className="search-bottom-catalog-value";
                 let div_pv=document.createElement("div");
                 div_pv.className="search-bottom-catalog-pv";
                 div_value.prepend(div_pv);
                 li.prepend(div_value);
                 div_pv.innerText=value_search[Object.keys(value_search)[k]];

                 ul.prepend(li);





                 //console.log(value_search[Object.keys(value_search)[k]])
             }
        }
        catch(er){
        console.log(er)}
     }

send_value_search();

function delete_key_search(){
   let delete_key = document.querySelectorAll(".search-bottom-catalog-pd");
   let ul = document.querySelector(".search-bottom-catalog-list");
   let li = document.querySelectorAll(".search-bottom-catalog-li");
   //console.log(delete_key)
   let title = document.querySelectorAll(".search-bottom-catalog-pv");
   for(let k=0;k<delete_key.length;k++){
      delete_key[k].addEventListener("click",function (){
          ul.removeChild(li[k])
          //search_history.style.display="flex";
          //parentNode.removeChild(li[k])
          send_search_value(title[k]);

         })
      }
}

close_history


delete_key_search();

function set_color_li(){
    let li=document.querySelectorAll(".search-bottom-catalog-li");
    let div_delete=document.querySelectorAll(".search-bottom-catalog-pd");
   // let input=document.querySelector(".search-top a");
    let value=document.querySelectorAll(".search-bottom-catalog-pv");
    for (let k=0;k<li.length;k++){

        li[k].addEventListener("mouseover",function(){
        li[k].style.background="#f6f6f9";
        li[k].style.borderRadius="10px";
        })

        li[k].addEventListener("mouseout",function(){
        li[k].style.background="none";
        li[k].style.borderRadius="none";
        })

        value[k].addEventListener("click",function(){
        input.value=value[k].innerText})

        div_delete[k].addEventListener("mouseover",function(){
        div_delete[k].style.color="black";
        })

        div_delete[k].addEventListener("mouseout",function(){
        div_delete[k].style.color="#868695";
        })

        div_delete[k].addEventListener("click",function(){

        let hidden=document.querySelectorAll(".search-bottom-catalog-list input");
        hidden.value=value[k].innerText;


        })



    }


}
set_color_li()

function error_search(){
  let error = document.querySelector(".error-value-search");
  try{
    if (error.innerText !=""){
         document.querySelector(".main-shop").style.height = "100%";

       }
    }
  catch{
    try{
        if (document.querySelectorAll(".product-container").length>8){
            document.querySelector(".main-shop").style.height = "";
            }
        else{
            document.querySelector(".main-shop").style.height = "100%"
            }
        }
        catch{}
  }
}

error_search();