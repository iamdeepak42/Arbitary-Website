if (document.readyState == 'loading'){
	document.addEventListener('DOMContentLoaded',ready)
} else{
	// check if the document is completely loaded 
	ready()
}

function ready(){
	var removeCartItemButtons = document.getElementsByClassName('cart-qty-btn');

	for (var i =0; i<removeCartItemButtons.length;i++){
		var button = removeCartItemButtons[i];
		button.addEventListener('click',removeCartItem)
	}

	var quantityInputs = document.getElementsByClassName('cart-qty-input');
	for (var i =0; i<quantityInputs.length;i++){
		var input = quantityInputs[i];
		input.addEventListener('change',quantityChanged);

	}

	var addToCartButtons = document.getElementsByClassName('shop-item-button');
	for (var i =0; i<addToCartButtons.length;i++){
		var button = addToCartButtons[i];
		button.addEventListener('click',addToCartClick)


	}

	var purchaseButton = document.getElementsByClassName('btn-purchase')[0]
	purchaseButton.addEventListener('click',purchaseClicked)

}


function purchaseClicked(){
	alert('Thank you for the purchase')
	var cartItems = document.getElementsByClassName('cart-items')[0]
	while (cartItems.hasChildNodes()) {
		cartItems.removeChild(cartItems.firstChild)
	}
	updateCartTotal()
}


function addToCartClick(event){
	var button = event.target
	var shopItem = button.parentElement.parentElement
	var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
	var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
	var imgSource = shopItem.getElementsByClassName('shop-item-image')[0].src
	addItemToCart(title,price,imgSource)
	updateCartTotal()

}


function addItemToCart(title,price,imgSource){
	var cartRow = document.createElement('div')
	cartRow.classList.add('cart-row')
	var cartItems = document.getElementsByClassName('cart-items')[0]
	var cartItemNames = document.getElementsByClassName('cart-item-title')
	
	for (var i =0; i<cartItemNames.length;i++){
		if (cartItemNames[i].innerText == title){
			alert('This item is already added to the cart')
			return
		}
	}
	
	cartItems.append(cartRow)
	var cartContents = `
		
		<div class="cart-item cart-column">
			<img class="cart-item-image" src="${imgSource}" width="100" height="100">

			<span class="cart-item-title">${title}</span>
		</div>

		<span class="cart-price cart-column">${price}</span>
		<div class="cart-qty cart-column">
			<input class="cart-qty-input" type="number" name="qty" value="1">
			<button class="btn cart-qty-btn" role = "button">REMOVE</button>
		</div>
		`
	cartRow.innerHTML = cartContents
	cartItems.append(cartRow)
	cartRow.getElementsByClassName('cart-qty-btn')[0].addEventListener('click',removeCartItem)
	cartRow.getElementsByClassName('cart-qty-input')[0].addEventListener('change',quantityChanged)

}

function removeCartItem(event){
	var buttonClicked = event.target
	buttonClicked.parentElement.parentElement.remove();
	updateCartTotal();
}

function quantityChanged(event){
	var input = event.target
	if(isNaN(input.value) || input.value <= 0){
		input.value = 1
	}

	updateCartTotal()
}




function updateCartTotal(){

	var cartItemContainer = document.getElementsByClassName('cart-items')[0];
	var cartRows = cartItemContainer.getElementsByClassName('cart-row');
	var total = 0
	for (var i =0; i<cartRows.length;i++){
		var cartRow = cartRows[i];
		var priceElement = cartRow.getElementsByClassName('cart-price')[0];
		var qtyElement = cartRow.getElementsByClassName('cart-qty-input')[0];
		var price = priceElement.innerText.replace('$','');
		var qty = qtyElement.value;
		total = total + (price*qty)

	}
	document.getElementsByClassName('cart-total-amount')[0].innerText = '$'+total.toFixed(2);

}

