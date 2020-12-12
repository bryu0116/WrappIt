$(document).ready(function() {
    
    // "Delete" button listener (view saved gifts page)
    $(document).on("click", ".delGift", delGift); 
    
    // DELETE DB record - DELETE method
    function delGift(e) {
        e.preventDefault();
        const id = $(this).data().id;
        console.log(id);
        let query = {
            url: "/api/gift/" + id
        };
        $.ajax({
            url: query.url,
            type: 'DELETE'
        }).then(function(delGift) {
            if (delGift === 1) {
                $(".delGift").parent('.gift').empty();
            }
        });
    }


});
