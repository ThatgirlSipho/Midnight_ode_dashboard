import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Firestore,collection, addDoc, collectionSnapshots, updateDoc,doc, deleteDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private storage:Storage,private afs:Firestore,private toastr:ToastrService, private router:Router ) { }

 async uploadImage(file: File, postData:any) {
try{
  const filePath = `postIMG/${Date.now()}_${file.name}`;
  const storageRef = ref(this.storage, filePath);

  const uploadResult = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(uploadResult.ref);
  postData.postImgPath=downloadURL
 console.log(postData);


  await addDoc(collection(this.afs, 'posts'), postData);
// console.log('Category added:', categoryDocRef.id);
 this.toastr.success('Post added successfully!', 'Success');
 this.router.navigate(['/posts'])
} catch (err) {
      console.error(err); // Log any errors
    }

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



}
