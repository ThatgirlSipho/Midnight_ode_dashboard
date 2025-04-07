import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { Firestore,collection, addDoc, collectionSnapshots, updateDoc,doc, deleteDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs:Firestore, private toastr:ToastrService) { }

  async saveData(categoryData: any){
    

    try {
      // Add category to Firestore collection
      const categoryDocRef = await addDoc(collection(this.afs, 'categories'), categoryData);
      console.log('Category added:', categoryDocRef.id);
      this.toastr.success('Category added successfully!', 'Success');
    
    } catch (err) {
      console.error(err); // Log any errors
    }
    
    }

    
     
      loadData() {
        const categoriesCollection = collection(this.afs, 'categories');
    
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

      async updateData(id: string, editData: any) {
        try {
          const categoryDocRef = doc(this.afs, `categories/${id}`); // Reference to the specific document
          await updateDoc(categoryDocRef, editData); // Update document
          this.toastr.success('Category updated successfully!', 'Success');
        } catch (err) {
          console.error(err); // Log any errors
          this.toastr.error('Failed to update category!', 'Error');
        }
      }
        

async deleteData(id:any){
  try {
    const categoryDocRef = doc(this.afs, `categories/${id}`); // Reference to the specific document
    await deleteDoc(categoryDocRef); // Delete document
    this.toastr.success('Category deleted successfully!', 'Success');
  } catch (err) {
    console.error(err); // Log any errors
    this.toastr.error('Failed to delete category!', 'Error');
  }
}
        
  }

