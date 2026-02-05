import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Iposts } from '../../models/posts';
import { PostsService } from '../../service/posts.service';

@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.scss']
})
export class PostsFormComponent implements OnInit {

  isInEditMode : boolean = false
  editId !: string

  postForm !: FormGroup

  userIdArr : Array<number> = [1,2,3,4,5,6,7,8,9,10]

  constructor(
    private _postService : PostsService
  ) { }

  ngOnInit(): void {
    this.createForm()

    this.onPatchData()
  }

  trackById(index : string, arr : Iposts){
    return arr.id
  }

  createForm(){
    this.postForm = new FormGroup({
      title : new FormControl(null, [Validators.required]),
      content : new FormControl(null, [Validators.required]),
      userId : new FormControl(null, [Validators.required])
    })
  }

  onPostAdd () {
    if(this.postForm.valid){
      let post = this.postForm.value
      console.log(post);

      this._postService.createPosts(post)
          .subscribe({
            next : data => {
              console.log(data);
              this.postForm.reset()

              this._postService.setNewPost(post)
            },
            error : err => {
              console.log(err);
              
            }
          })
      
    }
  }

  onPatchData(){
    this._postService.editPostSubObs$.subscribe(res => {
      if(res){
        this.isInEditMode = true
        this.editId = res.id
        this.postForm.patchValue(res)
      }
    })
  }

  onUpdate(){
    if(this.postForm.valid){
      let obj : Iposts = {
        ...this.postForm.value,
        id : this.editId
      }
      console.log(obj);

      this._postService.updatePost(obj)
        .subscribe({
          next : data => {
            console.log(data)
            this.postForm.reset()
            this.isInEditMode = false
            this._postService.setUpdatePosts(data)
          },
          error : err => {
            console.log(err)
          }
        })
    }
  }


   get formControls(){
    return this.postForm.controls
  }
}
