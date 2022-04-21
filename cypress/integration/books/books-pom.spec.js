import ApiRequests from "../../fixtures/requests/api-requests";

let bookId;

context("API Requests", () => {
  before(() => {
    //Generate random title using Faker to use in the group of tests
    ApiRequests.title;
  });

  it("Create a book", () => {
    //Send Post Request to create new book with title generated above
    ApiRequests.createBook.then((response) => {
      //Reassign Book ID variable to this response
      bookId = response.body.id;
      //Send a GET Request to check that book was created successfully
      ApiRequests.getMyBook(bookId).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.title).to.eq(ApiRequests.title);
      });
    });
  });

  it("Get all books", () => {
    //Send GET Request to get all the books
    ApiRequests.getAllBooks.then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.not.be.null;
    });
  });

  it("Get my book", () => {
    //Send GET Request to get the book I've created on the first test
    ApiRequests.getMyBook(bookId).should((response) => {
      //Verification that title matches the title created randomly in before() hook
      expect(response.body.title).to.eq(ApiRequests.title);
      expect(response.body.author).to.eq("Lucas Smit");
    });
  });

  it("Update my book", () => {
    //Send a PUT Request to update title and author
    ApiRequests.updateMyBook(bookId).then(() => {
      //Send a GET Request to get updated book and verify the result
      ApiRequests.getMyBook(bookId).should((response) => {
        expect(response.body.title).to.eq("New Title");
        expect(response.body.author).to.eq("Lucas S.");
      });
    });
  });

  it("Delete my book", () => {
    //Send a DELETE Request to delete the book I've created
    ApiRequests.deleteMyBook(bookId).then((response) => {
      expect(response.status).to.eq(200);
      ApiRequests.getError(bookId).should((response) => {
        //Verify that book was deleted
        expect(response.status).to.eq(404);
      });
    });
  });
});
