//transfer funds between accounts - Accounts cannot be the same
describe('POST /transfer', () => { 

    const apiBase = 'https://parabank.parasoft.com/parabank/services/bank'; 
    const fromAccountId = 15786;
    const toAccountId = 15786;
    const amount = 500; //amount to transfer
    

    
    it('Should transfer funds between accounts', () => {

        cy.request({
            method: 'POST',
            url: `${apiBase}/transfer?fromAccountId=${fromAccountId}&toAccountId=${toAccountId}&amount=${amount}`,
            failOnStatusCode: false, // Prevent Cypress from failing the test on non-2xx status codes
            headers: {
                accept:'application/json',
            },
            
        }).then((response) => {
            //400 Bad Request (fromAccountId és toAccountId are same) or 422 Unprocessable Entity(the data is invalid)
            expect(response.status).to.be.oneOf([400, 422]);
            expect(response.body).to.contain('Could not find account number ' + fromAccountId + ' and/or ' + toAccountId);
            

        

        })    
    })
})