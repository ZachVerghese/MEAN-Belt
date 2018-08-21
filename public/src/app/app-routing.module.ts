import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new/new.component'
import { EditComponent } from './edit/edit.component'
import { HomeComponent } from './home/home.component';
import { ShowComponent } from './show/show.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  // {
  //   path:'restaurants/edit/:id',
  //   component:EditComponent
  // },
  {
    path:'restaurants/new',
    component:NewComponent
  },
  {
    path:"restaurants",
    component:HomeComponent,
    children:[
      {
        path:'edit/:id',
        component:EditComponent
      },
    ],
    runGuardsAndResolvers: 'always',
  },
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"restaurants/:id",
    component:ShowComponent
  },
  {
    path:"restaurants/:id/review",
    component:ReviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
