import conf from "../conf/conf";
import { Client, Storage, ID } from 'appwrite'


export class StorageService {
    client = new Client();
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwrite_endpoint)
            .setProject(conf.appwrite_project_id);

        this.bucket = new Storage(this.client);
    }


    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwrite_bucket_id,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite :: uploadFile :: error ", error);
        }
    }


    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwrite_bucket_id,
                fileId
            )
        } catch (error) {
            console.log("Appwrite :: deleteFile :: error ", error);
        }
    }


    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                conf.appwrite_bucket_id,
                fileId
            )
        } catch (error) {
            console.log("Appwrite :: getFile :: error ", error);
        }
    }

   



}

const storageService = new StorageService();

export default storageService;