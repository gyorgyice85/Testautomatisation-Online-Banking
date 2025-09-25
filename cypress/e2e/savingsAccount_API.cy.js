//API test to verify the new account ID and the account type is SAVINGS
describe('GET /accounts/{accountId}', () => { 

    const apiBase = 'https://parabank.parasoft.com/parabank/services/bank';
    const accountId = 15675;
    

    it('Should return the new accountId and account type', () => {

        cy.request({
            method: 'GET',
            url: apiBase +'/accounts/' + accountId,
            headers: {
                accept:'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.id).to.be.eq(accountId);
            expect(response.body.type).to.be.eq('SAVINGS');


        })
    
    })
})
