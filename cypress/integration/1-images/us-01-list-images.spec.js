/// <reference types="cypress" />

context("List Images", () => {
  it("returns a list of images" , () => {
    cy.request("/images").should((response) => {
        expect(response.body).to.have.property("data")
        expect(response).to.have.property("headers")
      });
  })
});
