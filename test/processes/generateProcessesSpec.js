describe("Generate Porcesses", function(){
  it("contains spec with an expectation", function(){
    expect(true).toBe(true);
  });

});

describe("A suite is just a function", function() {
  var a;

  it("and so is a spec", function() {
    a = "apple";

    expect(a).toBe("apple");
  });

  it("The 'toMatch' matcher is for regular expressions", function() {
    var message = "foo bar baz 中文";

    expect(message).toMatch(/bar/);
    expect(message).toMatch("bar 中文");
    expect(message).not.toMatch(/quux/);
  });
});