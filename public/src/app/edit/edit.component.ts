import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

therestaurant:any; //the current pet on the edit page
errorsfromedit=[]; // backend errors editing pet
id=""; // id of current pet
currname=""; // name before being changed, for purpose of db comparison

  constructor( private _httpService:HttpService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params.subscribe((params: any) => {
      this.id=params['id']; //this is the id of the pet we are editing
        console.log('got id', this.id)
    });
    this.getARestaurant(); //on init, get that pet
  }

  getARestaurant(){
    console.log('IN EDIT COMPONENT, hit get a pet: ', this.id) 
    let observable = this._httpService.getARestaurant(this.id);
    observable.subscribe(responseData => {
      console.log('response data: ', responseData)
      this.therestaurant=responseData; //the pet variable now is the response object for that pet
      console.log('the pet name: ', this.therestaurant[0].name)
      this.currname= this.therestaurant[0].name; //name before changing is stored as currname
      this.sendtoService(); // send over currname so it can be compared in server.js
      console.log('therestaurant variable: ', this.therestaurant)
    })
  }

  updateRestaurant(id:string, data){
    console.log("IN EDIT COMPONENT, hit update, here is id and data: ", id,data); //data from form submit
    let observable = this._httpService.updateRestaurant(id,data);
    observable.subscribe(responseData =>{
      console.log(responseData);
      if (responseData == "name already exists"){ //if get an error back based on server comparison
        console.log('This response should say name already exists:', responseData)
        this.errorsfromedit = ['Name already exists'] //add to errors variable that name already exists
        this.addtoServiceErrorsFromEdit(); // send the errors variable over to service.
      }
      console.log('response DAta', responseData); //if name isn't already taken
      this.addtoServiceErrorsFromEdit(); // still add those service errors TEST WITHOUT
      this._httpService.getRestaurants();
    })
    this.addtoServiceErrorsFromEdit(); // add service errors anyway. TEST WITHOUT
  }

  sendtoService(){
    console.log('THE OG NAME TO COMPARE: ', this.currname) // this sends over the name before changing
    this._httpService.addName(this.currname);
  }
  addtoServiceErrorsFromEdit(){
    console.log('errors from edit', this.errorsfromedit)
    this._httpService.addtoErrorsFromEdit(this.errorsfromedit); //if errors editing, add them to service
  }
}
