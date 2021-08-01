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

    $("input:checkbox[name=topItem]:checked").each(function () {
      var toppingChoice = $(this).val();
      newPizza.toppings.push(toppingChoice);
    });

    newPizza.cost();
    total += newPizza.price;

    $(".totalAmount").text(total);
    $("#orderOutput").show();
    $("#cartHeader").show();
    $("ol#orderList").append(
      "<li><span class='cartItem'>" +
        newPizza.pizzaSize +
        " " +
        newPizza.pizzaCrust +
        " Pizza" +
        "</span></li>"
    );

    $(".cartItem")
      .last()
      .click(function () {
        $("#orderChoice").show();
        $(".pizzaSize").text(newPizza.pizzaSize);
        $(".pizzaCrust").text(newPizza.pizzaCrust);
        $(".pizzaTopping").text(newPizza.toppingList());
        $(".pizzaCost").text(newPizza.price);
      });
    $("#orderForm")[0].reset();
  });

  $("button#checkout").click(function () {
    $("#orderChoice").hide();
    $("#pickupOption").show();
  });

  $("button#pickupPoint").click(function () {
    $("#pickupOption").hide();
    $(".pickupPerson").show();
  });

  $("button#pickupBtn").click(function (event) {
    event.preventDefault();
    var userName = $("input#personName").val();
    // $(".name-input").text(userName);
    $("form#pickupForm").hide();
    $("#orderOutput").hide();
    $("form#orderForm").hide();
    var myModal = new bootstrap.Modal(document.getElementById("modal"), {
      backdrop: true,
    });
    if (userName) {
      $("#modal-body").html(
        " Hello " +
          userName +
          ", Please pick your order at iPizza shop near you. Thank You"
      );
      $("#modalLabel").html("Order successfully confirmed");
      myModal.show();
    } else {
      $("#modal-body").html("Please enter your name!!");
      $("#modalLabel").html("Invalid input!");
      myModal.show();
    }
  });

  $("button#deliveryPoint").click(function () {
    total += 300;
    $(".totalAmount").text(total);
    $("#pickupOption").hide();
    $(".delivery").show();
  });

  $("button#deliveryForm").click(function (event) {
    event.preventDefault();
    var userName = $("input#fullNameD").val();
    var address = $("input#location").val();
    $("#orderOutput").hide();
    $("form#orderForm").hide();
    $("form#deliveryForm").hide();
    var myModal = new bootstrap.Modal(document.getElementById("modal"), {
      backdrop: true,
    });
    if (userName && address) {
      $("#modal-body").html(
        " Hello " +
          userName +
          ", your order will be delivered to your location. Thank you for shopping on iPizza"
      );
      $("#modalLabel").html("Your Order has been successfully confirmed.");
      myModal.show();
    } else {
      $("#modal-body").html("Please enter your name and address!!");
      $("#modalLabel").html("Invalid input!");
      myModal.show();
    }
  });
});
