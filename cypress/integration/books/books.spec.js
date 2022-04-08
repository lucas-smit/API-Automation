const faker = require("faker");
import Links from "../../fixtures/API.links.json";

let title;
let bookId;

context("API Requests", () => {
  before(() => {
    //Generate random title using Faker to use in the group of tests
    title = "New Book " + faker.datatype.number();
  });

  it("Create a book", () => {
    //Send Post Request to create new book with title generated above
    cy.request("POST", Links.POST, {
      title: title,
      author: "Lucas Smit",
    }).then((response) => {
      //Reassign Book ID variable to this response
      bookId = Links.GET + response.body.id;
      //Send a GET Request to check that book was created successfully
      cy.request(Links.GET + response.body.id).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.title).to.eq(title);
      });
    });
  });

  it("Get all books", () => {
    //Send GET Request to get all the books
    cy.request(Links["GET ALL"]).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.not.be.null;
    });
  });

  it("Get my book", () => {
    //Send GET Request to get the book I've created on the first test
    cy.request("GET", bookId).then((response) => {
      //Verification that title matches the title created randomly in before() hook
      expect(response.body.title).to.eq(title);
    });
  });

  it("Update my book", () => {
    //Send a PUT Request to update title and author
    cy.request("PUT", bookId, {
      title: "New Title",
      author: "Lucas S.",
    }).then(() => {
      //Send a GET Request to get updated book and verify the result
      cy.request("GET", bookId).then((response) => {
        expect(response.body.title).to.eq("New Title");
        expect(response.body.author).to.eq("Lucas S.");
      });
    });
  });

  it("Delete my book", () => {
    //Send a DELETE Request to delete the book I've created
    cy.request("DELETE", bookId).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
