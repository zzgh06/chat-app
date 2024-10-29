describe('회원 가입', () => {
  beforeEach(() => {
    cy.visit('/sign-up');
  });

  it('빈 필드가 있을 경우 오류 표시', () => {
    cy.get('[data-testid=submit').click();
    cy.get('[data-testid=name-error').should('be.visible');
    cy.get('[data-testid=email-error').should('be.visible');
    cy.get('[data-testid=password-error').should('be.visible');
  });

  it('이메일 형식을 검증해야 합니다', () => {
    cy.get('[data-testid=name-input').type('Test User');
    cy.get('[data-testid=email-input').type('invalid-email');
    cy.get('[data-testid=password-input').type('password123')
    cy.get('[data-testid=submit').click();
    cy.get('[data-testid=email-error').should('contain', '잘못된 이메일 형식입니다');
  });

  it('비밀번호 길이를 검증해야 합니다', () => {
    cy.get('[data-testid=name-input').type('Test User');
    cy.get('[data-testid=email-input').type('test@example.com');
    cy.get('[data-testid=password-input').type('123')
    cy.get('[data-testid=submit').click();
    cy.get('[data-testid=password-error').should('contain', '비밀번호는 6자 이상이어야 합니다');
  });

  it('새 사용자를 성공적으로 등록해야 합니다', () => {
    const email = `test${Date.now()}@example.com`;

    cy.get('[data-testid=name-input').type('Test User');
    cy.get('[data-testid=email-input').type(email);
    cy.get('[data-testid=password-input').type('password123')
    cy.get('[data-testid=submit').click();

    cy.url().should('include', '/');
  });
})