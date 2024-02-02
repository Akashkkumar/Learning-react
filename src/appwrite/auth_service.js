import conf from "../conf/conf";
import { ID, Client, Account } from 'appwrite'

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwrite_endpoint)
            .setProject(conf.appwrite_project_id);
        this.account = new Account(this.client)
    }


    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )

            if (userAccount) {
                // call another method
                return this.login({ email, password })
            } else {
                return userAccount
            }

        } catch (error) {
            console.log("Appwrite :: createAccount :: error ", error)

        }
    }



    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            console.log("Appwrite :: login :: error ", error)
            alert(error.message)
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions('current');
        } catch (error) {
            console.log("Appwrite :: logout :: error ", error)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite :: getCurrentUser :: error ", error)
        }
        return null;
    }


}

const authService = new AuthService();
export default authService;