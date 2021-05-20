
var items = [
  ['Images/pepeBH.png', 39.99, 'Pepe Bucket Hat'],
  ['Images/BlackBH.png', 39.99, 'Classic Bucket Hat'],
  ['Images/SupremeBH.png', 39.99, 'S x W Bucket Hat'],
  ['Images/TrollBH.png', 39.99, 'Trollface Bucket Hat'],
  ['Images/greenBH.png', 39.99, 'Green Edge Bucket Hat'],
  ['Images/RedHat.png', 39.99, 'Red Edge Bucket Hat']
];

var cartItems = [];

function run() {
  var main = document.getElementById('products');

  //all Elements to be added
  for (var i = 0; i < items.length; i++) {

    var ele = document.createElement('li');
    var pic = document.createElement('img');
    var heading = document.createElement('h1');
    var price = document.createElement('h2');
    var add = document.createElement('button');
    var typeBox = document.createElement('input');

    //push elements into HTML
    main.appendChild(ele);
    ele.appendChild(pic);
    ele.appendChild(heading);
    ele.appendChild(price);
    ele.appendChild(add);
    ele.appendChild(typeBox);

    //edit pushed elements info from array

    pic.src = items[i][0];
    price.innerHTML = '$' + items[i][1];
    heading.innerHTML = items[i][2];
    add.innerHTML = 'add';
    typeBox.type = 'number';

    typeBox.setAttribute('id', 'input' + i);
    typeBox.value = 1;

    add.dataset.cartIndex = i;
    add.addEventListener('click', adding, false);
  }
}

  function adding(event) {
    const NUM = event.currentTarget.dataset.cartIndex;

    cartItems.push([items[NUM]]);
    cartItems[cartItems.length - 1][1] =
      Number(document.getElementById('input' + NUM).value);

    updateCart();
  }


  var totalItems = 0;

  function updateCart() {
    var itemCounter = document.getElementById('itemCount');

    totalItems = 0;

    for (var i = 0; i < cartItems.length; i++) {
      totalItems += cartItems[i][1]
    }

    window.sessionStorage.setItem('cartItems',
    JSON.stringify(cartItems));

    itemCounter.innerHTML = totalItems;
  }



function loadCart() { // loading products onto checkout page
  var main = document.getElementById('cartproducts');

  //all Elements to be added

  var data = sessionStorage.getItem('cartItems');
  data = JSON.parse(data);

  cartItems = data;

  updateCart();

  for (var i = 0; i < cartItems.length; i++) {

    var ele = document.createElement('li');
    var pic = document.createElement('img');
    var heading = document.createElement('h1');
    var price = document.createElement('h2');
    var deleteItem = document.createElement('button');
    var amount = document.createElement('h2');
    var subtotal = document.createElement('h3');

    //push elements into HTML
    main.appendChild(ele);
    ele.appendChild(pic);
    ele.appendChild(heading);
    ele.appendChild(price);
    ele.appendChild(deleteItem);
    ele.appendChild(amount);
    ele.appendChild(subtotal);

    //edit pushed elements info from array

    pic.src = cartItems[i][0][0];
    price.innerHTML = '$' + cartItems[i][0][1];
    heading.innerHTML = cartItems[i][0][2];

    deleteItem.innerHTML = 'delete';
    deleteItem.dataset.cartIndex = i;
    deleteItem.addEventListener('click', deleteMe, false);

    amount.innerHTML = cartItems[i][1];
    subtotal.innerHTML = '$' + cartItems[i][1] * cartItems[i][0][1];
  }
} //end function

  function deleteMe(){
    const NUM = event.currentTarget.dataset.cartIndex;

    delete cartItems[NUM];

    cartItems = cartItems.filter(item => item !== undefined);

    updateCart();
    loadCart();
    window.location.reload(true);
  } //end function
