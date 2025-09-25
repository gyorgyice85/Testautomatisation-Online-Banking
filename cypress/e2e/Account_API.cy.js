//API test to verify the account balance is 3000 USD
describe('GET /accounts/{accountId}', () => { 

    const apiBase = 'https://parabank.parasoft.com/parabank/services/bank';
    const accountId = Cypress.env('accountId');
    

    it('Should return the starting balance = 3000 USD', () => {

        cy.request({
            method: 'GET',
            url: apiBase +'/accounts/' + accountId,
            headers: {
                accept:'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.balance).to.be.equal(3000); 

        })
    })
})

