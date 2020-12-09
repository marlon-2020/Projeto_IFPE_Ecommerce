var captura = localStorage.getItem('produtos')
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
                    `      <input class="quant" type="number" value="1" min="1">`+
                    `    </div>`+
                    `    <button class="remove-product" style="background-color:darkred;border:none;border-radius:10px;width:100%;height:30px;">Remover do carrinho</button>`+
                    `   </div>`+
                    `   <i class="material-icons small">expand_less</i>`+
                    `</div>`
                )
            })
        }
        //--------Valor Total Inicial------//
        var sum=0;
        $('p.price').each(function(){
            sum += parseFloat($(this).text());
            $('.final-price').text(sum.toFixed(2))
            });
        $('.quant').click(function(){
            //--------valor individual------//
            var quantidade = $(this).val()
            var valor = $(this).siblings().children('sub.price').text()
            var preco = valor*quantidade
            //------Substitui o preço anterior no localStorage do produto------//
            let nomeProduto = $(this).parents().siblings('p.product-name').text()
            localStorage.setItem(`${nomeProduto}`, preco.toFixed(2))
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
            //------Diminui em 1 o carrinho------//
            var itemsCarrinho = parseInt(localStorage.getItem('itemsCarrinho'))
            if((itemsCarrinho-1)>0){
                localStorage.setItem("itemsCarrinho", itemsCarrinho-1)
                $('.cartSpan').text(itemsCarrinho-1)
            }
            else{
                $('.cartSpan').text('')
                localStorage.setItem("itemsCarrinho", 0)
            }
            //------Remove o card do carrinho------//
            $(this).parentsUntil("section.products").remove()
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
            let localValor = $(this).siblings('div').find('sub.price').text()
            let localLink = $(this).siblings('p.product-name').attr('data-type')
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