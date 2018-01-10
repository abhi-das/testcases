import {
    Injectable
} from '@angular/core';

import {
    Http, Response
} from '@angular/http';

import {
    Observable
} from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class TaskListService {

    public tmpTask = ['11', '12'];

    constructor(private _http: Http) {}


    getTaskList(): Observable < any > {

        const dt = this._http.get('../data/todo_data.json')
            .map((res: Response) => {

                this.tmpTask = res.json();
                return this.tmpTask;
            });
        return dt;
    }

    getTaskByFlag(flag: string, tk ?: any): Array < any > {

        let taskLs = [];

        /*
         * tk as optional param for teesting purpose
        */
        const localTaksLs = this.tmpTask['tasks'] || tk['tasks'];

        if (flag === 'completed') {
            taskLs = localTaksLs.filter(task => {
                return task.status === 'completed';
            });
        } else {
            taskLs = localTaksLs.filter(task => {
                return task.status === 'notCompleted';
            });
        }
        // console.log('status  > ',taskLs);
        return taskLs;
    }
}
