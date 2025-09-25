//After registration opening a new account and verify the account balance is 3000 USD
describe('Open a new account', () => {

    const username = Cypress.env('username');
    const password = Cypress.env('password');
    let newAccountId;
    let balance;
    let fromAccountId;
    let toAccountId;
    const startingBalance = 3000;
    const amount = 500;
    const loanAmount = 500;
    const downPayment = 100;
    

    
    beforeEach(() => {

        cy.visit('https://parabank.parasoft.com');

        expect(username, 'Cypress.env("username")').to.be.a('string').and.not.be.empty;
        expect(password, 'Cypress.env("password")').to.be.a('string').and.not.be.empty;

        cy.get('#loginPanel').should('be.visible').find('form[name="login"]').should('exist');
        cy.log('Username:', Cypress.env('username'));
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(password, { log: false });
        cy.get('input[value="Log In"]').click();

    })

    //Open a new account (CHECKING) and verify the account balance is 3000 USD
    it('Open a new account - test', () => {

        cy.get('#leftPanel').should('be.visible');
        cy.get('#leftPanel').contains('a','Open New Account').click();

        cy.get('#openAccountForm').should('be.visible');
        cy.get('#type').select('CHECKING').should('have.value', '0');

        cy.get('#fromAccountId option').first().then(option => {
        cy.get('#fromAccountId').select(option.val());
        });

        cy.get('input[value = "Open New Account"]').click();

        cy.get('#openAccountResult').should('be.visible');
        cy.get('#openAccountResult').contains('Congratulations, your account is now open.');
        cy.get('#openAccountResult').contains('Your new account number:');
        cy.get('#newAccountId').should('be.visible')
        .invoke('text')
        .should('not.be.empty')
        .then((text) => {
            newAccountId = text.trim(); 
            cy.log('New account ID: ' + newAccountId);
        
            cy.contains('Accounts Overview').should('be.visible').click();
            cy.get('#accountTable').should('be.visible');
            cy.get('#accountTable tr td:first-child a').contains(newAccountId).should('exist')
            .then(($el) => {
                balance = $el.parent().next().text().trim();
                cy.log('Balance of the new account: ' + balance);

                expect(balance).to.eq(startingBalance.toString());
    
            });
         });   
         
    })

    //Open a SAVINGS account
    it('Open a Savings account - test', () => {

        cy.get('#leftPanel').should('be.visible');
        cy.get('#leftPanel').contains('a','Open New Account').click();

        cy.get('#openAccountForm').should('be.visible');
        cy.get('#type').select('SAVINGS').should('have.value', '1');

        cy.get('#fromAccountId option').first().then(option => {
        cy.get('#fromAccountId').select(option.val());
        });

        cy.get('input[value = "Open New Account"]').click();

        cy.get('#openAccountResult').should('be.visible');
        cy.get('#openAccountResult').contains('Your new account number:');
        cy.get('#newAccountId').should('be.visible').click();
        cy.get('#accountDetails').should('be.visible');
        
    });

    //Transfer funds between accounts 
    it('Overdraft - test', () => { 
        cy.get('#leftPanel').contains('a','Transfer Funds').click();
        cy.get('#transferApp').should('be.visible');
        cy.get('#amount').type(amount);

        cy.get('#fromAccountId option').then(options => {
            
            const randomOption = options[Math.floor(Math.random() * options.length)];
            cy.get('#fromAccountId').select(randomOption.value);
            fromAccountId = randomOption.value;
            cy.get('#fromAccountId').select(fromAccountId.toString()).should('have.value', fromAccountId.toString());
            cy.log('From account ID: ' + fromAccountId);
        
            cy.get('#toAccountId option').then(options => {
                const randomOption = options[Math.floor(Math.random() * options.length)];
                cy.get('#toAccountId').select(randomOption.value);
                toAccountId = (randomOption.value);
                cy.get('#toAccountId').select(toAccountId.toString()).should('have.value', toAccountId.toString());
                cy.log('To account ID: ' + toAccountId);

                if(fromAccountId === toAccountId) {
                    cy.get('.error-mesage').should('be.visible')
                    .and('contain', 'From and To account cannot be the same.');
                } else {
                    cy.get('input[value = "Transfer"]').click();
                    cy.get('#showResult').should('be.visible');
                }

                expect(fromAccountId).to.not.eq(toAccountId);

                cy.get('#amountResult').should('contain', amount.toString());
                cy.get('#fromAccountIdResult').should('contain', fromAccountId.toString());
                cy.get('#toAccountIdResult').should('contain', toAccountId.toString());
            }); 
        

            cy.contains('Accounts Overview').should('be.visible').click();
            cy.get('#accountTable tr td:first-child a').contains(fromAccountId).should('exist')
            .then(($el) => {
                let newBalance = $el.parent().next().text().trim();
                newBalance = Number(newBalance.replace(/[^0-9.-]+/g,""));
                expect(newBalance).to.be.greaterThan(-1);    
                cy.log('New balance of the ' + fromAccountId + ': ' + newBalance);  
    
        });

     });  

    })
    //Loan application
    it('Loan - test', () => {

            cy.get('#leftPanel').should('be.visible');
            cy.get('#leftPanel').contains('a','Request Loan').click();

            cy.get('#requestLoanForm').should('be.visible');
            cy.get('#amount').type(loanAmount);
            expect(loanAmount).to.exist;
            expect(loanAmount).to.be.a('number');
            expect(loanAmount).to.be.greaterThan(0);
            if(downPayment !== ' ' && downPayment !==null && downPayment !== undefined) {
            cy.get('#downPayment').type(downPayment);
            }
            cy.get('#fromAccountId option').first().then(option => {
                cy.get('#fromAccountId').select(option.val());
            }); 
            cy.get('input[value = "Apply Now"]').click();
            cy.get('#requestLoanResult').should('be.visible');


    })
    //Validate the updated profile information on the UI
    it('Should return the updated Infos ', () => { 

        cy.get('#leftPanel').contains('a','Update Contact Info').click();
        
        cy.get('#customer\\.firstName').should('have.value', Cypress.env('firstName'));
        cy.get('#customer\\.lastName').should('have.value', Cypress.env('lastName'));
        cy.get('#customer\\.address\\.street').should('have.value', Cypress.env('street'));
        cy.get('#customer\\.address\\.city').should('have.value', Cypress.env('city'));
        cy.get('#customer\\.address\\.state').should('have.value', Cypress.env('state'));
        cy.get('#customer\\.address\\.zipCode').should('have.value', Cypress.env('zipCode'));
        cy.get('#customer\\.phoneNumber').should('have.value', Cypress.env('phoneNumber'));

    })


    
})