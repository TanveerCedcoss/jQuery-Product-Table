var list = [];
var sku, pName, quantity, exist;

$(document).ready(function () {
  $("#add_product").click(function () {
    addValues();
    displayData();
  });

  function addValues() {
    sku = $("#product_sku").val();
    pName = $("#product_name").val();
    price = $("#product_price").val();
    quantity = $("#product_quantity").val();
    exist = checkData(sku);
    if (exist == true) {
      $(".error").fadeIn();
      $(".error").fadeOut(2000);
    } else {
      var data = {
        sku: sku,
        name: pName,
        price: price,
        quantity: quantity,
      };
      list.push(data);
      $(".success").fadeIn();
      $(".success").fadeOut(2000);
    }

    console.log(list);
  }

  function checkData() {
    for (i = 0; i < list.length; i++) {
      if (sku == list[i].sku) {
        return true;
      }
    }
    if (
      pName == "" ||
      sku == "" ||
      price == "" ||
      quantity == "" ||
      isNaN(sku)
    ) {
      return true;
    }
  }

  function displayData() {
    var table =
      "<table><tr><th>SKU</th><th>Name</th><th>Price</th><th>Quantity</th><th>Action</th></tr>";
    for (i = 0; i < list.length; i++) {
      table +=
        "<tr><td>" +
        list[i].sku +
        "</td><td>" +
        list[i].name +
        "</td><td>" +
        list[i].price +
        "</td><td>" +
        list[i].quantity +
        '</td><td><a href="#" data-id="' +
        list[i].sku +
        '"class="edit">Edit</a><a href="#" data-id=' +
        list[i].sku +
        ' class="delete">Delete</a></tr>';
    }
    table += "</table>";

    $("#product_list").html(table);
  }

  //deleting values
  $("#product_list").on("click", ".delete", function () {
    console.log("clicked delete");
    var pid = $(this).data("id");
    console.log("pid= " + pid);
    var del = getValues(pid);
    console.log(del);
    for (i = 0; i < list.length; i++) {
      if (pid == list[i].sku) {
        console.log("delete working");
        list.splice(i, 1);
        console.log(list);
        displayData();
      }
    }
  });

  //editing values
  $("#product_list").on("click", ".edit", function () {
    console.log("clicked edit");
    var pid = $(this).data("id");
    console.log("pid= " + pid);
    var edit = getValues(pid);
    console.log(edit);
    $("#product_sku").val(edit.sku);
    $("#product_name").val(edit.name);
    $("#product_price").val(edit.price);
    $("#product_quantity").val(edit.quantity);

    $("#update_product").css("display", "block");
    $("#add_product").css("display", "none");

    $("#update_product").click(function () {
      for (i = 0; i < list.length; i++) {
        if (pid == list[i].sku) {
          console.log("working");
          list[i].name = $("#product_name").val();
          console.log(list[i].name);
          list[i].price = $("#product_price").val();
          list[i].quantity = $("#product_quantity").val();
          console.log(list);
          displayData();
          $("#update_product").css("display", "none");
          $("#add_product").css("display", "block");
          $(".success").fadeIn();
          $(".success").fadeOut(2000);
        }
      }
    });
  });

  //finding the clicked object's values
  function getValues(pid) {
    for (i = 0; i < list.length; i++) {
      if (pid == list[i].sku) {
        return list[i];
      }
    }
  }
});
