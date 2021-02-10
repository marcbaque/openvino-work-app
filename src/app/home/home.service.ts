import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { WorkModel } from './work.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  public getTasks() {
    let task = new WorkModel();
    task.name = "Type 1"
    task.startDate = new Date();
    task.endDate = new Date();

    let taskList = [];
    for (let i = 0; i<20; ++i) {
      taskList.push(task)
    }
    return of(taskList);
  }
}
