Application to be tested: https://parabank.parasoft.com/
Focus: Automated functional testing across UI and API layers using Cypress.

Business Requirements to Test:

1. Open a New Account
● The user should be able to open a new account after registration.
● The starting balance of the opened account is 3000 USD, which should be verified:
  ○ In the UI, on the Accounts Overview page.
  ○ In the API response, in the call to query the account balance.

2. Savings account opening
● The “SAVINGS” account opening should be available through the Open New Account menu item.
● The test is valid if:
  ○ The UI displays the account correctly.
  ○ The API response includes the type and ID of the new account.

3. Money transfer – overdraft behavior
● The Transfer Funds function allows you to transfer money from one of your own accounts to another.
● Special requirements:
  ○ If the amount you want to transfer is greater than the balance of the starting account:
      ■ The starting account goes negative, which we should see on the Account Overview UI.
      ■ The API response also includes the negative new balance.

4. Loan Request – Partially Required Field
● The Request Loan function must be available.
● There are two fields: Loan Amount and Down Payment.
● According to the business logic, only one field is required, the other can be empty.
● Test Objective:
  ○ The Loan request should be submitted by filling in only one of the fields.
  ○ Successful submission of the request must be verified based on UI and/or API response.

5. Update Profile Only via API
● The user profile can be modified without using the UI.
● The following text should appear in the API response:
  ○ "Successfully updated customer profile"
● The updated data should also be displayed correctly via the UI interface of the Update Contact Info menu item.

6. Money transfer – same account protection
● The Transfer Funds feature does not allow the source and target accounts to be the same.
● In this case, the system:
  ○ Throws an error on the UI (e.g. validation message).
  ○ Or the API call response indicates an error or rejection.
● The purpose of testing: to verify error handling on both layers.
