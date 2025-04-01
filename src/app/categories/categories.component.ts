import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms'; 
import { Firestore,collection, addDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports:  [FormsModule, CommonModule, ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})

export class CategoriesComponent implements OnInit {
catArray: Array<any>=[];
formCat:string='';
formStatus:string='Add';
categoryId:any;
constructor(private afs:Firestore, private catService:CategoriesService){}
ngOnInit(): void {
  this.catService.loadData().subscribe(val=>{ console.log(val);
    this.catArray=val
  })
}



async onSubmit(formData:NgForm){
let categoryData: Category={
  category:formData.value.category
  
  
}

if (this.formStatus=='Add'){
  this.catService.saveData(categoryData);
  formData.reset()
}
else if (this.formStatus=='Edit'){
  this.catService.updateData(this.categoryId,categoryData);
  formData.reset();
  this.formStatus='Add'
}

}




onEdit(cat: any,id:any){
this.formCat=cat;
this.formStatus='Edit'
this.categoryId=id
}

onDelete(id:any){
  this.catService.deleteData(id)
}
}


















/*async onSubmit(formData:NgForm){
let categoryData={
  category:formData.value.category,
}
let subcategoryData={
  subCategory:"sub1",
}

let subSubcategoryData = {
  subSubCategory: 'sub-sub1',
};

try {
  // Add category to Firestore collection
  const categoryDocRef = await addDoc(collection(this.afs, 'categories'), categoryData);
  console.log('Category added:', categoryDocRef.id);

  // Reference to the subcategories collection under the created category document
  const subcategoryCollectionRef = collection(this.afs, `categories/${categoryDocRef.id}/subcategories`);

  // Add subcategory to Firestore under the newly created category document
  const subcategoryDocRef = await addDoc(subcategoryCollectionRef, subcategoryData);
  console.log('Subcategory added:', subcategoryDocRef.id);

   // Step 3: Reference and add sub-subcategory under the created subcategory
   const subSubcategoryCollectionRef = collection(this.afs, `categories/${categoryDocRef.id}/subcategories/${subcategoryDocRef.id}/sub-subcategories`);
   const subSubcategoryDocRef = await addDoc(subSubcategoryCollectionRef, subSubcategoryData);
   console.log('Sub-subcategory added:', subSubcategoryDocRef.id);
} catch (err) {
  console.error(err); // Log any errors
}

} */