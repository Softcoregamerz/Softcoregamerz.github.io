function checkName() {
    var name, text;


    name = document.getElementById("firstname").value;

    if (/[\d]/.test(name)) {
        text = "Sie dürfen keine Zahlen in ihrem Namen verwenden!";
    } else {
        text = "Input OK";
    }
    document.getElementById("warning").innerHTML = text;
}