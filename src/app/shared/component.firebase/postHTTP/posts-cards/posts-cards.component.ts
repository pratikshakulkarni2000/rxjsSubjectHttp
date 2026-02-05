import { Component, Input, OnInit } from '@angular/core';
import { Iposts } from '../../models/posts';
import { PostsService } from '../../service/posts.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-posts-cards',
  templateUrl: './posts-cards.component.html',
  styleUrls: ['./posts-cards.component.scss']
})
export class PostsCardsComponent implements OnInit {

  @Input() postObj !: Iposts

  constructor(
    private _postsService : PostsService,
    private _dialog : MatDialog
  ) { }

  ngOnInit(): void {
  }

  // onRemove(){
  //   let matConfig = new MatDialogConfig()
  //   matConfig.data = `Are you sure to remove this card with id <strong>${this.postObj.id}</strong>?`
  //   matConfig.width = "500px"
  //   matConfig.disableClose = true

  //   let matRef = this._dialog.open(GetConfirmComponent,matConfig)
  //   matRef.afterClosed().subscribe(res => {
  //     if(res){
  //       console.log(res);         //res give us in boolean here
        
  //       // API call to remove
  //       this._postsService.removePosts(this.postObj.id)
  //         .subscribe({
  //           next : data => {
  //             console.log(data);   //got null here ....deleted from backend
  //           },
  //           error : err => {
  //             console.log(err)
  //           }
  //         })
  //     }
  //   })
  // }

  // to avaoid nested subscription >> we used flatening operator

  onRemove(){
    let matConfig  = new MatDialogConfig()
    matConfig.data = `Are you sure to remove this card with id ${this.postObj.id}`
    matConfig.width = "500px"
    matConfig.disableClose = true

    let matRef = this._dialog.open(GetConfirmComponent,matConfig)
    matRef.afterClosed()
      .pipe(
        filter(res => {
          return res === true
        }),
        //filter(boolean)
        switchMap(() => {
          return this._postsService.removePosts(this.postObj.id)
        })
      )
      .subscribe({
        next : data => {
          console.log(data);  
          this._postsService.setRemovePost(this.postObj.id)       
        },
        error : err => {
          console.log(err);          
        }
      })
  }

  onEdit(){
    this._postsService.setEditPosts(this.postObj)
  }

}
