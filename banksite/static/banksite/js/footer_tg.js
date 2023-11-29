//let new_footer=document.querySelector(".footer");
//new_footer.classList.add("new-footer");

function send_messange_tg(){
  let tg1=document.querySelector(".contact-tg");
  let a=document.querySelector(".contact-tg a");
  tg1.addEventListener("click",function(){
  console.log(a.href)
  window.location.href=a.href
  })
}

send_messange_tg();