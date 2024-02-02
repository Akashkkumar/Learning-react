import conf from "../conf/conf";
import { Client, Databases, Query } from 'appwrite'


export class DatabaseService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwrite_endpoint)
            .setProject(conf.appwrite_project_id);
        this.databases = new Databases(this.client);
    }


    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite :: createPost :: error ", error)
        }

    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite :: updatePost :: error ", error)
        }

    }


    async deletePost(slug) {
        try {
            return await this.databases.deleteDocument(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                slug
            )
        } catch (error) {
            console.log("Appwrite :: deletePost :: error ", error)
        }
    }


    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                slug
            )
        } catch (error) {
            console.log("Appwrite :: getPost :: error ", error)
        }
    }


    async getPosts() {
        try {
            return await this.databases.listDocuments(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                [
                    Query.equal('status', 'active')
                ]
            )
        } catch (error) {
            console.log("Appwrite :: getPosts :: error :: ", error);
        }
    }

}

const databaseService = new DatabaseService();
export default databaseService;