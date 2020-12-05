
$(document).on("click", ".devourBtn", function () {
    var id = $(this).data("id");
    var newDevour = $(this).data("devour");
  
    var newDevourState = {
        devoured: newDevour
    }
  
    $.ajax(`/api/burgers/${id}`, {
        type: "PUT",
        data: newDevourState
    }).then(
        function () {
            console.log("changed devoured to", newDevour);
            location.reload();
        }
    )
  
  })
  
  $(document).ready(function () {
    $(".create-form").on("submit", function (event) {
        event.preventDefault();
        var newBurger = {
            burger_name: $("#burger-name-input").val().trim(),
            devoured: false
        };
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("created new burger");
                location.reload();
            }
        )
    })
  });