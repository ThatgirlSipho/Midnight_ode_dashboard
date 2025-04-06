import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL,deleteObject } from '@angular/fire/storage';
import { Firestore,collection, addDoc, collectionSnapshots, updateDoc,doc, deleteDoc , docData} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private storage:Storage,private afs:Firestore,private toastr:ToastrService, private router:Router ) { }

 async uploadImage(file: File, postData:any,formStatus:string, id:string) {
try{
  const filePath = `postIMG/${Date.now()}_${file.name}`;
  const storageRef = ref(this.storage, filePath);

  const uploadResult = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(uploadResult.ref);
  postData.postImgPath=downloadURL
 console.log(postData);
 if(formStatus=='Add New'){
  this.savePost(postData);
 }
 else{
  console.log(id, postData)
  this.updatePost(id,postData)
 }

} catch (err) {
      console.error(err); // Log any errors
    }

  }

  async savePost(postData:any){
    await addDoc(collection(this.afs, 'posts'), postData);
    // console.log('Category added:', categoryDocRef.id);
     this.toastr.success('Post added successfully!', 'Success');
     this.router.navigate(['/posts'])
  }

 loadData() {
        const categoriesCollection = collection(this.afs, 'posts');
    
        return collectionSnapshots(categoriesCollection).pipe(
          map(actions =>
            actions.map(a => {
              const data = a.data(); // Extract data
              const id = a.id; // Extract document ID
              return { id, ...data }; // Return object with ID and data
            })
          )
        );
      }


      loadPost(id: string) {
        const postDoc = doc(this.afs, `posts/${id}`);
        return docData(postDoc, { idField: 'id' }); // Adds `id` to the returned data
      }

      async updatePost(id: string, postData: any) {
        try {
          const postDocRef = doc(this.afs, `posts/${id}`); // Reference to the specific document
          await updateDoc(postDocRef, postData); // Update document
          this.toastr.success('Post updated successfully!', 'Success');
          this.router.navigate(['/posts'])
        } catch (err) {
          console.error(err); // Log any errors
          this.toastr.error('Failed to update Post!', 'Error');
        }
      }
       
      async deletePost(id:any){
        try {
          const postDocRef = doc(this.afs, `posts/${id}`); // Reference to the specific document
          await deleteDoc(postDocRef); // Delete document
          this.toastr.warning('Post deleted successfully!', 'Warning');
        } catch (err) {
          console.error(err); // Log any errors
          this.toastr.error('Failed to delete Post!', 'Error');
        }
      }

      
async deleteImage(imageUrl: string, id:any): Promise<void> {
  try {
    const storageRef = ref(this.storage, imageUrl);
    await deleteObject(storageRef);
    this.deletePost(id);
    console.log('Image deleted successfully');
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}

async markFeatured(id:any,featuredData:any){
  const postDocRef = doc(this.afs, `posts/${id}`); // Reference to the specific document
   await updateDoc(postDocRef, featuredData);
   this.toastr.info('Post is now featured!', 'Info');
}
}
