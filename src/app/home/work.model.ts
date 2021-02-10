export class WorkModel {
    public name: string;
    public worker: string;
    public tools: string[];
    public chemicals: {name: string, amount: number}[];
    public startDate: Date;
    public endDate: Date;
    public locationIni: Point;
    public locationEnd: Point;
    public notes: string;
}

export class Point {
    public zone: string;
    public row: string;
    public plant: string;

    constructor(zone: string, row: string, plant: string) {
        this.zone = zone;
        this.row = row;
        this.plant = plant;
    }
}