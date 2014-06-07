//var should = require('should');

module.exports = {
    signIn: function signIn(username, password, callback) {
        this.browser
            .fill("#email", username)
            .fill("#password", password)
            .pressButton("#signin", callback);

    },

    page: function(path) {
        return "http://localhost:3000/" + path;
    },

    visit: function(url, callback) {
        if (url.indexOf("http") == - 1) {
            this.browser.visit(this.page(url), callback);
        }
        else {
            this.browser.visit(url, callback);
        }
    },

    urlShouldContain: function(text) {
        this.browser.location.pathname.should.include(text);
    },

    pressButton: function(buttonID, callback) {
        var selector = '#' + buttonID;
        this.browser.pressButton(selector, callback);
    }

};