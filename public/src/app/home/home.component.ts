import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
allrestaurants:any;
errors=[];
errors2=[];
info:any;
  constructor( private _httpService:HttpService, private _route: ActivatedRoute, private _router: Router
  ) { }

  ngOnInit() {
    this.getRestaurants();
    this.errors=[];
    console.log('Errors on home page: ', this.errors)
    this.goHome()
    this.getSignal();
    setTimeout(this.signalchange(),30000)
    // this.getDelete();
}
  getRestaurants(){
    let observable = this._httpService.getRestaurants();
    observable.subscribe((data:any) => {
      console.log("all pets",data);
      this.allrestaurants = data;
      this.allrestaurants.reverse();
      //sort allrestaurants
  this.getErrors()
  this.getSignal();
    })

  }
  // getDelete(){
  //   let observable = this._httpService.getDelete();
  //   observable.subscribe((data:any) =>{
  //     console.log('delete in home', data);
  //   })
  // }

  deleteErrors(){
    console.log('hit delete errors on home component');
    this.errors= [];
    this.errors2=[];
    this._httpService.deleteErrors();
  }
  getErrors(){
    console.log('Errors received from service on home page: ',this._httpService.shareErrors())
    this.errors = this._httpService.shareErrors();
    this.errors2 = this._httpService.shareErrorsFromEdit();
  }

  deleteRestaurant(id){
    console.log('hit deleteRrest in component',id);
    let observable = this._httpService.deleteRestaurant(id);
    observable.subscribe(responseData => {
      console.log(responseData);
      this.getRestaurants()
    })
  }
  goHome() {
    this._router.navigate(['/restaurants']);
  }

  getSignal(){
    this.info = this._httpService.shareSignal();
    console.log('info at home', this.info)
  }

  signalchange(){
    this.info.signal = false;
  }
}


