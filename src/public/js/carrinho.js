let produtos = []

$(document).ready(function () {
    $(".darken-2").click(function () {
        var produto = $(this).parent().siblings('.product-name').text()
        let checaLoSt = localStorage.getItem(`${produto}`)
        if (!checaLoSt){
            var valor = $(this).siblings().children('.price').text().replace(/\D/g, "") / 100;
            localStorage.setItem(`${produto}`, `${valor}`)
            alert("Produto foi colocado no carrinho!")
            var imagem = $(this).parentsUntil(".card").siblings().attr('src');
            itemsCarrinho(produto, valor, imagem);
        }else{
            alert("Produto já está no carrinho!")
        }
    })

function itemsCarrinho(produto, valor, imagem) {

    let todosItems = localStorage.getItem('itemsCarrinho')
    todosItems = parseInt(todosItems)
    if (todosItems) {
        localStorage.setItem('itemsCarrinho', todosItems + 1)
        document.querySelector('.cartSpan').textContent = todosItems + 1
    } else {
        localStorage.setItem('itemsCarrinho', 1)
        document.querySelector('.cartSpan').textContent = 1
    }
    produtos.push({produto: produto, valor: valor, link: imagem})
    localStorage.setItem('produtos', JSON.stringify(produtos))
}
/*function armazenaLocal(produto, valor, imagem){
    let temCarrinho = localStorage.getItem(`${produto}`)        
    if(temCarrinho==null){
        localStorage.setItem(`${produto}`, valor)
        
        addProdutoTela(produto, valor, imagem)
    }else{
        var guardaValor = localStorage.getItem(`${produto}`)
        guardaValor = parseFloat(guardaValor) + parseFloat(valor)
        localStorage.setItem(`${produto}`, guardaValor)
        mudaQuantidade(guardaValor, valor, produto);
    }    

}*/
/*function armazenaLocal(produto, valor, imagem) {
    
    let temCarrinho = localStorage.getItem('produtos');
    console.log(produtos)
    if (temCarrinho == null) {
        var objProdutos = {nomeProduto: produto, valor: valor, link: imagem} 
        console.log(objProdutos)   
        localStorage.setItem('produtos', JSON.stringify(objProdutos))
    } else {
        var objProdutos = {nomeProduto: produto, valor: valor, link: imagem} 
        var guardaProd = localStorage.getItem('produtos')
        localStorage.setItem('produtos', guardaProd + JSON.stringify(produtos))
    }
    console.log(produtos)
}*/
function carregaCarrinho() {
    let todosItems = localStorage.getItem('itemsCarrinho')
    marcador = localStorage.getItem('marcador')
    if (todosItems)
        document.querySelector('.cartSpan').textContent = todosItems

}
/*function addProdutoTela(produto, valor, imagem){
    let classe = produto.split(" ")[3];
    console.log(classe)
    $(".side-products").prepend(
       `<img src=${imagem} width="70px" height="50px" style="border: solid;border-radius: 3px;">`+
       `<p>${produto}</p>`+
       `<p>${valor}</p>`+
       `<p class="${classe}">Quantidade: 1</p>`    
    )
}*/
function mudaQuantidade(guardaValor, valor, produto) {
    let quantidade = guardaValor / valor
    let classe = produto.split(" ")[3];
    $(`.${classe}`).text(`Quantidade: ${quantidade}`)

}
carregaCarrinho();
});

