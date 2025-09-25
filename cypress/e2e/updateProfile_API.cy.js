//Update profile API test
describe('POST /customer/update/{customerId}', () => { 

    const apiBase = 'https://parabank.parasoft.com/parabank/services/bank';
    const customerId = Cypress.env('customerId');
    let username = Cypress.env('username'); 
    let password = Cypress.env('password'); 
    let firstName = Cypress.env('firstName'); 
    let lastName = Cypress.env('lastName'); 
    let street = Cypress.env('street'); 
    let city = Cypress.env('city'); 
    let state = Cypress.env('state'); 
    let zipCode = Cypress.env('zipCode'); 
    let phoneNumber = Cypress.env('phoneNumber'); 
    let ssn = Cypress.env('ssn'); 


    it('Should successfully update the profile', () => {

        cy.request({
            method: 'POST',
            url: `${apiBase}/customers/update/${customerId}`,
            failOnStatusCode: false,
            qs: {
                customerId : customerId,
                firstName: firstName,
                lastName: lastName,
                street: street,
                city: city,
                state: state,
                zipCode: zipCode,
                phoneNumber: phoneNumber,
                ssn: ssn,
                username: username,
                password: password,

            },
            headers: {
                accept:'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.contain("Successfully updated customer profile");

            


        })
    })
})