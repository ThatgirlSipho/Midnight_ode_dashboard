import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-all-post',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './all-post.component.html',
  styleUrl: './all-post.component.css'
})
export class AllPostComponent implements OnInit{
postArray:Array<any>=[];



constructor(private postService:PostService){}

ngOnInit(): void {
  this.postService.loadData().subscribe((val:any) =>{
    console.log(val);
    this.postArray=val
  } )
 
}
}
