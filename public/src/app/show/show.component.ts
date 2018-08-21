import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})

export class ShowComponent implements OnInit {

therestaurant:any; //current pet 
id=""; //id of current pet
errors:any; // errors that will be from editing the pet
thereviews:any;
likescount=0; // initializes a pet's number of likes at 0
canlike=false; //whether or not user can like the pet
newLike:object={details:""}; // initializes likes to be empty object

  constructor(private _httpService:HttpService, private _route: ActivatedRoute) {}

  ngOnInit() {
    this._route.params.subscribe((params: any) => {
      this.id=params['id']; //set id variable to current id
        console.log('got id', this.id)
    });
    this.canlike=true; // on loading component, can like
    this.errors = [];
    this.getARestaurant(); 
    this.getErrors();  //sees if any errors in variable received from editing

  }
  getARestaurant(){
    console.log('In SHOW component, hit get a pet, here is id: ', this.id)
    let observable = this._httpService.getARestaurant(this.id);
    observable.subscribe(responseData => {
      console.log('therestaurant', responseData)
      this.therestaurant=responseData;
      this.thereviews = this.therestaurant[0].reviews;
      this.thereviews.sort(function(a, b) {
        return b.stars - a.stars;
  
  })
      console.log('thereviews: ',this.thereviews)
      this.getErrors();
    })
    console.log('In SHOW, errors at end of get a pet', this.errors);
  }
  deleteRestaurant(){
    console.log('In SHOW component, hit delete, here is id: ', this.id)
    let observable = this._httpService.deleteRestaurant(this.id);
    observable.subscribe(responseData =>{
      console.log('In SHOW, reponse data from deleting:', responseData);
    })
  }

  // addLike(petid:string){
  //   if (this.canlike == false){
  //     this.errors.push('nah')
  //     console.log('cant add like bro, here is error: ', this.errors);
  //   }
  //   else{
  //   console.log('In SHOW, hit addLike, pet id:', petid);
  //   console.log('In SHOW, like data going into service:, ', this.newLike)
  //   let observable = this._httpService.addLike(petid, this.newLike);
  //   observable.subscribe(responseData =>{
  //     console.log('response data from adding like', responseData)
  //     this.getAPet();
  //     this.canlike=false; //can't like no more

  //   })
  // }
    
  // }
  getErrors(){
    console.log('Errors from service, generated during editing',this._httpService.shareErrorsFromEdit())
    this.errors = this._httpService.shareErrorsFromEdit()+ " in database so could not change to that";
    console.log('first letter', this.errors[0]);
  }
}
