describe('Digital Chronometer', () => {
  it('should default to 30 second timer', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="chronometer-h"]')
      .should('be.visible')
      .and('have.text', '0');

    cy.get('[data-testid="chronometer-hh"]')
      .should('be.visible')
      .and('have.text', '0');

    cy.get('[data-testid="chronometer-div"]')
      .should('be.visible')
      .and('have.text', ':');

    cy.get('[data-testid="chronometer-m"]')
      .should('be.visible')
      .and('have.text', '3');

    cy.get('[data-testid="chronometer-mm"]')
      .should('be.visible')
      .and('have.text', '0');
  })

  it('should allow setting new timer', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="chronometer-edit"]')
      .type('12');

    cy.get('[data-testid="chronometer-h"]')
      .should('be.visible')
      .and('have.text', '0');

    cy.get('[data-testid="chronometer-hh"]')
      .should('be.visible')
      .and('have.text', '0');

    cy.get('[data-testid="chronometer-div"]')
      .should('be.visible')
      .and('have.text', ':');

    cy.get('[data-testid="chronometer-m"]')
      .should('be.visible')
      .and('have.text', '1');

    cy.get('[data-testid="chronometer-mm"]')
      .should('be.visible')
      .and('have.text', '2');
  })

  it('should start and count down to 0', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="chronometer-edit"]')
      .type('2');

    cy.get('[data-testid="start"]')
      .click();

    cy.wait(3000);

    cy.get('[data-testid="chronometer-h"]')
      .should('be.visible')
      .and('have.text', '0');

    cy.get('[data-testid="chronometer-hh"]')
      .should('be.visible')
      .and('have.text', '0');

    cy.get('[data-testid="chronometer-div"]')
      .should('be.visible')
      .and('have.text', ':');

    cy.get('[data-testid="chronometer-m"]')
      .should('be.visible')
      .and('have.text', '0');

    cy.get('[data-testid="chronometer-mm"]')
      .should('be.visible')
      .and('have.text', '0');
  })

  it('should start and be stoppable', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="chronometer-edit"]')
      .type('12');

    cy.get('[data-testid="chronometer-m"]')
      .should('be.visible')
      .and('have.text', '1');

    cy.get('[data-testid="start"]')
      .click();

    cy.wait(1000);

    cy.get('[data-testid="stop"]')
      .click();

    cy.get('[data-testid="chronometer-m"]')
      .should('be.visible')
      .and('have.text', '1');

    cy.wait(5000);

    cy.get('[data-testid="chronometer-m"]')
      .should('be.visible')
      .and('have.text', '1');
  })
})

export {};