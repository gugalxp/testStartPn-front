export class AuthTokenError extends Error {
    constructor() {
        super("Error na autenticação do token");
    }
}