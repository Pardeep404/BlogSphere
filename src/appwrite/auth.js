import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    // Create a new user account and auto-login
    async createAccount({ email, password, name }) {
        try {
          const userAccount = await this.account.create(ID.unique(), email, password, name);
          if (userAccount) {
            // Wait for login to finish
            const session = await this.login({ email, password });
            return session;
          } else {
            return userAccount;
          }
        } catch (error) {
          console.error("Appwrite :: createAccount :: error", error);
          throw error;
        }
      }
      
    // Login user
    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            return session;
        } catch (error) {
            console.error("Appwrite :: login :: error", error);
            throw error;
        }
    }

    // Get the currently logged in user (only if session is valid)
    async getCurrentUser() {
        try {
            // Check if session cookie exists in browser
            const user = await this.account.get();
            return user;
        } catch (error) {
            console.error("Appwrite :: getCurrentUser :: error", error);
            // Likely caused by missing/expired session
            return null;
        }
    }

    // Logout user
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Appwrite :: logout :: error", error);
            throw error;
        }
    }

    // Optional helper to check if user is authenticated
    async isLoggedIn() {
        const user = await this.getCurrentUser();
        return !!user;
    }
}

// Export singleton instance
const authService = new AuthService();
export default authService;
