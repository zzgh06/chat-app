describe('Chat Room Access', () => {
  beforeEach(() => {
    cy.login(); 
  });

  it('should load chat rooms', () => {
    cy.visit('/chat');
    cy.get('[data-testid=room-list]').should('exist');
    cy.get('[data-testid=room-item]').should('have.length.at.least', 1);
  });
});