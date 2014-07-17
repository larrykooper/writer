module.exports = {
    // Login - should see admin posts page

    'adminTest': function(test) {

        test.open('http://localhost:3000/admin')
            .assert.text('h1', 'Writer Admin', 'Admin header is OK')
            .type('#email', 'mary')
            .type('#password', 'secret')
            .submit()
            .assert.text('#welcome', 'Blog posts admin', 'I am on the post page')
            .done();
    },

    // If not registered, you cannot log in
    
    'notRegTest': function(test) {

        test.open('http://localhost:3000/admin')
            .assert.exists('a[href="/logout"]', 'Logout link exists')
            .click('a[href="/logout"]')
            .type('#email', 'josh')
            .type('#password', 'invalid')
            .submit()
            .screenshot('dalektests/screenshots/josh.png')
            .assert.text('.error', 'Your username or password is incorrect', 'Error text is OK')
            .done();
    },

// If not logged in, you cannot access the editor page

   'notLoggedInTest': function(test) {
        test.open('http://localhost:3000/admin/editor')
            .assert.url('http://localhost:3000/admin', 'URL is as expected')
            .done();
    }
}