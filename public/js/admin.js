$(document).ready(function() {
    
    $("#newPost").on("click", function() {
        window.location.replace('/admin/editor');
    })

    $("a[kind='delete']").on("click", function() {
        alert("Are you sure you want to delete the post?");
    })

    $("a[kind='delete']").hover(
        function() {
            $(this).css("text-decoration", "underline");
        }, function() {
            $(this).css("text-decoration", "none");
        }
    );

});