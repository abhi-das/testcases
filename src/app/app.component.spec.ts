import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TaskListService } from './task.list.service';
import { TaskListTwoService } from './task.list.two.service';
import { HttpModule } from '@angular/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [
        AppComponent
      ],
      providers: [ TaskListService, TaskListTwoService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));




})
