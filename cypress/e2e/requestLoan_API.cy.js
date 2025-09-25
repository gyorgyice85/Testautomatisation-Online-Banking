//Verify successful submission of application for a loan
describe('POST /requestLoan', () => { 

    const apiBase = 'https://parabank.parasoft.com/parabank/services/bank';
    const customerId = Cypress.env('customerId');
    let amount = 500; //loan amount
    let downPayment = 100; //down payment
    let fomAccountId = Cypress.env('accountId'); 

    it('Should successfully request a loan', () => {

        cy.request({
            method: 'POST',
            url: `${apiBase}/requestLoan?customerId=${customerId}&amount=${amount}&downPayment=${downPayment}&fromAccountId=${fomAccountId}`,
            failOnStatusCode: false,
            headers: {
                accept:'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
            expect(response.body).to.have.property('responseDate');
            expect(response.body).to.have.property('loanProviderName');
            expect(response.body).to.have.property('approved', true);

            if (response.body.message) {
                expect(response.body.message).to.be.a('string');
            } else {
                cy.log('Message property is not returned in this response');
            }

            expect(response.body).to.have.property('accountId').that.is.a('number');
            


        })
    })
})