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
    var vphone = /^\d[\d\(\)\ -]{2,14}\d$/;
    var vmail = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
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


    var phones = document.getElementsByName('phone');
    tmpObj.phones1=[];
    for(var i = 0; i<phones.length; i++){
        tmpObj.phones1.push(phones[i].value);
         if(vphone.test(tmpObj.phones1[i]) === false)
            fail = "Invalid phone number format";
    }
    if(tmpObj.phones1[0] === "")
        fail = "You did not enter a phone.1";


    var emails = document.getElementsByName('email');
    tmpObj.emails1=[];
    for(var j = 0; j<emails.length; j++){
        tmpObj.emails1.push(emails[j].value);
        if(vmail.test(tmpObj.emails1[j]) === false)
            fail = "Wrong e-mail format";
    }

    if (fail === "false") {
        localStorage.setItem(tmpObj.name, JSON.stringify(tmpObj));
        alert('Contact ' + tmpObj.name + ' added to memory');
            }
    else{
        alert(fail);
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
        "Surname: <b>" + returnObj.surname +"</b><br>";
    document.getElementById("s-cont").appendChild(span);
    for(var i = 0; i< returnObj.phones1.length; i++){
        var span1 = document.createElement("span");
        var m=i+1;
        span1.innerHTML ="Tel." + ": <b>" + returnObj.phones1[i] + "</b><br>";
        document.getElementById("s-cont").appendChild(span1);
    }
    for(var j = 0; j< returnObj.emails1.length; j++){
        var span2 = document.createElement("span");
        var n=j+1;
        span2.innerHTML ="E-mail." + ": <b>" + returnObj.emails1[j] + "</b><br>";
        document.getElementById("s-cont").appendChild(span2);
    }
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
        document.getElementsByName("phone")[0].value = returnObj.phones1[0];
        for(var i = 1; i< returnObj.phones1.length; i++){
            var div1 = document.createElement("div");
            div1.innerHTML = "<input name=\"phone\"" + EcurFieldNameId + "\" type=\"text\" value =" + returnObj.phones1[i] + " pattern=\"/^\w{1,}@{1,}\w{2,}$/\"> <a onclick=\"return deleteField(this)\" href=\"#\">[X]</a>";
            document.getElementById("parentId").appendChild(div1);
        }
        document.getElementsByName("email")[0].value = returnObj.emails1[0];
        for(var j = 1; j< returnObj.emails1.length; j++){
            var div2 = document.createElement("div");
            div2.innerHTML = "<input name=\"email\"" + EcurFieldNameId + "\" type=\"text\" value =" + returnObj.emails1[j] + " pattern=\"/^\w{1,}@{1,}\w{2,}$/\"> <a onclick=\"return deleteField(this)\" href=\"#\">[X]</a>";
            document.getElementById("EparentId").appendChild(div2);

        }
    }

}

// Закрытие окна просмотра контакта

span2.onclick = function () {
    modal2.style.display = "none";
    window.location.reload();
}



