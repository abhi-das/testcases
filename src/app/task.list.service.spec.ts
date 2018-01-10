import {
    TestBed, inject, async
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
    TaskListService
} from './task.list.service';

import {
    MockBackend
} from '@angular/http/testing';


describe('should load JSON data', () => {

    let taskLs;
    let localTaskLs: any;
    let mockRes: any;

    beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpModule],
                providers: [
                    TaskListService, {
                        provide: XHRBackend,
                        useClass: MockBackend
                    }
                ]
            });
        // Local variable initialize
        mockRes = {
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
    });

    it('should create service',
        inject([TaskListService], (taskListService) => {
            expect(taskListService).toBeTruthy();
        })
    );

    it('should return tasks from JSON data',
        inject([TaskListService, XHRBackend], (taskListService, xhrBackend) => {

            xhrBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockRes)
                })));
            });

            taskListService.getTaskList().subscribe((res) => {

                taskLs = res['tasks'];
                localTaskLs = res;
                expect(taskLs.length).toBe(3);
            });
        })
    );

    it('should return task list by completed status',
        inject([TaskListService, XHRBackend], (taskListService, xhrBackend) => {

            const completedTask = taskListService.getTaskByFlag('completed', localTaskLs);

            expect(completedTask.length).toBe(2);

        })
    );

    it('should return task list by notCompleted status',
        inject([TaskListService, XHRBackend], (taskListService, xhrBackend) => {

            const notCompletedTask = taskListService.getTaskByFlag('notCompleted', localTaskLs);
            expect(notCompletedTask.length).toBe(1);

        })
    );

});
