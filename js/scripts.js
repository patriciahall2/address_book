function Contact(first, last, addresses) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];

}
function Address(type, street, city, state) {
  this.type = type;
  this.street = street;
  this.city = city;
  this.state = state;
}


Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Address.prototype.fullAddress = function() {
  return this.type + ", " + this.street + ", " + this.city + ", " + this.state;
}
function resetFields() {
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input#new-address-type").val("");
  $("input#new-street").val("");
  $("input#new-city").val("");
  $("input#new-state").val("");
}
$(document).ready(function()  {
  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address">' +
                                '<div class="form-group">' +
                                  '<label for="new-address-type">Address Type (business, home, mistress)</label>' +
                                  '<input type="text" class="form-control new-address-type">' +
                                '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control new-street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control new-city">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-state">State</label>' +
                                   '<input type="text" class="form-control new-state">' +
                                 '</div>' +
                               '</div>');
  });


  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputFirstName = $("input#new-first-name").val();
    var inputLastName = $("input#new-last-name").val();

    var newContact = new Contact(inputFirstName, inputLastName);

    $(".new-address").each(function() {
      var inputAddressType = $(this).find("input.new-address-type").val();
      var inputStreet = $(this).find("input.new-street").val();
      var inputCity = $(this).find("input.new-city").val();
      var inputState = $(this).find("input.new-state").val();
      var newAddress = new Address(inputAddressType, inputStreet, inputCity, inputState);
      newContact.addresses.push(newAddress);
    });

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li");

    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);

      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });
    resetFields();
  });
});
