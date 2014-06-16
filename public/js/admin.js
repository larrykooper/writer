$(document).ready(function() {
    
    $("#newPost").on("click", function() {
        window.location.replace('/admin/editor');
    })

    $("a[kind='delete']").on("click", function() {
        var response=confirm("Are you sure you want to delete this post?");
        if (response) {
            console.log("You pressed OK");
        } else {
            console.log("You pressed cancel");
        }
    })

    $("a[kind='delete']").hover(
        function() {
            $(this).css("text-decoration", "underline");
        }, function() {
            $(this).css("text-decoration", "none");
        }
    );

});