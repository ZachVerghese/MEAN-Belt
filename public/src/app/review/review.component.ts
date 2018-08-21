import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
therestaurant:any;
id="";
newRev:object = {name:"",stars:"",message:""}
  constructor(private _httpService:HttpService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params.subscribe((params: any) => {
      this.id=params['id']; //this is the id of the pet we are editing
        console.log('got id', this.id)
    });
    this.getARestaurant();
  }

  getARestaurant(){
    console.log('IN REVIEW COMPONENT, hit get a pet: ', this.id) 
    let observable = this._httpService.getARestaurant(this.id);
    observable.subscribe(responseData => {
      console.log('response data: ', responseData)
      this.therestaurant=responseData; //the pet variable now is the response object for that pet
      console.log('the rest name: ', this.therestaurant[0].name)
      console.log('therestaurant variable: ', this.therestaurant)
    })
  }


  addReview(restID:string, data){
    console.log("IN REVIEW component, hit update, here is restID and data: ", restID,data); //data from form submit
    let observable = this._httpService.addReview(restID,data);
    observable.subscribe(responseData =>{
      console.log('response data from add review', responseData);
      this.getARestaurant();
    })
  }
}
      // if (responseData == "name already exists"){ //if get an error back based on server comparison
        // console.log('This response should say name already exists:', responseData)
        // this.errorsfromedit = ['Name already exists'] //add to errors variable that name already exists
        // this.addtoServiceErrorsFromEdit(); // send the errors variable over to service.
      // })}}
      // console.log('response DAta', responseData); //if name isn't already taken
      // this.addtoServiceErrorsFromEdit(); // still add those service errors TEST WITHOUT
    // this.addtoServiceErrorsFromEdit(); // add service errors anyway. TEST WITHOUT
