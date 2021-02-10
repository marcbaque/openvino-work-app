import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewService {

  constructor() { }

  public getLabels() {
    return of({
      types: {
        ["1"]: "Type 1",
        ["2"]: "Type 2",
        ["3"]: "Type 3",
        ["4"]: "Type 4"
      },
      tools: {
        ["1"]: "Tool 1",
        ["2"]: "Tool 2",
        ["3"]: "Tool 3",
        ["4"]: "Tool 4"
      },
      chemicals: {
        ["1"]: "Chemical 1",
        ["2"]: "Chemical 2",
        ["3"]: "Chemical 3",
        ["4"]: "Chemical 4"
      },
      locations: [
        [
          {
            name: "Cabernet 1",
            value: "cabernet1"
          },
          {
            name: "Cabernet 2",
            value: "cabernet2"
          },
          {
            name: "Cabernet 3",
            value: "cabernet3"
          },
          {
            name: "Cabernet 4",
            value: "cabernet4"
          },
          {
            name: "Cabernet 5",
            value: "cabernet5"
          }
        ],
        [
          {
            name: "R1",
            value: "1"
          },
          {
            name: "R2",
            value: "2"
          }
        ],
        [
          {
            name: "P1",
            value: "1"
          },
          {
            name: "P2",
            value: "2"
          }
        ]
      ]
    })
  }
}
