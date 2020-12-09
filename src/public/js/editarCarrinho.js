//------Captura o string da chave 'produtos' do local storage------//
var captura = localStorage.getItem('produtos')
//------Cria uma constante para armazenar o valor inicial da quantidade itens do carrinho------//
const itemsCarrinho = parseInt(localStorage.getItem('itemsCarrinho'))
//------Inicia o mapeamento dos objetos para renderização do localSotrage------//
if (captura!=null) {
    var captura = JSON.parse(captura)
    $(document).ready(function(){
        if(captura){     
            Object.values(captura).map(item =>{
                $('.products').prepend(
                    `<div class="card">`+
                    `   <img class="image-product" src="${item.link}" alt="" width="120px" height="180px" style="border: solid;border-radius: 3px;">`+
                    `   <div class="buy">`+
                    `    <p class="product-name" data-type="${item.link}">${item.produto}</p>`+
                    `    <div class="botton-card">`+
                    `      <div class="white-bg-price">`+
                    `        <sub class="price" style="visibility: hidden;">${item.valor}</sub>`+
                    `        <p class="price">${item.valor}</p>`+
                    `      </div>`+
                    `      <input class="quant" type="number" value="${item.quantidade}" min="1">`+
                    `    </div>`+
                    `    <button class="remove-product" style="background-color:darkred;border:none;border-radius:10px;width:100%;height:30px;">Remover do carrinho</button>`+
                    `   </div>`+
                    `   <i class="material-icons small">expand_less</i>`+
                    `</div>`
                )
            })
        }
        //------Valor individual inicial------//
        $('sub.price').each(function(){
            valorInicial = parseFloat($(this).text())*parseInt($(this).parents().siblings('.quant').val())
            $(this).siblings('p.price').text(valorInicial.toFixed(2))
        });
        //--------Valor Total Inicial------//
        var sum=0;
        $('p.price').each(function(){
            sum += parseFloat($(this).text())
            $('.final-price').text(sum.toFixed(2))
        });
        var quant=0;
        $('.quant').each(function(){
            quant += parseInt($(this).val());
            $('.cartSpan').text(quant)
            let itensCarrinho = $('.cartSpan').text()
            localStorage.setItem('itemsCarrinho', itensCarrinho)
        });
        $('.quant').click(function(){
            //--------valor individual------//
            var quantidade = $(this).val()
            let quant=0;
            $('.quant').each(function(){
                quant += parseInt($(this).val());
                $('.cartSpan').text(quant)
                let itensCarrinho = $('.cartSpan').text()
                localStorage.setItem('itemsCarrinho', itensCarrinho)
            })
            var valor = $(this).siblings().children('sub.price').text()
            var preco = valor*quantidade
            //------Substitui a quantidade do mesmo produto no localStorage "produtos" e do produto------//
            let nomeProduto = $(this).parents().siblings('p.product-name').text()
            localStorage.setItem(`${nomeProduto}`, quantidade)
            var localCopia = localStorage.getItem(`produtos`)
            localCopia = JSON.parse(localCopia)
            var posicao = localCopia.findIndex(x => x.produto === `${nomeProduto}`)
            localCopia[posicao].quantidade = parseInt(quantidade)
            localStorage.setItem('produtos', JSON.stringify(localCopia))
            $(this).siblings().children('p.price').text((preco).toFixed(2))

            //---------valor geral---------//
            var sum = 0;
            $('p.price').each(function(){
            sum += parseFloat($(this).text());
            $('.final-price').text(sum.toFixed(2))
            });
        })
        //---------Remover produto---------//
        $('.remove-product').one("click", function(){
            //------Diminui a quantidade dos produtos do carrinho------//
            
            //------Remove o card do carrinho------//
            $(this).parentsUntil("section.products").remove()
            let quant=0;
            $('.quant').each(function(){
                quant += parseInt($(this).val());
                $('.cartSpan').text(quant)
                let itensCarrinho = $('.cartSpan').text()
                localStorage.setItem('itemsCarrinho', itensCarrinho)
            })
            //------Atualiza o preço total------//
            var sum = 0;
            $('p.price').each(function(){
                sum += parseFloat($(this).text());
                $('.final-price').text(sum.toFixed(2))
            });
            //------Remove do localStorage o 'ok' do produto------//
            let localProduto = $(this).siblings('p.product-name').text()
            localStorage.removeItem(`${localProduto}`)
            //------Remover produto da lista de objetos no item 'produtos' do Storage------//
            let localProdutos = localStorage.getItem('produtos')
            localProdutos = JSON.parse(localProdutos)
            localProdutos = localProdutos.filter(function( obj ) {
                return obj.produto !== `${localProduto}`;
            });
            localStorage.setItem('produtos',JSON.stringify(localProdutos))
            let checar = localStorage.getItem('produtos')
            if (checar == "[]") {
                localStorage.removeItem('produtos')
                $('.final-price').text(0)
                $('.darken-3').click()
            }
        })
        //------Encerra remover produtos------//
    })
}