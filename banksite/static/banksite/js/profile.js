

function profile_circle(){
  try{
     let circle=document.querySelector(".user-circle-name");
     circle.innerText=circle.innerText[0]}

    catch(e){console.log(e)}}

profile_circle();

function profile_user(){
  let profile_user=document.querySelector(".profile-user");
  profile_user.addEventListener("mouseover",function(){
     profile_user.style.boxShadow="0px 0px 30px #aaa"})

  profile_user.addEventListener("mouseout",function(){
     profile_user.style.boxShadow="0px 0px 10px #aaa"})
}

profile_user();

function exit_user(){
   let exit=document.querySelector(".exit");
   exit.addEventListener("click",function(){
        let a=document.querySelector(".enter-in");
        window.location.href=a.href;
        })
}
