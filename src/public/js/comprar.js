$(document).ready(function(){
    $('.darken-1').click(function(){
        let valorFinal = parseFloat($(".painel-valor").text())
        console.log(valorFinal)
        localStorage.setItem("Valor Total", valorFinal)
    })
})