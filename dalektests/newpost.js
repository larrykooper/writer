module.exports = {
    // Creating a new post
    
    'editorTest': function(test) {

        test.open('http://localhost:3000/admin')
           
            .type('#email', 'mary')
            .type('#password', 'secret')
            .submit()
            .assert.text('#welcome', 'Welcome to the blog posts admin!', 'I am on the post page')
            .click('#newPost')
            .screenshot('editor.png')
            .done();
    }
    
    
    
}