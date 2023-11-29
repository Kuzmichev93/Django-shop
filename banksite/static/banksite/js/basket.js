let product_check=document.querySelectorAll(".product-check");
let check_label=document.querySelectorAll(".check-label");

let index_input=document.querySelectorAll(".product-input");

let summa_all=0;
let sum_product=document.querySelectorAll(".product-price-basket");
let price_sum=document.querySelector(".price-sum");

let new_class=document.querySelector(".header");
new_class.classList.add("new-header");
let new_footer=document.querySelector(".footer");
//new_footer.classList.add("new-footer");




function check_all(){
  let main_basket=document.querySelector(".main-basket");
  try{
        if(index_input.length==0){
             main_basket.style.height="100%"
            //document.querySelector(".ru").style.height = "100%";
            //document.querySelector(".main-basket").style.height = "100%";
            //main_basket.style.height="100%";
            price_sum.innerText=0;}
        else{
            if(index_input.length > 5){
            //document.querySelector(".ru").style.height = "";
            main_basket.style.height="";}
            else{ main_basket.style.height = "100%";
            }}
            //document.querySelector(".main-basket").style.height = "";}
     }
     catch(er){console.log(er)}
for(let k=0;k<index_input.length;k++){
   if(session[index_input[k].value][2]==1){
       check_label[k].style.display="block";
       product_check[k].style.background="rgb(193, 68, 143)";
       product_check[k].style.border="none";
       check_label[k].style.background="url('https://api.iconify.design/ic/baseline-check.svg?color=white')"
       check_label[k].style.backgroundRepeat="no-repeat";
       check_label[k].style.backgroundSize="100% 100%";

       //Общая сумма
       summa_all+=Number(sum_product[k].innerText);
       price_sum.innerText=summa_all;

       //console.log(summa_all);
   }
   else{
        check_label[k].style.display="none";
        product_check[k].style.background='white';
        check_label[k].style.background="url('https://api.iconify.design/ic/baseline-check.svg?color=%23b3bcc5')"
        check_label[k].style.backgroundRepeat="no-repeat";
        check_label[k].style.backgroundSize="100% 100%";
        product_check[k].style.border="2px solid #b3bcc5";
       // price_sum.innerText=0;
        if (summa_all==0){

          price_sum.innerText=0;}
   }

}
}
check_all();

function set_check_box(){

for(let k=0;k<product_check.length;k++){
   product_check[k].addEventListener("mouseover",function(){
           check_label[k].style.display="block";
           })

   check_label[k].addEventListener("click", function(event) {

                if(product_check[k].style.background!='rgb(193, 68, 143)'){
                 let click=1;
                 resp_basket(k,click);

                 summa_all+=Number(sum_product[k].innerText);
                 price_sum.innerText=summa_all;


                 product_check[k].style.background="rgb(193, 68, 143)";
                 product_check[k].style.border="none";
                 check_label[k].style.background="url('https://api.iconify.design/ic/baseline-check.svg?color=white')"
                 check_label[k].style.backgroundRepeat="no-repeat";
                 check_label[k].style.backgroundSize="100% 100%";
                // check_label[k].style.display="block";
                 }
                 else{product_check[k].style.background='white';
                       let click=0;
                       resp_basket(k,click);
                       //вычитание при флаге 0
                       if (summa_all==0){

                            price_sum.innerText=summa_all}
                       else{summa_all-=Number(sum_product[k].innerText);
                           price_sum.innerText=summa_all;
                           }
                       check_label[k].style.background="url('https://api.iconify.design/ic/baseline-check.svg?color=%23b3bcc5')"
                       check_label[k].style.backgroundRepeat="no-repeat";
                       check_label[k].style.backgroundSize="100% 100%";
                       product_check[k].style.border="2px solid #b3bcc5"
                 }
           })



   product_check[k].addEventListener("mouseout",function(){
              if(product_check[k].style.background=="rgb(193, 68, 143)"){
              check_label[k].style.display="block";}
              else{check_label[k].style.display="none";
              }
      })





   }
}
set_check_box();



async function resp_basket(key,click){
   let basket_id=document.querySelectorAll(".product-input");

   const form= new FormData();
   form.append("id",basket_id[key].value);
   form.append("click",click);
   url="http://"+hosts+"basket/"
   const response = await fetch(url,{
       method: "POST",
      // mode: "cors",
       //cache: "no-cache",

       //credentials: "include",
       headers:{"X-CSRFToken":TOKEN},
       //redirect: "follow",
       //referrerPolicy: "no-referrer",
       body:form


   })

   return await response.body;
}


