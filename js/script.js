// BUSSINESS LOGIC
function Pizza(pizzaSize, pizzaCrust) {
  this.pizzaSize = pizzaSize;
  this.pizzaCrust = pizzaCrust;
  this.toppings = [];
  this.price = 0;
}

Pizza.prototype.cost = function () {
  var price = 0;
  if (this.pizzaSize == "large") {
    price += 1200;
  } else if (this.pizzaSize == "Medium") {
    price += 800;
  } else {
    price += 650;
  }

  for (var i = 0; i < this.toppings.length; i++) {
    price += 100;
  }
  if (this.crust == "cheese") {
    price += 300;
  } else if (this.crust == "sicilian") {
    price += 250;
  } else {
    price += 200;
  }
  this.price = price;
};

Pizza.prototype.toppingList = function () {
  if (this.toppings.length > 0) {
    return this.toppings.join(", ");
  } else {
    return "None";
  }
};

// USER INTERFACE LOGIC
$(document).ready(function () {
  var total = 0;
  $(".totalAmount").text(total);
  $("#orderForm").submit(function (event) {
    event.preventDefault();
    var pizzaCrust = $("#pizzaCrust").val();
    var pizzaSize = $("#pizzaSize").val();
    var newPizza = new Pizza(pizzaSize, pizzaCrust);
  });
});
