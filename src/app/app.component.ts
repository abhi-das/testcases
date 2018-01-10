import {
    Component, OnInit
} from '@angular/core';

import {
    TaskListService
} from './task.list.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private _tskSrv: TaskListService) {}

    ngOnInit() {

        this._tskSrv.getTaskList().subscribe(res => {
            this._tskSrv.getTaskByFlag('completed');
            this._tskSrv.getTaskByFlag('notCompleted');
        });
    }

}
