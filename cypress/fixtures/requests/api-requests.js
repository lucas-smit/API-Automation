const faker = require("faker");
import Links from "../API.links.json";

let title;

class ApiRequests {
  //Generate random title using Faker to use in the group of tests
  title = "New Book " + faker.datatype.number();

  //Send Post Request to create new book with title generated above
  get createBook() {
    return cy.request("POST", Links.POST, {
      title: this.title,
      author: "Lucas Smit",
    });
  }

  //Send GET Request to get all the books
  get getAllBooks() {
    return cy.request(Links["GET ALL"]);
  }

  //Send GET Request to get the book I've created
  getMyBook(bookId) {
    return cy.request("GET", Links.GET + bookId);
  }

  //Send a PUT Request to update title and author
  updateMyBook(bookId) {
    return cy.request("PUT", Links.PUT + bookId, {
      title: "New Title",
      author: "Lucas S.",
    });
  }

  //Send a DELETE Request to delete the book I've created
  deleteMyBook(bookId) {
    return cy.request("DELETE", Links.DELETE + bookId);
  }

  //Send a GET request and check that it fails after book is deleted
  getError(bookId) {
    return cy.request({
      url: Links.GET + bookId,
      failOnStatusCode: false,
    });
  }
}

// Allow other files to import it
export default new ApiRequests();
