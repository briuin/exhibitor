describe('Registration API Payload Validation', () => {
  it('should validate the API payload when registering', () => {
    cy.intercept('POST', '/api/add-exhibitor', (req) => {
      expect(req.body).to.include({
        S_added_via: 'Web Form',
        S_company: 'TEST',
        S_email_address: 'ex@example.com',
        S_name_on_badge: 'name',
        S_job_title: 'job',
        S_country: 'FR',
        S_company_on_badge: 'company',
        SB_event_fha: true,
        SB_event_prowine: false
      });

      req.reply({
        statusCode: 200,
        body: { success: true },
      });
    }).as('register');

    cy.visit('/');

    cy.get('input[type="radio"][value="FHA-Food & Beverage"]').check({ force: true });
    cy.get('[formControlName="company"] .dropdown-toggle').click();
    cy.get('.dropdown-item').contains('TEST').click();

    cy.get('[formControlName="email"]').eq(0).type('ex@example.com');
    cy.get('[formControlName="badgeName"]').eq(0).type('name');
    cy.get('[formControlName="jobTitle"]').eq(0).type('job');
    cy.get('[formControlName="country"] .dropdown-toggle').click();
    cy.get('.dropdown-item').contains('France').click();
    cy.get('[formControlName="badgeCompany"]').eq(0).type('company');

    cy.get('[data-spec="register-button"]').click();

    cy.wait('@register').its('response.statusCode').should('eq', 200);
  });
});
