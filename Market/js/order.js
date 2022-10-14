
var cart = {};


$.getJSON('goods.json', function(data){
    var goods = data; //все товары в массиве
    var goodsInCart = []; // переменная для подготовки Jsona на отправку

    function readyJson(){
        
        for (key in cart){
            // console.log('cart= ',cart)
            goodsInCart.push({product_id: goods[key].id , count: cart[key]});
            
        }
    };
    checkCart();
    showMiniCart();
    readyJson();
    // console.log('goodsInCart= ',goodsInCart)

    $("#form").on('submit', function (){ // отправка в апи
        $.ajax({
            url: 'api/v1/Buy',
            type: 'POST',
            data: JSON.stringify(goodsInCart),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function(goodsInCart) {
                $('.goodsIn').html(goodsInCart);
            }
        });
    });
});

function checkCart(){
    //проверка наличия корзины в localstorage
    if (localStorage.getItem('cart') != null){
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    console.log('cart= ',cart)
}

function showMiniCart(){
    //показать миникорзину
    var out = '';
    for (var i in cart){
      out += i + ' --- ' + cart[i] + '<br>';
    }
    $('.mini-cart').html(out);
}
function checkCart(){
    //проверка наличия корзины в localstorage
    if (localStorage.getItem('cart') != null){
      cart = JSON.parse(localStorage.getItem('cart'));
    }
}






