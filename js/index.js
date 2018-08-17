;(function () {

})();

var tmpObj = {};

var modal = document.getElementById("form1");
var btn = document.getElementById("add");
var span = document.getElementsByClassName("close")[0];
var e = 0;


// Вывод окна ввода контакта

btn.onclick = function () {
    modal.style.display = "block";
};

span.onclick = function () {
    modal.style.display = "none";
    window.location.reload();
    };

// Обработка формы

function valid (fotm) {
    var fail = "false";
    var vphone = /^[\d\ +]{1}[\d\(\)\ -]{4,16}\d$/;
    var vmail = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
    var info = document.querySelector('#info');
    tmpObj.name = document.getElementsByName("name1")[0].value;
    if(tmpObj.name === "")
        fail = "You did not enter a name";
    for (var k = 0; k < localStorage.length; k++) {
        var key2 = localStorage.key(k);
        if(tmpObj.name === key2 && e === 0) {
            fail = "This contact name already exists";
            break;
        }
    }

    tmpObj.surname = document.getElementsByName('surname')[0].value;

    tmpObj.phone = document.getElementsByName('phone')[0].value;
    if(vphone.test(tmpObj.phone) === false)
        fail = "Invalid phone number format";
    if(tmpObj.phone === "")
        fail = "You did not enter a phone";

    tmpObj.email = document.getElementsByName('email')[0].value;
    if(vmail.test(tmpObj.email) === false)
        fail = "Wrong e-mail format";
    if(tmpObj.email === "")
        fail = "You did not enter a e-mail";


    if (fail === "false") {
        localStorage.setItem(tmpObj.name, JSON.stringify(tmpObj));
        }
    else{
        info.innerHTML = fail;
        return false;
        }

    window.location.reload();
}

// Поиск

function Search() {
    var input, a, i, ul, li, filter;
    input = document.getElementById('poisk');
    filter = input.value.toUpperCase();
    ul = document.getElementById('spisok');
    li = ul.getElementsByTagName('li');

    for(i=0; i<li.length; i++){
        a = li[i].getElementsByTagName("a")[0];
        if(a.innerHTML.toUpperCase().indexOf(filter) > -1){
            li[i].style.display = "";
        }
        else{
            li[i].style.display = "none";
        }
    }
}


// Выведение списков контактов

function seeCntakt() {
    for (var i = 0; i < localStorage.length; i++) {
        var key1 = localStorage.key(i);
        var li = document.createElement("li");
        li.innerHTML = "<a onclick=\"see('"+key1+"')\" href=\"#\" >" + key1 + "</a>";
        document.getElementById("spisok").appendChild(li);

    }
}

// Просмотр кнтакта

var bedit = document.getElementById("edit");
var bdel = document.getElementById("del");
var span2 = document.getElementsByClassName("close2")[0];
var modal2 = document.getElementById("form2");

function see(myKey) {
      modal2.style.display = "block";
    var returnObj = JSON.parse(localStorage.getItem(myKey));
    var span = document.createElement("span");
    span.innerHTML = "Name: <b>" + returnObj.name + "</b><br>"+
        "Surname: <b>" + returnObj.surname +"</b><br>" +
        "Phone: <b>" + returnObj.phone +"</b><br>"+
        "E-mail: <b>" + returnObj.email +"</b><br>";
    document.getElementById("s-cont").appendChild(span);

    // Удаление контакта

    bdel.onclick = function () {
        localStorage.removeItem(myKey);
        window.location.reload();
    };


    bedit.onclick = function () {
        modal.style.display = "block";
        modal2.style.display = "none";
        e = 1;
        document.getElementsByName("submit")[0].value = "Edit";
        document.getElementsByName("name1")[0].value = returnObj.name;
        document.getElementsByName("surname")[0].value = returnObj.surname;
        document.getElementsByName("phone")[0].value = returnObj.phone;
        document.getElementsByName("email")[0].value = returnObj.email;

    }

}

// Закрытие окна просмотра контакта

span2.onclick = function () {
    modal2.style.display = "none";
    window.location.reload();
}



