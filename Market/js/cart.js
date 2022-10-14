
var cart = {}; //корзина

$.getJSON('goods.json', function(data){
    var goods = data; //все товары в массиве
    // console.log(goods)
    checkCart();
    // console.log('cart= ', cart)
    showCart();
    showMiniCart();

    function showCart(){

      if ($.isEmptyObject(cart)){
        //корзина пустая
        var out = 'Корзина пуста';
        $('.my-cart').html(out);
      } else{
          var out = '';
          for (var key in cart){
              // console.log('key= ',key)
              out += '<div class="card border border-dark mb-3 list-group-item card-in-cart" style="max-width: 540px;">'+
              '<div class="row g-0">'+
                '<div class="col-md-4">'+
                  '<img src="img/gosling1.png" class="img-fluid rounded-start" alt="...">'+
                '</div>'+
                '<div class="col-md-8">'+
                  '<div class="card-body">'+
                    '<h5 class="card-title">'+ goods[key].name +'</h5>'+
                    '<p class="card-text">'+ goods[key].title +'</p>'+
                    '<button type="button" class="btn btn-outline-dark btn-sm plus" data-id="'+ key +'">+</button>'+
                    cart[key]+
                    '<button type="button" class="btn btn-outline-dark btn-sm minus" data-id="'+ key +'">-</button>'+
                    '<button type="button" class="btn btn-outline-dark btn-sm delete" data-id="'+ key +'">x</button>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>';
        }
        out += '<a href="order.html" class="btn btn-primary">Перейти к оформлению</a>';
        $('.my-cart').html(out);
        $('.plus').on('click', plusGoods);
        $('.minus').on('click', minusGoods);
        $('.delete').on('click', deleteGood);
      }
    }

    function plusGoods(){
      var idGoods = $(this).attr('data-id');
      cart[idGoods]++;
      saveCartToLC(); // сохранить корзину в локал
      showCart();
    }

    function minusGoods(){
      var idGoods = $(this).attr('data-id');
      if (cart[idGoods] > 1 ){
        cart[idGoods]--;
      } else {
        delete cart[idGoods];
      }
      saveCartToLC(); // сохранить корзину в локал
      showCart();
    }

    function deleteGood(){
      var idGoods = $(this).attr('data-id');
      delete cart[idGoods];
      saveCartToLC(); // сохранить корзину в локал
      showCart();
    }

});

function checkCart(){
  //проверка наличия корзины в localstorage
  if (localStorage.getItem('cart') != null){
    cart = JSON.parse(localStorage.getItem('cart'));
  }
}

function saveCartToLC(){
  localStorage.setItem('cart', JSON.stringify(cart));
}
function showMiniCart(){
  //показать миникорзину
  var out = '';
  for (var i in cart){
    out += i + ' --- ' + cart[i] + '<br>';
  }
  $('.mini-cart').html(out);
}
