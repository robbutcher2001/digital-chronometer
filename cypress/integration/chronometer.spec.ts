describe('Digital Chronometer', () => {
  it('should default to 30 second timer', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="chronometer-m"]')
      .should('be.visible')
      .and('have.text', '0');

    cy.get('[data-testid="chronometer-mm"]')
      .should('be.visible')
      .and('have.text', '0');

    cy.get('[data-testid="chronometer-div"]')
      .should('be.visible')
      .and('have.text', ':');

    cy.get('[data-testid="chronometer-s"]')
      .should('be.visible')
      .and('have.text', '3');

    cy.get('[data-testid="chronometer-ss"]')
      .should('be.visible')
      .and('have.text', '0');
  });

  it('should allow setting new time', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="chronometer-edit"]')
      .type('12');

    cy.get('[data-testid="chronometer-m"]')
      .should('be.visible')
      .and('have.text', '0');

    cy.get('[data-testid="chronometer-mm"]')
      .should('be.visible')
      .and('have.text', '0');

    cy.get('[data-testid="chronometer-div"]')
      .should('be.visible')
      .and('have.text', ':');

    cy.get('[data-testid="chronometer-s"]')
      .should('be.visible')
      .and('have.text', '1');

    cy.get('[data-testid="chronometer-ss"]')
      .should('be.visible')
      .and('have.text', '2');
  });

  it('should infer time from invalid user second entry', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="chronometer-edit"]')
      .type('60');

    cy.get('[data-testid="chronometer-m"]')
      .should('be.visible')
      .and('have.text', '0');

    cy.get('[data-testid="chronometer-mm"]')
      .should('be.visible')
      .and('have.text', '1');

    cy.get('[data-testid="chronometer-div"]')
      .should('be.visible')
      .and('have.text', ':');

    cy.get('[data-testid="chronometer-s"]')
      .should('be.visible')
      .and('have.text', '0');

    cy.get('[data-testid="chronometer-ss"]')
      .should('be.visible')
      .and('have.text', '0');
  });

  it('should infer time from invalid user minute entry', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="chronometer-edit"]')
      .type('6000');

    cy.get('[data-testid="chronometer-m"]')
      .should('be.visible')
      .and('have.text', '0');

    cy.get('[data-testid="chronometer-mm"]')
      .should('be.visible')
      .and('have.text', '0');

    cy.get('[data-testid="chronometer-div"]')
      .should('be.visible')
      .and('have.text', ':');

    cy.get('[data-testid="chronometer-s"]')
      .should('be.visible')
      .and('have.text', '0');

    cy.get('[data-testid="chronometer-ss"]')
      .should('be.visible')
      .and('have.text', '0');
  });

  it('should start and count down to 0', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="chronometer-edit"]')
      .type('2');

    cy.get('[data-testid="stop"]')
      .should('be.disabled');

    cy.get('[data-testid="start"]')
      .should('be.enabled')
      .click();

    cy.wait(500);

    cy.get('[data-testid="stop"]')
      .should('be.enabled');

    cy.get('[data-testid="start"]')
      .should('be.disabled');

    cy.wait(2500);

    cy.get('[data-testid="chronometer-m"]')
      .should('be.visible')
      .and('have.text', '0');

    cy.get('[data-testid="chronometer-mm"]')
      .should('be.visible')
      .and('have.text', '0');

    cy.get('[data-testid="chronometer-div"]')
      .should('be.visible')
      .and('have.text', ':');

    cy.get('[data-testid="chronometer-s"]')
      .should('be.visible')
      .and('have.text', '0');

    cy.get('[data-testid="chronometer-ss"]')
      .should('be.visible')
      .and('have.text', '0');
  });

  it('should start and be stoppable', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="chronometer-edit"]')
      .type('12');

    cy.get('[data-testid="chronometer-s"]')
      .should('be.visible')
      .and('have.text', '1');

    cy.get('[data-testid="stop"]')
      .should('be.disabled');

    cy.get('[data-testid="start"]')
      .should('be.enabled')
      .click();

    cy.wait(1000);

    cy.get('[data-testid="stop"]')
      .should('be.enabled');

    cy.get('[data-testid="start"]')
      .should('be.disabled');

    cy.get('[data-testid="stop"]')
      .click();

    cy.get('[data-testid="chronometer-s"]')
      .should('be.visible')
      .and('have.text', '1');

    cy.wait(5000);

    cy.get('[data-testid="chronometer-s"]')
      .should('be.visible')
      .and('have.text', '1');
  });
})

export {};