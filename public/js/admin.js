var myNamespace = (function () {

    var doDeleteCall, deletePostFromAdmin;

    doDeleteCall = function(postNumber) {
        $.ajax({
            type: "DELETE",
            url: "/admin/posts/" + postNumber
        })
        .done(function(data, textStatus, jqXHR) {
            deletePostFromAdmin(data);
        });
    };

    deletePostFromAdmin = function(postObject) {
        postId = postObject.post;
        $("#"+postId).remove();
    };

$(document).ready(function() {
    
    $("#newPost").on("click", function() {
        window.location.replace('/admin/editor');
    })

    $("a[kind='delete']").on("click", function() {
        var postNumber = $(this).data("id")
        var response=confirm("Are you sure you want to delete this post?");
        if (response) {
            console.log("You pressed OK");
            doDeleteCall(postNumber);
        } else {
            console.log("You pressed cancel");
        }
    })

    $(".user-actions a").hover(
        function() {
            $(this).css("text-decoration", "underline");
        }, function() {
            $(this).css("text-decoration", "none");
        }
    );

});

}());