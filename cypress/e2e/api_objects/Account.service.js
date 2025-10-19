// Classe para encapsular as chamadas para os endpoints da conta de usuário
class AccountService {
    static createUser(username, password) {
        return cy.request({
            method: 'POST',
            url: 'https://demoqa.com/Account/v1/User',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                userName: username,
                password: password
            }
        });
    }

    static generateToken(username, password) {
        return cy.request({
            method: 'POST',
            url: 'https://demoqa.com/Account/v1/GenerateToken',
            body: {
                userName: username,
                password: password
            }
        });
    }

    static checkUserAuthorized(username, password) {
        return cy.request({
            method: 'POST',
            url: 'https://demoqa.com/Account/v1/Authorized',
            body: {
                userName: username,
                password: password
            }
        });
    }

    static getUserDetails(userId, token) {
        return cy.request({
            method: 'GET',
            url: `https://demoqa.com/Account/v1/User/${userId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
}

export default AccountService;