import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IpostRes, Iposts } from '../models/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  BASE_URL : string = environment.BASE_URL
  POST_URL : string = `${this.BASE_URL}/posts.json`

  constructor(
    private _httpClient : HttpClient
  ) { }

  private newPostSub$ : Subject<Iposts> = new Subject<Iposts>()
  newPostSubObs$ : Observable<Iposts> = this.newPostSub$.asObservable()

  setNewPost(post : Iposts){
    this.newPostSub$.next(post)
  }


  private removePostSub$ : Subject<string> = new Subject<string>()
  removeSubObs$ : Observable<string> = this.removePostSub$.asObservable()

  setRemovePost(id : string){
    this.removePostSub$.next(id)
  }

  private editPostSub$ : Subject<Iposts> = new Subject<Iposts>()
  editPostSubObs$ : Observable<Iposts> = this.editPostSub$.asObservable()

  setEditPosts(post : Iposts){
    this.editPostSub$.next(post)
  }

  private updatePostSub$ : Subject<Iposts> = new  Subject<Iposts>()
  updatePostObs$ : Observable<Iposts> = this.updatePostSub$.asObservable()

  setUpdatePosts(post : Iposts){
    this.updatePostSub$.next(post)
  }


  fetchPosts(): Observable<Iposts[]>{
    return this._httpClient.get<any>(this.POST_URL).pipe(
      map(obj => {
        let postsArr : Array<Iposts> = []
        for (const key in obj){
          postsArr.unshift({...obj[key],id:key})
        }
        return postsArr
      })
    )
  }

  createPosts(post : any) : Observable<IpostRes>{
    return this._httpClient.post<any>(this.POST_URL,post)
  }

  removePosts(id : string) : Observable<any>{
    let REMOVE_URL = `${this.BASE_URL}/posts/${id}.json`
    console.log(REMOVE_URL);
   
    return this._httpClient.delete(REMOVE_URL)
  }

  updatePost(update : Iposts) : Observable<Iposts> {
    let UPDATE_URL = `${this.BASE_URL}/posts/${update.id}.json`

    return this._httpClient.patch<Iposts>(UPDATE_URL,update)
  }


}
