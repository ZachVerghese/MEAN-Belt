import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
newRest:object={name:"",cuisine:""} //new pet object being dynamically created via double binding
errors=[]; // backend errors from creating pet
  constructor( private _httpService:HttpService, private _route: ActivatedRoute) { }

  ngOnInit() {
  }

  createRestaurant(){
    console.log('In NEW component, this is the new pet: ', this.newRest)
    let tempObservable = this._httpService.createRestaurant(this.newRest);
      tempObservable.subscribe(responseData =>{

        //pet name taken
        if (responseData == "a restaurant with this name already exists"){
          this.errors = ['Sorry, could not add restaurant because a restaurant with this name already exists']
          console.log('This is the error', this.errors);
          this.addtoServiceErrors();
        }

        else{
          //pet name not taken
        this.errors = ['Added restaurant!']
        this.makeSignal();
        // this.AddDeleteOption();
        this.newRest = {name:"",cuisine:""}
        this.addtoServiceErrors();
        }})
      }

  addtoServiceErrors(){ //send errors from creating pet to service
    console.log('Errors from new', this.errors)
    this._httpService.addtoErrors(this.errors);
  }
  makeSignal(){
    console.log('in new make signla:', this.newRest)
    this._httpService.makeSignal(this.newRest.name)
  }

  // AddDeleteOption(){
  //   this._httpService.addDelete(this.newRest)
  // }
}
