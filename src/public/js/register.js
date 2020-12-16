/* Mascara para o CPF */
mascara = (i) => {
  var v = i.value;
  if (isNaN(v[v.length - 1])) {
    /* impede entrar outro caractere que não seja número */
    i.value = v.substring(0, v.length - 1);
    return;
  }
  i.setAttribute("maxlength", "14");
  if (v.length == 3 || v.length == 7) i.value += ".";
  if (v.length == 11) i.value += "-";
};

/* Validação de Password */
var password = document.getElementById("password");
var confirm_password = document.getElementById("confirm_password");

function validatePassword() {
  if (password.value !== confirm_password.value) {
    confirm_password.setCustomValidity("Senhas diferentes!");
  } else {
    confirm_password.setCustomValidity("");
  }
}
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;
