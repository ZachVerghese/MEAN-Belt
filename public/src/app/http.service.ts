import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  authorID=[];
  errorsfromnew:any;
  name:any;
  delname:any
  errorsfromedit:any;
  signal:any;
  delbody:object={name:this.delname, signal:this.signal}
  constructor(private _http:HttpClient) {
  }
    getRestaurants(){
      let tempObservable = this._http.get('/restaurantss');
      tempObservable.subscribe((data:any) => {
        for ( var i = 0; i < data.length; i++){
          this.getARestaurant(data[i]._id);
        }
      })
      return tempObservable;
    }
    getARestaurant(id: string){
      return this._http.get(`/${id}`);
    }
    updateRestaurant(id:string, restObj){
      restObj.currname = this.name;
      console.log('reached updatepet in service :', id, restObj)
      return this._http.put(`/update/${id}`,restObj)
    }
    createRestaurant(restObj){
      console.log('hit post to server, authorObj: ', restObj);
      return this._http.post(`/restaurants/new`,restObj)
    }
    deleteRestaurant(id:string){
        console.log('hit server delete', id);
        return this._http.delete(`/remove/${id}`);
      }
    // getDelete(){
    //   let tempobservable = this._http.get('/deletebutton');
    //   tempobservable.subscribe((data:any) =>{
    //     console.log("data from service get delete", data);
    //   })
    //   return tempobservable;
    // }

    // addDelete(delobj){
    //   return this._http.post('/createdelete', delobj);
    //     }

    addReview(restID, revObj){
      console.log('hit server addReview', restID, revObj);
      return this._http.put(`/newReview/${restID}`,revObj)
    }
    makeSignal(name){
      console.log('creating signal', this.signal)
      this.signal = true;
      this.delname = name;
      this.delbody={name:this.delname, signal:this.signal}
      console.log('after changing signal to true', this.signal)
    }
    shareSignal(){
      console.log('current delbody on init: ', this.delbody)
      return this.delbody;
    }

    deleteErrors(){
      console.log('hit deleteerrors in service')
      this.errorsfromedit=[];
      this.errorsfromnew=[];
      console.log('in service, errors from edit after deleting: ', this.errorsfromedit)
      console.log('in service, errors from new after deleting', this.errorsfromnew);
    }


    addtoErrors(data){
      this.errorsfromnew = data;
      console.log('errors in service from new',this.errorsfromnew);
    }

    addtoErrorsFromEdit(data){
      this.errorsfromedit = data;
      console.log('errors in service from edit', this.errorsfromedit);
    }

    shareErrors(){
      console.log('errors from new in service: ', this.errorsfromnew)
      return this.errorsfromnew;
    }

    addName(data){
      this.name = data;
      console.log('current name in server', this.name)
    }

    shareName(){
      return this.name;
    }

    shareErrorsFromEdit(){
      return this.errorsfromedit;
    }
  }

