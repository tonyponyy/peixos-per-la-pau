var peixera 

if (sessionStorage.getItem("id_peixera")){
    document.getElementById("numero_peixera").innerHTML = "Peixera numero "+ sessionStorage.getItem("id_peixera")
    activar_peixera(sessionStorage.getItem("id_peixera"))
}else{
    document.getElementById("numero_peixera").innerHTML = "Ultima peixera";
    ultima_peixera();
}



function ultima_peixera(){
    $.ajax({
        url:'http://127.0.0.1:8000/api/last_fishbowl/',
    
        type:'get',
        success: function (response) {
                  activar_peixera(response.id);
    
        },
    
        error:function(){
          alert("No s'ha pogut accedir a les peixeres, torna a intentar-ho en uns minuts.")
    
        }
     });
}

$.ajax({
    url:'http://127.0.0.1:8000/api/last_5_fishbowl/',

    type:'get',
    success: function (response) {
              imprimirPeixeres(response[0])

    },

    error:function(){
      alert("No s'ha pogut accedir a les peixeres, torna a intentar-ho en uns minuts.")

    }
 });

 function imprimirPeixeres(resposta){
    var peixeresHtml =""
    peixeresHtml += '<option selected> Ultimes peixeres</option>'
    resposta.forEach(function(element) {
        peixeresHtml += '<option value="'+element.id+'">Peixera numero '+element.id+'</option>'
      });
      peixeresHtml += '<option value="totes">Veure totes les peixeres</option>'
      document.getElementById("select_peixera").innerHTML = peixeresHtml;

 }

 function peixera(id){
   if (id != null && id!="totes" ){
    sessionStorage.setItem('id_peixera', id); 
    window.location.href = "index.html";
   }
   if (id=="totes"){
    window.location.href = "totes.html";
   }
    
 }

 document.getElementById("select_peixera").onchange = function(){
   peixera(document.getElementById("select_peixera").value)
 };
