module.exports = function Cart(oldCart) {
  this.itens = oldCart.itens || {};
  this.totalQnt = oldCart.totalQnt || 0;
  this.totalPreco = oldCart.totalPreco || 0;

  this.add = function (item, id) {
    var produto = this.itens[id];
    if (!produto) {
      produto = this.itens[id] = { item: item, qnt: 0, preco: 0 };
    }

    produto.qnt++;
    produto.preco = produto.item.valor * produto.qnt;
    this.totalQnt++;
    this.totalPreco += produto.preco;
  };

  this.remove = function (debit) {
    this.totalPreco = this.totalPreco - debit;
  };

  this.generateArray = function () {
    var arr = new Array();
    for (var id in this.itens) {
      arr.push(this.itens[id]);
    }
    return arr;
  };
};
