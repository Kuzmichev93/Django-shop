
//
let menu=document.querySelector(".buttons");

menu.addEventListener("mouseover",color_botton_cursor_start);
function color_botton_cursor_start(event){
   menu.style.cursor='pointer';

   menu.style.boxShadow="0 0 5px #FF00FF";
};
menu.addEventListener("mouseout",color_botton_cursor_end);
function color_botton_cursor_end(event){
   menu.style.cursor="none";
   menu.style.boxShadow="none";
};
menu.addEventListener("click",open_popup);
function open_popup(){
   let popup=document.querySelector(".popup");
   popup.style.display="block";

   let parent=document.querySelector(".list-menu-parent");
   parent.style.display="block";
}



let parent_menu=mn;

//Создание списка родительских элементов
function set_parent_menu(){

   let list_parent=document.querySelector(".list-menu-parent ul");

   for (let k=0;k<parent_menu["title"].length;k++){
      let li=document.createElement("li");
      li.className="li-parent";
      let div_parent=document.createElement("div");
      div_parent.className="dv-parent";
      li.prepend(div_parent);
      list_parent.prepend(li);
      div_parent.innerText=parent_menu["title"][k];
      }

};
set_parent_menu();

//Создание списка дочерних элементов
function set_child_menu(){

    let li_parent=document.querySelectorAll(".li-parent ");

    for (let k=0;k<li_parent.length;k++){

        li_parent[k].addEventListener("mouseover",get_li);
        function get_li(){
             try{
                  document.querySelector(".list-menu-child ul").parentNode.removeChild(document.querySelector(".list-menu-child ul"));

                  }
             catch(err){
                         }
             let list_child=document.querySelector(".list-menu-child");
             list_child.style.display="block"
             value_list=parent_menu[li_parent[k].innerText]

             let ul=document.createElement("ul")
             ul.className="ul-child";
             list_child.prepend(ul);
                for(let i=0;i<value_list.length;i++){

                                  let li=document.createElement("li")
                                  li.className="li-child";
                                  let div_child=document.createElement("div");
                                  div_child.className="div-child";
                                  li.prepend(div_child);
                                  ul.prepend(li);
                                  div_child.innerText=parent_menu[li_parent[k].innerText][i];
                                  }
             }







    }

}
set_child_menu()

//подсветка родительских элементов
function color_parent(){
    let li_parent=document.querySelectorAll(".li-parent");
    for(let k=0;k<li_parent.length;k++){

       li_parent[k].addEventListener("mouseover",set_color);

       function set_color(){
            color_child();// связь с дочерними элементами
            li_parent[k].style.background="#C1448F";
            li_parent[k].style.color="white";}

       li_parent[k].addEventListener("mouseout",update_color);
       function update_color(){
            li_parent[k].style.background="none";
            li_parent[k].style.color="black";}
    }
}
color_parent();

//подсветка дочерних элементов
function color_child(){

    let li_child=document.querySelectorAll(".li-child");
    for(let k=0;k<li_child.length;k++){

       li_child[k].addEventListener("mouseover",set_color);
       function set_color(){
            li_child[k].style.background="#C1448F";
            li_child[k].style.color="white";}

       li_child[k].addEventListener("mouseout",update_color);
       function update_color(){
            li_child[k].style.background="none";
            li_child[k].style.color="black";}
    }
    get_page_right_window();
}





//закрытие popup
let popup_close=document.querySelector(".popup-close");
popup_close.addEventListener("click",close_popup);
function close_popup(){
  try{
     document.querySelector(".list-menu-child ul").parentNode.removeChild(document.querySelector(".list-menu-child ul"));
     let popup=document.querySelector(".popup");
     popup.style.display="none";

     let parent=document.querySelector(".list-menu-parent");
     parent.style.display="none";

     let child=document.querySelector(".list-menu-child");
     child.style.display="none";
  }
  catch(err){
     let popup=document.querySelector(".popup");
          popup.style.display="none";
     let parent=document.querySelector(".list-menu-parent");
          parent.style.display="none";
  console.log(err)
  }
}


function get_page_left_window(){
   let parent = document.querySelectorAll(".dv-parent");
   for (let k=0;k<parent.length;k++){
       if(parent[k].innerText == "Обувь"){
         let a = document.createElement("a");
         a.href = "http://"+hosts+"catalog/obuv/"
         parent[k].prepend(a)
         parent[k].addEventListener("click",function(){
             location.href = a.href

            })
         }
       }

}
get_page_left_window()

function get_page_right_window(){
   let child = document.querySelectorAll(".div-child");
   for (let k=0;k<child.length;k++){
       if(child[k].innerText == "Женщинам"){
         let a = document.createElement("a");
         a.href = "http://"+ hosts + "catalog/obuv/zhyenshchinam/"
         child[k].prepend(a)
         child[k].addEventListener("click",function(){
             location.href = a.href

            })
         }
       if(child[k].innerText == "Мужчинам"){
                let a = document.createElement("a");
                a.href = "http://"+hosts+"catalog/obuv/muzhchinam/"
                child[k].prepend(a)
                child[k].addEventListener("click",function(){
                    location.href = a.href

                   })
                }
       }

}
