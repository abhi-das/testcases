import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskListService {


	constructor(private _http: Http){}


	getTaskList(): Observable <any> {

		let dt = this._http.get('../data/todo_data.json')
					.map((res: Response) => {
						return res.json();
					});
		return dt;
	}

	getTaskByFlag(task: any, flag: string): Array<any> {

		let taskLs = [];

		if(flag === 'completed') {
			taskLs = task.filter(task => {
				return task.status === 'completed'
			});
		} else {
			taskLs = task.filter(task => {
				return task.status === 'notCompleted'
			});
		}
		// console.log('status  > ',taskLs);		
		return taskLs;
	}
}