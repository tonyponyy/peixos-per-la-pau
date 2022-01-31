

$.ajax({
    url:direccio+'totes_les_peixeres',

    type:'get',
    success: function (response) {
              console.log(response)  
              imprimirPeixeres(response[0])

    },

    error:function(){
      alert("No s'ha pogut accedir a les peixeres, torna a intentar-ho en uns minuts.")

    }
 });

 function imprimirPeixeres(resposta){
     inner = "<table >"
     for (let i = 0; i < resposta.length; i++) {
        if (i%5==0){
            inner += '<tr>';
        } 
        inner += '<td><a href="javascript:anar('+resposta[i].id+')"> Peixera número '+resposta[i].id+'</a></td>'
        if (i%5== 4 || i== resposta.length-1){
            inner += '</tr>'; 
        }  
     }
     inner += "</table>"
     document.getElementById("contingut").innerHTML = inner;
 }

 function anar(id){
    sessionStorage.setItem('id_peixera', id); 
    window.location.href = "index.html";
 }

