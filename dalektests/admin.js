module.exports = {
    // Login - should see admin posts page 
    'adminTest': function(test) {
        test.open('http://localhost:3000/admin')
            .assert.text('h1', 'Writer Admin', 'Admin header is OK')
            .type('#email', 'mary')
            .type('#password', 'secret')
            .submit()
            .screenshot('after-submit.png')
            .assert.text('#welcome', 'Welcome to the blog posts admin!')
            .done();
    }
    
}