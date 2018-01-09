import {
    TestBed, inject, fakeAsync
} from '@angular/core/testing';

import {
    Http,
    Response,
    HttpModule,
    ResponseOptions,
    XHRBackend
} from '@angular/http';

import {
    Observable
} from 'rxjs/Observable';

import {
    TaskListTwoService
} from './task.list.two.service';

import {
    MockBackend, MockConnection
} from '@angular/http/testing';

describe('<<<WITH fakeAsync>>> should load JSON data', () => {

    let taskLs;

    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpModule],
        providers: [
            TaskListTwoService, {
                provide: XHRBackend,
                useClass: MockBackend
            }
        ]
    })

        // Local variable initialize
        // mockRes = [];
    );

    it('should return tasks from JSON data', fakeAsync(
        inject([XHRBackend, TaskListTwoService], (xhrBackend, taskSrv) => {

            const mockRes = {
                tasks: [{
                    'title': 'Deploy Webapp1',
                    'description': '<p>latest commit on webapp needs deployment 1</p>',
                    'status': 'completed',
                    'author': 'userId 1'
                }, {
                    'title': 'Deploy Webapp 2',
                    'description': '<p>latest commit on webapp needs deployment 2</p>',
                    'status': 'notCompleted',
                    'author': 'userId 2'
                }, {
                    'title': 'Deploy Webapp 3',
                    'description': '<p>latest commit on webapp needs deployment 3</p>',
                    'status': 'completed',
                    'author': 'userId 3'
                }]
            };

            xhrBackend.connections.subscribe((connection) => {

                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockRes)

                })));

            });

            taskSrv.getTaskList().subscribe((res) => {

                taskLs = res['tasks'];
                expect(taskLs.length).toBe(3);
            });
        })
    ));

    it('should return task list by completed status', fakeAsync(
        inject([XHRBackend, TaskListTwoService], (xhrBackend, taskSrv) => {

            const notCompletedTask = taskSrv.getTaskByFlag(taskLs, 'notCompleted');
            expect(notCompletedTask.length).toBe(1);
        })
    ));

    it('should return task list by completed status', fakeAsync(
        inject([XHRBackend, TaskListTwoService], (xhrBackend, taskSrv) => {

            const notCompletedTask = taskSrv.getTaskByFlag(taskLs, 'completed');
            expect(notCompletedTask.length).toBe(2);
        })
    ));
});
