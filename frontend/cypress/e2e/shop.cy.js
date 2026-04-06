describe('Zappify Shop Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the homepage with products', () => {
    cy.contains('Zappify').should('be.visible');
    cy.get('.product-card').should('have.length.greaterThan', 0);
  });

  it('can search for a product', () => {
    cy.get('input[placeholder*="looking for"]').type('Nike', { force: true });
    cy.get('.product-card').should('have.length.greaterThan', 0);
  });

  it('can open product detail page', () => {
    cy.get('.product-card').first().click();
    cy.contains('ADD TO CART').should('be.visible');
    cy.contains('SELECT SIZE').should('be.visible');
  });

  it('can add product to cart', () => {
    cy.get('.product-card').first().click();
    cy.get('.size-btn').first().click();
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alert');
    });
    cy.contains('ADD TO CART').click();
    cy.get('@alert').should('have.been.called');
  });

  it('can open cart drawer', () => {
    cy.get('[title="Cart"]').click();
    cy.contains('SHOPPING BAG').should('be.visible');
  });

  it('can open wishlist drawer', () => {
    cy.get('[title="Wishlist"]').click();
    cy.contains('MY WISHLIST').should('be.visible');
  });

  it('login flow works', () => {
    const user = { name: 'Test User', email: 'test@zappify.com', picture: null };
    cy.window().then((win) => {
      win.localStorage.setItem('zappify_user', JSON.stringify(user));
    });
    cy.reload();
    cy.get('img.user-avatar').should('be.visible');
  });
});
