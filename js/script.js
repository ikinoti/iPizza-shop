// BUSSINESS LOGIC

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
