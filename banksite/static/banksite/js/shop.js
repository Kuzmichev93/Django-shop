
//колличество добавленного товора в корзине.
function get_len_session(){
   index_url = "http://"+ hosts              //"http://127.0.0.1:8000/";
   const request = new XMLHttpRequest();
   request.open('GET',index_url,true)


   const parser = new DOMParser();
   request.send();

   request.onreadystatechange = function(){
      if (request.readyState == 4 && request.status == 200){


           let value_sesson=document.querySelector(".button-basket-value");
           let sum_basket_value = document.querySelector(".sum-basket-value");
           const response = parser.parseFromString(request.response.replace(/\\n/g,'\n'), 'text/html');

           value_sesson.style.display="flex";
           sum_basket_value.innerText=response.querySelector(".len-session").value;


      }


   }

}



//отправка id в session
async function resp(key){
   let shop_id=document.querySelectorAll(".shop-id");

   const form= new FormData();
   form.append("id",shop_id[key].value)

   url="http://"+hosts+"set_session/"
   const response = await fetch(url,{
       method: "POST",

       headers:{"X-CSRFToken":TOKEN},

       body:form


   })

    get_len_session();
   return await response;
}



//click по товару
function button_product(){
    let knop=document.querySelectorAll(".product-top-button");
    for (let k=0;k<knop.length;k++){

     knop[k].addEventListener("click",function(){
                    resp(k)

     })}
}

button_product();


//подключение div с позицией абсолют при наведеннии курсора
 let container_top=document.querySelectorAll(".product-container-top");
 let text=document.querySelectorAll(".product-text");
function choice_product(){
   let product_container=document.querySelector(".product-container");
  // let tag_all=product_container.querySelectorAll("*");
   let product=document.querySelectorAll(".product");
  // let container_top=document.querySelectorAll(".product-container-top");
   let image=document.querySelectorAll(".product-image");
   let price=document.querySelectorAll(".product-price");
   let text=document.querySelectorAll(".product-text");

   for(let k=0;k<product.length;k++){
    let tag_all=product[k].querySelectorAll("*");
    for (let i=0;i<tag_all.length;i++){
         choice_product_close_window();
         tag_all[i].addEventListener("mouseover",function(){

            for(let z=0;z<container_top.length;z++){
                if(container_top[z].style.display="block"){

                   container_top[z].style.display="none";
                    image[z].style.zIndex="0";
                    price[z].style.zIndex="0";
                    text[z].style.zIndex="0";
                    //text[z].style.overflow="hidden";
                    text[z].style.whiteSpace="nowrap";}
                }

            container_top[k].style.display="block";
            image[k].style.zIndex="2";
            price[k].style.zIndex="2";
            text[k].style.zIndex="2";
            text[k].style.whiteSpace="unset";
            })

         }

   }


}
choice_product();

function choice_product_close_window(){
   let body=document.body.querySelectorAll("*");
   body[0].addEventListener("mouseover",function(event){
     if(event.target.className == "shop-container"){
       for(let k=0;k<container_top.length;k++){
          if(container_top[k].style.display == "block"){
            container_top[k].style.display = "none";
            text[k].style.whiteSpace="nowrap";
            }
          }
     }

     })

}


