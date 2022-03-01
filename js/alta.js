function alta(){
    $.ajax({
        url:direccio+'user/register',
        data:{
          'email': document.getElementById("mail").value,
          "password": document.getElementById("password").value ,
          "name": document.getElementById("name").value 
      
      },
        type:'post',
        success: function (response) {
                   alert("Alta donada correctament, un cop comprovada la identitat se li atorgarà els rols d'administrador")
                   window.location.href = "index.html";
    
        },
        
        error:function(){
          alert("Error al donar d'alta")
         window.location.href = "alta.html";
    
        }
     });

}