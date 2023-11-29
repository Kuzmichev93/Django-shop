
//let id = document.querySelector(".related-widget-wrapper");
//console.log(id)

$(document).ready(function(){
    let id_sex_id = document.getElementById("id_sex_id");
    let array = {"а":"a","б":"b","в":"v","г":"g","д":"d","е":"ye","ё":"yo",
                                 "ж":"zh","з":"z","и":"i","к":"k","л":"l","м":"m","н":"n",
                                 "о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f",
                                 "х":"kx","ц":"ts","ч":"ch","ш":"sh","щ":"shch","ы":"y","э":"e",
                                 "ю":"yu","я":"ya"}

    id_sex_id.addEventListener("click",function(event){
            let tran= "";
            let r=event.target;
            let text=r[r.selectedIndex].text.toLowerCase()
            //console.log(array['ч'])
            for (let k=0;k<text.length;k++){
                if(array[text[k]]){
                  tran+=array[text[k]]
                  }

               }
            let id_slug_sex = document.getElementById("id_slug_sex");
            id_slug_sex.value = tran
            })

    let id_product_group = document.getElementById("id_product_group");
    id_product_group.addEventListener("click",function(event){
                let tran= "";
                let r=event.target;
                let text=r[r.selectedIndex].text.toLowerCase()
                //console.log(array['ч'])
                for (let k=0;k<text.length;k++){
                    if(array[text[k]]){
                      tran+=array[text[k]]
                      }

                   }
                let id_slug_group = document.getElementById("id_slug_group");
                id_slug_group.value = tran
                })
//}

})