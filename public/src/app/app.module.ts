import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service'
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// import { NewComponent } from './new/new.component';
// import { EditComponent } from './edit/edit.component'; // <-- import FormsModule.
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent, } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { ReviewComponent } from './review/review.component';
// import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditComponent,
    NewComponent,
    ShowComponent,
    ReviewComponent,
    // NewComponent,
    // EditComponent,
    // HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
