//transfer funds between accounts -  if the starting account goes into negative territory,
describe('GET /accounts/{accountId}', () => { 

    const apiBase = 'https://parabank.parasoft.com/parabank/services/bank'; 
    const fromAccountId = Cypress.env('fromAccountId');
    
    
    it('Should return the new balance of the fromAccountId', () => {

        cy.request({
            method: 'GET',
            url: apiBase +'/accounts/' + fromAccountId,
            headers: {
                accept:'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.id).to.be.eq(fromAccountId);
            expect(response.body.balance).to.be.greaterThan(-1);
            cy.log('Balance of the from account: ' + response.body.balance);


        })
    
    })
})