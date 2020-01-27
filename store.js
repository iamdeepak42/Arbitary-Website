if (document.readyState == 'loading'){
	document.addEventListener('DOMContentLoaded',ready)
} else{
	ready()
}

function ready(){
	var removeCartItemButtons = document.getElementsByClassName('cart-qty-btn');

	for (var i =0; i<removeCartItemButtons.length;i++){
		var button = removeCartItemButtons[i];
		button.addEventListener('click',removeCartItem)
	}

}


function removeCartItem(event){
	var buttonClicked = event.target
	buttonClicked.parentElement.parentElement.remove();
	updateCartTotal();
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
	document.getElementsByClassName('cart-total-amount')[0].innerText = '$'+total;

}

