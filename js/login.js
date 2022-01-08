var resposta 
function login(){
    $.ajax({
        url:'http://127.0.0.1:8000/api/user/login',
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