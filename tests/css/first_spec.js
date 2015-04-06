describe("Example", function() {

  var frame;        // Quixote test frame
  var logo;         // the logo element on the page
  var menu;         // the menu element

  // Create the test frame once for all your tests.
  // Here we load example.html. You can also create elements programmatically.
  before(function(done) {
    var options = { src: "/base/src/example.html" };
    frame = quixote.createFrame(options, done);
  });

  // Destroy the test frame after your tests are done.
  after(function() {
    frame.remove();
  });

  // Reset the test frame before (or after) each test. This is
  // faster than re-creating the frame for every test.
  beforeEach(function() {
    frame.reset();

    // Get the elements we want to test
    logo = frame.get("#logo");       // you can use any CSS selector
    menu = frame.get(".menu");
  });

  // Here's our test.
  it("positions menu below logo", function() {
    // The 'assert()' method checks multiple properties at once.
    // You can also use 'diff()' with your favorite assertion library.
    menu.assert({
      // We can check a hard-coded value
      left: 15,    // menu is 15px from left side of page

      // Or, better yet, check the relationship between elements
      top: logo.bottom.plus(10)   // menu is 10px below logo
    });
  });

  it("uses big font for menu", function() {
    // Sometimes, 'assert()' doesn't support what you need.
    // But you can check any CSS style you want by using 'getRawStyle()'.

    // Get the font size actually displayed in the browser
    var fontSize = menu.getRawStyle("font-size");  

    // Use your preferred assertion library (such as Chai) to make assertions.
    assert.equal(fontSize, "18px");
  });

});