import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../service/posts.service';
import { Iposts } from '../../models/posts';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-posts-dashboard',
  templateUrl: './posts-dashboard.component.html',
  styleUrls: ['./posts-dashboard.component.scss']
})
export class PostsDashboardComponent implements OnInit {

  postsArr : Array<Iposts> = []

  constructor(
    private _postService : PostsService,
    private _snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
    this.getPosts()
    this.onAdd()
    this.onREmove()
    this.onUpdaTe()
}


  onAdd(){
     this._postService.newPostSubObs$.subscribe(data => {
      this.postsArr.unshift(data)
      this._snackbar.opensnackbar(`Card is added successfully !!!`)
    })
  }

  onREmove(){
      this._postService.removeSubObs$.subscribe(id => {
      let getIndex = this.postsArr.findIndex(r => r.id === id)
      this.postsArr.splice(getIndex,1)
      this._snackbar.opensnackbar(`Card is removed successfully !!!`)
    })
  }

  onUpdaTe (){
      this._postService.updatePostObs$.subscribe(post => {
      let getIndex = this.postsArr.findIndex(u => u.id === post.id)
      this.postsArr[getIndex] = post
      this._snackbar.opensnackbar(`Card is updated successfully !!!`)
    })
  }

  getPosts(){
    this._postService.fetchPosts()
      .subscribe({
        next : data => {
          console.log(data);  
          this.postsArr = data        
        },
        error : err => {
          // console.log(err);
          this._snackbar.error(`Unable to fetch data`)
        }
      })
  }

}
