describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/auth/signin');
  });

  it('should show validation errors', () => {
    cy.get('[data-testid=submit]').click();
    cy.get('[data-testid=email-error]').should('be.visible');
    cy.get('[data-testid=password-error]').should('be.visible');
  });

  it('should sign in successfully', () => {
    cy.get('[data-testid=email-input]').type('test@example.com');
    cy.get('[data-testid=password-input]').type('password123');
    cy.get('[data-testid=submit]').click();
    cy.url().should('include', '/chat');
  });

  it('should handle invalid credentials', () => {
    cy.get('[data-testid=email-input]').type('wrong@example.com');
    cy.get('[data-testid=password-input]').type('wrongpassword');
    cy.get('[data-testid=submit]').click();
    cy.get('[data-testid=auth-error]').should('be.visible');
  });

  it('should redirect to sign in when accessing protected routes', () => {
    cy.visit('/chat');
    cy.url().should('include', '/auth/signin');
  });
});