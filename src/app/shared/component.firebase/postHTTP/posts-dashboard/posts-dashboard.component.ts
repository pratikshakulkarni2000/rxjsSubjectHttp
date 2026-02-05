import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../service/posts.service';
import { Iposts } from '../../models/posts';

@Component({
  selector: 'app-posts-dashboard',
  templateUrl: './posts-dashboard.component.html',
  styleUrls: ['./posts-dashboard.component.scss']
})
export class PostsDashboardComponent implements OnInit {

  postsArr : Array<Iposts> = []

  constructor(
    private _postService : PostsService
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
    })
  }

  onREmove(){
      this._postService.removeSubObs$.subscribe(id => {
      let getIndex = this.postsArr.findIndex(r => r.id === id)
      this.postsArr.splice(getIndex,1)
    })
  }

  onUpdaTe (){
      this._postService.updatePostObs$.subscribe(post => {
      let getIndex = this.postsArr.findIndex(u => u.id === post.id)
      this.postsArr[getIndex] = post
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
          console.log(err);
        }
      })
  }

}
