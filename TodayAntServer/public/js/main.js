function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function check(form)
{
    if (form.userid.value=="asdsad")
    {
        if(form.password.value=="123")
        {
            window.open('target.html')
        }
    else{
        alert("error");
    }
    }
}