$(document).ready(function(){
    ymaps.ready(it);
       function it(){
       var location = ymaps.geolocation.get({ provider: 'browser'});
       //console.log(location)

       location.then(function(res){

       let city=document.querySelector(".city");
       city.innerText=res.geoObjects.get(0).properties.get("name")
       console.log(res.geoObjects.get(0).properties.get("name"))})
       };

let city_info=document.querySelector(".city-info")
city_info.addEventListener("mouseover",set_color_city);
function set_color_city(){
    //city_info.city.style.display="none";
    for (let k=0;k<city_info.children.length;k++){
    city_info.children[k].style.opacity=1}
    };

city_info.addEventListener("mouseout",update_color_city);

function update_color_city(){
    //city_info.city.style.display="none";
    for (let k=0;k<city_info.children.length;k++){
    city_info.children[k].style.opacity=0.5}
    };

})