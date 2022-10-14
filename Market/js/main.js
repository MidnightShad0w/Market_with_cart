
var cart = {}; // корзина

$('document').ready(function(){
    loadGoods();
    checkCart();
    showMiniCart();
});

function loadGoods(){
    // загрузка товара на стр
    $.getJSON('goods.json', function(data){
        // console.log('data= ',data)
        var out = '';
        for (var key in data){
          // console.log('key= ',key)
            // out += '<p>' + data[key].name + '</p>';
            out += '<div class="col-lg-4 col-sm-6">'+
            '<div class="card border-secondary mb-3 goods-card" style="max-width: 18rem;">'+
              '<div class="product-thumb">'+
                '<a href=""><img src="img/doge.png" class="card-img-top" alt="..."></a>'+
              '</div>'+
              '<div class="card-body">'+
                '<h5 class="card-title">'+data[key].name+'</h5>'+
                '<p class="card-text">' + data[key].title+'</p>'+
                '<div class="product-price">100$</div>'+
                '<a href="#" class="btn btn-primary buy-btn" data-id="'+/*data[key].id*/key+'">В корзину</a>'+
              '</div>'+
            '</div>'+
          '</div>';
        }
        $('.row').html(out);
        $('a.buy-btn').on('click', addToCart);
    });
}

function addToCart(){
  //добавить в корзину нажатием на ссылку-кнопку
  var idGoods = $(this).attr('data-id'); //кинул массив объектов а не объект поэтому пихаем в локал не id а номер объекта в массиве
  if (cart[idGoods] != undefined){
    cart[idGoods]++;
  } else{
    cart[idGoods] = 1;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  
  showMiniCart();
}

function checkCart(){
  //проверка наличия корзины в localstorage
  if (localStorage.getItem('cart') != null){
    cart = JSON.parse(localStorage.getItem('cart'));
    // console.log('cart= ',cart);
  }
}

function showMiniCart(){
  //показать миникорзину
  var out = '';
  for (var i in cart){
    out += i + ' --- ' + cart[i] + '<br>';
  }
  $('.mini-cart').html(out);
}