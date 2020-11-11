var feild = document.querySelector('textarea');
var backUp = feild.getAttribute('placeholder');
var btn = document.querySelector('.btn');
var clear = document.getElementById('submit');
var modalcontainer = document.querySelector('.model-container')
var button = document.getElementById('open-button');
var cancel = document.getElementById('cancel');
feild.onfocus = function () {
    this.setAttribute('placeholder', ' ');
    this.style.borderColor = '#333';
    btn.style.display = 'block';
}

feild.onblur = function () {
    this.setAttribute('placeholder', "backUp");
    this.style.borderColor = '#aaa';
}

clear.onclick = function () {
    btn.style.display = 'none';
    feild.value = '';
}
button.onclick = function () {
   modalcontainer.style.visibility="visible";
  }
cancel.onclick = function() {
this.target.parent.parent.display="none";
}
