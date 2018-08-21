import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params,Router} from '@angular/router';
import {HttpService} from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  stuff=[];
  title = "Belt Exam";
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  )
  {}
  
  ngOnInit(){
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
  });
  this.goHome();
  
  }
  goHome() {
    this._router.navigate(['']);
  }

}
