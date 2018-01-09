import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TaskListService } from './task.list.service';
import { TaskListTwoService } from './task.list.two.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [TaskListService, TaskListTwoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
