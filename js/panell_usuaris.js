$.ajax({
    url:direccio+'is_super',
    data:{
        "token": sessionStorage.token
  },
    type:'get',
    success: function (response) {
        
    },
    
    error:function(){
      alert("Error, no estàs autoritzat.")
      window.location.href = "login.html";

    }
 });


 $.ajax({
    url:direccio+'user_all',
    data:{
        "token": sessionStorage.token
  },
    type:'get',
    success: function (response) {
        usuaris = response[0];
        creataula(usuaris)
    },
    
    error:function(){
      alert("Error, no estàs autoritzat.")
      window.location.href = "login.html";

    }
 });

 function creataula(usuaris){
    inner = "<table class='table table-dark'>";
    inner += '<tr>'
    inner += '<th scope="col">Nom</th>'
    inner += '<th scope="col">Email</th>'
    inner += '<th scope="col">Admin</th>'
    inner += '<th scope="col">Validat</th>'
    inner += '<th scope="col">Esborrar</th>'
    inner += '</tr>'
    usuaris.forEach(usuari => {
        inner += '<tr>'
        inner += '<td>'+usuari.name+'</td>'
        inner += '<td>'+usuari.email+'</td>'
        if (usuari.admin){
            inner += '<td><a href="javascript:privilegis('+usuari.id+')" >Treure privilegis <a></td>'
        } else{
            inner += '<td><a href="javascript:privilegis('+usuari.id+')">Donar privilegis <a></td>'
        }
        if (usuari.validated){
            inner += '<td><a href="javascript:validar('+usuari.id+')">Desvalidar<a></td>'
        } else{
            inner += '<td><a href="javascript:validar('+usuari.id+')">Validar<a></td>'

        }
        inner += '<td><a href="javascript:esborrar('+usuari.id+')">❌<a></td>'

        inner += '</tr>'
    });
    inner += '</table>'
    document.getElementById('container').innerHTML = inner;

 }

 function privilegis(id){
     alert("privilegis "+id)
 }

 function validar(id){

    $.ajax({
        url:direccio+'validate_user/'+id,
        data:{
            "token": sessionStorage.token
      },
        type:'post',
        success: function (response) {
            location.reload();
        },
        
        error:function(response){
          alert("Error")
          window.location.href = "login.html";
    
        }
     });

}

function privilegis(id){

    $.ajax({
        url:direccio+'super_user/'+id,
        data:{
            "token": sessionStorage.token
      },
        type:'post',
        success: function (response) {
            location.reload();
        },
        
        error:function(response){
          alert("Error")
          window.location.href = "login.html";
    
        }
     });

}



function esborrar(id){
    alert("esborrar "+id)

    

    $.ajax({
        url:direccio+'delete_user/'+id,
        data:{
            "token": sessionStorage.token
      },
        type:'post',
        success: function (response) {
            location.reload();
        },
        
        error:function(response){
          alert("Error")
          window.location.href = "login.html";
    
        }
     });

}