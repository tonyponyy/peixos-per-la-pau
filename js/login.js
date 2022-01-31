var resposta 
function login(){
    $.ajax({
        url:direccio+'user/login',
        data:{
          'email': document.getElementById("mail").value,
          "password": document.getElementById("password").value ,
      
      },
        type:'post',
        success: function (response) {
                   sessionStorage.setItem("token",response);
                   window.location.href = "panell_peixos.html";
    
        },
        
        error:function(){
          alert("Login incorrecte.")
          window.location.href = "login.html";
    
        }
     });

}