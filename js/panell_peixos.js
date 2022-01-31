

$.ajax({
    url:direccio+'is_online',
    data:{
        "token": sessionStorage.token
  },
    type:'get',
    success: function (response) {
        
    },
    
    error:function(){
      alert("Error, no estàs connectat.")
      window.location.href = "login.html";

    }
 });






$.ajax({
    url:direccio+'last_fishbowl/',
    data:{
    
  },
    type:'get',
    success: function (response) {
        print_select(response.id)
        
    },
    
    error:function(){
      alert("Error.")
      window.location.href = "index.html";

    }
 });


 $.ajax({
    url:direccio+'is_super',
    data:{
        "token": sessionStorage.token
    
  },
    type:'get',
    success: function (response) {
        document.getElementById("barra_esquerra").innerHTML += '<a href="panel_usuaris.html" class="btn btn-primary"> Panell usuaris </a>'

    },
    
    error:function(){


    }
 });




 function print_select(id){
    peixera_final = parseInt(id)
    select ="";
    
    console.log(peixera_final)
    for (let index = 0; index < peixera_final; index++) {
        
        select += '<a href="javascript:select_change('+(index+1)+')"">Peixera #'+(index+1)+'</a>'
        
    }
    document.getElementById("menu").innerHTML += select;
    
 }

 function select_change(id){
    //id = document.getElementById("select_peixera").value 
    $.ajax({
        url:direccio+'peixera/'+id,
        data:{

      },
        type:'get',
        success: function (response) {
           imprimeix_peixos(response)
    
        },
        
        error:function(){
          alert("Error.")
          window.location.href = "index.html";
    
        }
     });
 }

 var respuesta;
 function no_visibles(){
    //id = document.getElementById("select_peixera").value 
    $.ajax({
        url:direccio+'invisible_fish',
        data:{
            "token": sessionStorage.token
      },
        type:'get',
        success: function (response) {

           imprimeix_peixos(response)
    
        },
        
        error:function(){
          alert("Error.")
          window.location.href = "index.html";
    
        }
     });
 }





 function imprimeix_peixos(response){
    sortida = "";

    response.peixos.forEach(function(peix) {
     classe = peix.visible? "":"noesveu";   
     sortida += '<div id="'+peix.id+'" class="contenidor_peix '+classe+'">'
     sortida += '<p><b> Nom : </b>'+peix.nom+'</p>'
     sortida += '<p><b> Text : </b>'+peix.text+'</p>'
     sortida += '<img class="img_peix" src="'+peix.imatge+'">'
     sortida += '<div id="butonera">'
     if (peix.visible == false){
     sortida+= '<button onClick="ocultar('+peix.id+')" class="btn btn-primary"> Fer visible </button>'    
     }else{
         sortida+= '<button onClick="ocultar('+peix.id+')" class="btn btn-primary"> Ocultar </button>'
     }
     sortida+= '<button onClick="borrar('+peix.id+')" class="btn btn-danger"> Esborrar peix </button>'

     sortida += '</div></div>'

   }); 

   document.getElementById("container").innerHTML= sortida;



 }

 function ocultar(id){
    $.ajax({
        url:direccio+'visibility_fish',
        data:{
            "token": sessionStorage.token,
            "id": id
      },
        type:'post',
        success: function (response) {
            if (document.getElementById(id).classList.contains("noesveu")){
                 document.getElementById(id).classList.remove('noesveu');
                 document.getElementById(id).children[3].children[0].innerText="Ocultar"
            }else{
                document.getElementById(id).className = 'contenidor_peix noesveu'
                document.getElementById(id).children[3].children[0].innerText="Fer visible"
            }

            
        },
        
        error:function(){
          alert("Error, no estàs connectat.")
          window.location.href = "login.html";
    
        }
     });
 }

 function borrar(id){
    if (window.confirm("Segur que vols esborrar el peix ?")){

        $.ajax({
            url:direccio+'destroy_fish',
            data:{
                "token": sessionStorage.token,
                "id": id
          },
            type:'post',
            success: function (response) {
                document.getElementById(id).style.display = "none"
                alert("Peix esborrat correctament")
            },
            
            error:function(){
              alert("Error, no estàs connectat.")
             // window.location.href = "login.html";
        
            }
         });



    }
    
 }