var myNamespace = (function () {

    var doDeleteCall;

    doDeleteCall = function(foo) {
        // THE NUMBER 7 IS JUST A PLACEHOLDER. TODO: UPDATE THIS
        $.ajax({
            type: "DELETE",
            url: "/admin/posts/7"
        })
        .done(function(msg) {
            alert("Data has been deleted!" + msg);
        });
    };

$(document).ready(function() {
    
    $("#newPost").on("click", function() {
        window.location.replace('/admin/editor');
    })

    $("a[kind='delete']").on("click", function() {
        var postNumber = 7; // THE 7 IS JUST A PLACEHOLDER. TODO: UPDATE THIS
        var response=confirm("Are you sure you want to delete this post?");
        if (response) {
            console.log("You pressed OK");
            doDeleteCall(postNumber);
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

}());