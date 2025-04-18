import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule,FormBuilder } from '@angular/forms';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [FormsModule, RouterModule,CommonModule, AngularEditorModule,HttpClientModule, ReactiveFormsModule ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})


export class NewPostComponent implements OnInit {
  permalink:string='';
imgSrc:any='assets/default-featured-image.jpg';
selectedImg:any
categories:Array<any>=[];
postForm!:FormGroup ;
post:any;
formStatus='Add New';
docId:string=''

constructor( private catService:CategoriesService,private fb: FormBuilder, private postService:PostService, private route: ActivatedRoute  ){
  this.route.queryParams.subscribe((val:any)=>{
    this.docId=val.id ;

    if (this.docId){
      this.postService.loadPost(val.id).subscribe((post:any)=>{
        console.log(post)
        this.post=post;
  
        this.postForm=this.fb.group({
          title: [this.post.title, [Validators.required, Validators.minLength(10)]],
          permalink: [{ value: this.post.permalink, disabled: true}],
          excerpt:[this.post.excerpt, [Validators.required, Validators.minLength(15)]],
          category:[`${this.post.category.categoryId}-${this.post.category.category}` ,Validators.required],
          postImg:['',Validators.required],
          content:[this.post.content,Validators.required],
        })
        this.imgSrc=this.post.postImgPath
        this.formStatus='Edit'
      })
    }
    else{
      this.postForm=this.fb.group({
        title: ['', [Validators.required, Validators.minLength(10)]],
        permalink: [{ value:'', disabled: true}],
        excerpt:['', [Validators.required, Validators.minLength(15)]],
        category:['' ,Validators.required],
        postImg:['',Validators.required],
        content:['',Validators.required],
      })
    }
  
  })


}
ngOnInit(): void {
  this,this.catService.loadData().subscribe((val:any)=>{
    this.categories= val
  });
}
get fc(){
  return this.postForm.controls
}

onTitleChanged($event: Event){
  const title = ($event.target as HTMLInputElement).value;
  this.permalink=title.replace(/\s/g,'-');
  this.postForm.get('permalink')?.setValue(this.permalink);
}

showPreview(event: Event) {
  const input = event.target as HTMLInputElement;

  if (input?.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imgSrc = reader.result as string;
    };

    reader.readAsDataURL(file);
    this.selectedImg=file
  }
}

onSubmit(){
  //console.log(this.postForm.value)
  let splitted=this.postForm.value.category.split('-');
  const postData: Post={
    title:this.postForm.value.title,
    content:this.postForm.value.content,
    excerpt:this.postForm.value.excerpt,
    permalink:this.permalink,
    category:{
      categoryId:splitted[0],
      category:splitted[1]
    },
    postImgPath:'',
    isFeatured:false,
    views:0,
    status:'new',
    createdAt:new Date()
  }
  this.postService.uploadImage(this.selectedImg, postData,this.formStatus,this.docId)
this.postForm.reset();
this.imgSrc='assets/default-featured-image.jpg';
//console.log(postData)

}

}