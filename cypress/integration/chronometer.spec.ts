describe("Digital Chronometer", () => {
  it("should default to 30 second timer", () => {
    cy.visit("http://localhost:3000");

    cy.get("form").submit();

    cy.get('[data-testid="chronometer-m"]')
      .should("be.visible")
      .and("have.text", "0");

    cy.get('[data-testid="chronometer-mm"]')
      .should("be.visible")
      .and("have.text", "0");

    cy.get('[data-testid="chronometer-div"]')
      .should("be.visible")
      .and("have.text", ":");

    cy.get('[data-testid="chronometer-s"]')
      .should("be.visible")
      .and("have.text", "3");

    cy.get('[data-testid="chronometer-ss"]')
      .should("be.visible")
      .and("have.text", "0");
  });

  it("should allow toggling of edit time mode", () => {
    cy.visit("http://localhost:3000");

    cy.get("form").submit();

    cy.get('[data-testid="chronometer-toggle-edit"]').click();

    cy.get("form").submit();

    cy.get('[data-testid="chronometer-toggle-edit"]').click();
  });

  it("should allow setting new time", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="chronometer-edit"]').clear().type("12");

    cy.get("form").submit();

    cy.get('[data-testid="chronometer-m"]')
      .should("be.visible")
      .and("have.text", "0");

    cy.get('[data-testid="chronometer-mm"]')
      .should("be.visible")
      .and("have.text", "0");

    cy.get('[data-testid="chronometer-div"]')
      .should("be.visible")
      .and("have.text", ":");

    cy.get('[data-testid="chronometer-s"]')
      .should("be.visible")
      .and("have.text", "1");

    cy.get('[data-testid="chronometer-ss"]')
      .should("be.visible")
      .and("have.text", "2");
  });

  it("should infer time from invalid user second entry", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="chronometer-edit"]').clear().type("60");

    cy.get("form").submit();

    cy.get('[data-testid="chronometer-m"]')
      .should("be.visible")
      .and("have.text", "0");

    cy.get('[data-testid="chronometer-mm"]')
      .should("be.visible")
      .and("have.text", "1");

    cy.get('[data-testid="chronometer-div"]')
      .should("be.visible")
      .and("have.text", ":");

    cy.get('[data-testid="chronometer-s"]')
      .should("be.visible")
      .and("have.text", "0");

    cy.get('[data-testid="chronometer-ss"]')
      .should("be.visible")
      .and("have.text", "0");
  });

  it("should infer time from invalid user minute entry", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="chronometer-edit"]').clear().type("6000");

    cy.get("form").submit();

    cy.get('[data-testid="chronometer-m"]')
      .should("be.visible")
      .and("have.text", "6");

    cy.get('[data-testid="chronometer-mm"]')
      .should("be.visible")
      .and("have.text", "0");

    cy.get('[data-testid="chronometer-div"]')
      .should("be.visible")
      .and("have.text", ":");

    cy.get('[data-testid="chronometer-s"]')
      .should("be.visible")
      .and("have.text", "0");

    cy.get('[data-testid="chronometer-ss"]')
      .should("be.visible")
      .and("have.text", "0");
  });

  it("should start and count down to 0", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="chronometer-edit"]').clear().type("2");

    cy.get("form").submit();

    cy.get('[data-testid="stop"]').should("be.disabled");

    cy.get('[data-testid="start"]').should("be.enabled").click();

    cy.wait(500);

    cy.get('[data-testid="stop"]').should("be.enabled");

    cy.get('[data-testid="start"]').should("be.disabled");

    cy.wait(2500);

    cy.get('[data-testid="chronometer-m"]')
      .should("be.visible")
      .and("have.text", "0");

    cy.get('[data-testid="chronometer-mm"]')
      .should("be.visible")
      .and("have.text", "0");

    cy.get('[data-testid="chronometer-div"]')
      .should("be.visible")
      .and("have.text", ":");

    cy.get('[data-testid="chronometer-s"]')
      .should("be.visible")
      .and("have.text", "0");

    cy.get('[data-testid="chronometer-ss"]')
      .should("be.visible")
      .and("have.text", "0");
  });

  it("should start and be stoppable", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="chronometer-edit"]').clear().type("12");

    cy.get("form").submit();

    cy.get('[data-testid="chronometer-s"]')
      .should("be.visible")
      .and("have.text", "1");

    cy.get('[data-testid="stop"]').should("be.disabled");

    cy.get('[data-testid="start"]').should("be.enabled").click();

    cy.wait(1000);

    cy.get('[data-testid="stop"]').should("be.enabled");

    cy.get('[data-testid="start"]').should("be.disabled");

    cy.get('[data-testid="stop"]').click();

    cy.get('[data-testid="chronometer-s"]')
      .should("be.visible")
      .and("have.text", "1");

    cy.wait(5000);

    cy.get('[data-testid="chronometer-s"]')
      .should("be.visible")
      .and("have.text", "1");
  });

  it("should provide share button that copies URL to clipboard", () => {
    cy.visit("http://localhost:3000", {
      onBeforeLoad(window: Window): void {
        cy.spy(window.navigator.clipboard, "writeText").as("copySpy");
      },
    });

    cy.get(".share button").click();

    cy.get("@copySpy").should("be.calledWithExactly", "http://localhost:3000/");
  });

  it("should show share confirmation only when share button is clicked and hide on unfocus", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="share_confirmed"]').should("not.exist");

    cy.get(".share button").click();

    cy.get('[data-testid="share_confirmed"]')
      .should("exist")
      .should("be.visible");

    cy.get('[data-testid="chronometer-edit"]').click();

    cy.get('[data-testid="share_confirmed"]').should("not.exist");
  });

  it("should show tips", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="tips"]').should("be.exist");

    cy.get('[data-testid="tips"] h1').should("be.exist");

    cy.get('[data-testid="tips"] h2').should("be.exist");

    cy.get('[data-testid="tips"] ul').should("be.exist");

    cy.get('[data-testid="tips"] ul li').should("be.exist");
  });
});

export {};
