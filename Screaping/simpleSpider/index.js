const mysql=require('mysql2');
const download = require('image-downloader');
const { link } = require('fs');


var Crawler = {
	request : null,
	cheerio : null,
	fs      : null,
	init : function(){
		Crawler.request = require('request');
		Crawler.cheerio = require('cheerio');
		Crawler.fs      = require('fs');
		Crawler.getProducts();
	},
	getProducts: function(){
		Crawler.request('https://www.magazineluiza.com.br/busca/cal%C3%A7ados/2/', function(err, res, body){
			if(err)
				console.log('Error: ' + err);
			var $ = Crawler.cheerio.load(body);
			$('.productShowCase li').each(function(){
				var produto  = $(this).find('.productTitle').text().trim().replace(/^\s+|\s+$/g, "");
                var valor = $(this).find('.productPrice .price').text().trim().replace(/^\s+|\s+$/g, "");
                var valorOri = $(this).find('.productPrice .originalPrice').text().trim().replace(/^\s+|\s+$/g, "");
				var valorPar = $(this).find('.productPrice .installmentPrice').text().trim().replace(/^\s+|\s+$/g, "");
				var imagem = $(this).find('.alignment-image .product-image').attr('data-original');
				save(produto, valor, valorOri, valorPar, imagem);
				console.log(imagem)
				const options = {
					url: `${imagem}`,
					dest: '/IFPE/Projeto/PeakyPay/Screaping/simpleSpider/imagens'                
				}
				download.image(options)
  					.then(({ filename }) => {
    					console.log('Saved to', filename)  // saved to /path/to/dest/image.jpg
  					})
				  	.catch((err) => console.error(err))
			});
			console.log('Terminado!');
		});
	}
};
Crawler.init();


const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'ecommerce',
    password: 'msf131906'
 });
    
function save(produto, valor, valorOri, valorPar, imagem){
    connection.query(
    	'insert into produtos (nomeProduto, valor, valorOri, valorPar, imagem) values (?,?,?,?,?)', [produto, valor, valorOri, valorPar, imagem],        
    );
 }


 

 


   