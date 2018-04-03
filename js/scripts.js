// Business Logic
function Contact(first, last) { //constructor
  this.firstName = first; //key or type: value
  this.lastName = last;
  this.addresses = []; //array created to store the contact address "object's"
}

function Address(street, city, state) { //function method creates address objects
  this.street = street;
  this.city = city;
  this.state = state;
}

Contact.prototype.fullName = function() { //prototype concatinating the first + last name
  return this.firstName + " " +this.lastName;
}

Address.prototype.fullAddress = function() { //prototype concatinating the address details
  return this.street + ", " + this.city + ", " + this.state;
}

// User Interface Logic
$(document).ready(function() {
  $("#add-address").click(function() {
  $("#new-addresses").append(  '<div class="new-address">' +
                                '<div class="form-group">' + '<label for="address-type">Address Type</label>' + 
                                  '<input type="text" class="form-control address-type">' +
                                '</div>' +
                                '<div class="form-group">' + '<label for="new-street">Street</label>' +
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
                             //appending new input boxes for additional addresses
  });

  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName); //instance created from the contact constructor taking the user inputs

    $(".new-address").each(function() { //new function to obtain users address details
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState);
      newContact.addresses.push(newAddress); //instance created from the address constructor taking the user inputs
    });

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>"); //appending to the html document the concatinated object

    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.fullName());  //referencing the contact prototype
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>"); //calling to the address prototype and append the concatinated object
      });
    });

    $("input#new-first-name").val(""); //emptying out the values for the form
    $("input#new-last-name").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");
  });
});
