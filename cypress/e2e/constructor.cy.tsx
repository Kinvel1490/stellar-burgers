const baseURL = 'https://norma.nomoreparties.space/api';

describe('get ingredients test', () => {
  it('ingredient load test', () => {
    cy.fixture('mockIngredients.json').then((ingredientsFixture) => {
      cy.intercept('GET', `${baseURL}/ingredients`, ingredientsFixture).as(
        'getIngredients'
      );
    });
    cy.visit('/');
    cy.wait('@getIngredients').then(() => {
      cy.get('[data-cy="addIngredient_643d69a5c3f7b9001cfa093c"]')
        .find('.common_button')
        .click();
      cy.get('[data-cy="addIngredient_643d69a5c3f7b9001cfa0941"]')
        .find('.common_button')
        .click();
      cy.get('[data-cy="addIngredient_643d69a5c3f7b9001cfa0943"]')
        .find('.common_button')
        .click();

      cy.get('.constructor-element_pos_top').should(
        'contain.text',
        'Краторная булка N-200i'
      );
      cy.get('.constructor-element_pos_bottom').should(
        'contain.text',
        'Краторная булка N-200i'
      );
      cy.get('[data-constructoringredient="643d69a5c3f7b9001cfa0941"]').should(
        'contain.text',
        'Биокотлета из марсианской Магнолии'
      );
      cy.get('[data-constructoringredient="643d69a5c3f7b9001cfa0943"]').should(
        'contain.text',
        'Соус фирменный Space Sauce'
      );
    });
  });
});

describe('Modals test', () => {
  it('Ingredient modal test', () => {
    cy.fixture('mockIngredients.json').then((ingredientsFixture) => {
      cy.intercept('GET', `${baseURL}/ingredients`, ingredientsFixture).as(
        'getIngredients'
      );
    });
    cy.visit('/');
    cy.wait('@getIngredients').then(() => {
      cy.get('[href^="/ingredients/"]').eq(0).click();
      cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa093c');
      cy.get('#modals').children('div').eq(0).should('be.visible');
      cy.get('#modals').children('div').eq(1).should('be.hidden');
      cy.get('#modals')
        .find('[data-cy="modal-content"]')
        .find('h3')
        .should('contain.text', 'Краторная булка N-200i');
      cy.get('#modals')
        .find('[data-cy="modal-content"]')
        .find('[data-cy="modal-closeButton"')
        .click();
      cy.url().should('eq', `http://localhost:4000/`);
      cy.get('[href^="/ingredients/"]').eq(0).click();
      cy.get('#modals')
        .find('[data-cy="modal-overlay"]')
        .should('have.css', 'z-index', '2')
        .should('have.css', 'position', 'fixed')
        .click({ force: true });
      cy.url().should('eq', `http://localhost:4000/`);
    });
  });
});

describe('Burger order test', () => {
  it('making order test', () => {
    cy.fixture('mockIngredients.json').then((ingredientsFixture) => {
      cy.intercept('GET', `${baseURL}/ingredients`, ingredientsFixture).as(
        'getIngredients'
      );
    });
    cy.fixture('mockUser.json').then((mockUser) => {
      cy.intercept('GET', `${baseURL}/auth/user`, mockUser).as('getUser');
      cy.intercept('POST', `${baseURL}/auth/login`, mockUser).as('loginUser');
    });
    cy.fixture('mockOrderResponse').then((mockBurgerOrderResponse) => {
      cy.intercept('POST', `${baseURL}/orders`, mockBurgerOrderResponse).as(
        'makeOrder'
      );
    });
    cy.fixture('mockOrderByNumber.json').then((mockOrderByNumber) => {
      cy.intercept('GET', `${baseURL}/orders/89266`, mockOrderByNumber).as(
        'getOrderByNumber'
      );
    });
    cy.visit('/');
    cy.get('a[href="/profile"]').click();
    cy.url().should('include', '/login');
    cy.get('[type="submit"]').click();
    cy.url().should('include', '/profile');
    cy.visit('/');
    cy.get('[data-cy="addIngredient_643d69a5c3f7b9001cfa093c"]')
      .find('.common_button')
      .click();
    cy.get('[data-cy="addIngredient_643d69a5c3f7b9001cfa0941"]')
      .find('.common_button')
      .click();
    cy.get('[data-cy="addIngredient_643d69a5c3f7b9001cfa0943"]')
      .find('.common_button')
      .click();
    cy.getCookie('accessToken').should(
      'have.property',
      'value',
      encodeURI('Bearer Fake.access.token')
    );
    cy.getAllLocalStorage().then((result) => {
      expect(result).to.deep.equal({
        'http://localhost:4000': {
          refreshToken: 'fakeRefreshToken'
        }
      });
    });
    cy.get('.button_type_primary.button_size_large').click();
    cy.wait('@getOrderByNumber').then(() => {
      cy.get('#modals').find('[data-cy="modal-content"]').should('be.visible');
      cy.get('#modals')
        .find('[data-cy="modal-content"]')
        .find('h2.text_type_digits-large')
        .should('contain.text', '89266');
      cy.get('#modals')
        .find('[data-cy="modal-content"]')
        .find('button[type="button"]')
        .eq(1)
        .click();
      cy.get('#modals').should('be.empty');
      cy.get('[data-cy="bun-top-empty"]').should(
        'contain.text',
        'Выберите булки'
      );
      cy.get('[data-cy="bun-bottom-empty"]').should(
        'contain.text',
        'Выберите булки'
      );
      cy.get('[data-cy="ingredients-empty"]').should(
        'contain.text',
        'Выберите начинку'
      );
    });
    cy.clearLocalStorage();
    cy.clearCookies({
      domain: 'hhtp://localhost:4000/'
    });
  });
});
