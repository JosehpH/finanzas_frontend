import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"
import {v4 as uuidv4} from "uuid"
import {storage} from "./firebaseConfig.js";

export class UploadService{
    basePath = "images/";
   async getUrlUploadFile(file, onProgress){
        try {
            console.log(file)
            const fileRef = ref(storage,this.basePath+uuidv4()+file.name);
            const task = uploadBytesResumable(fileRef,file);
            task.on('state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    onProgress(progress);
                },
                (error) => {
                    console.error("Error al cargar el archivo:", error);
                }
            );
            await task;
            return await getDownloadURL(task.snapshot.ref);
        }catch (error){
            console.error("Error uploading file:", error);
            throw error;
        }
    }
}