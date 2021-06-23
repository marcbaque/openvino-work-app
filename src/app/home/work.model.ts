export class WorkModel {
    public type: string;
    public name: string;
    public tools: string[];
    public chemicals: {name: string, amount: number}[];
    public startDate: Date;
    public endDate: Date;
    public locationIni: Point;
    public locationEnd: Point;
    public notes: string;

    public hash: string;

    constructor(data?: {
        chemicals: string;
        end_claro: string;
        end_plant: number;
        end_row: number;
        end_timestamp: string;
        hash: string;
        ini_claro: string;
        ini_plant: number;
        ini_row: number;
        ini_timestamp: string;
        notes: string;
        public_key: string;
        task_id: number;
        tools_used: string[]
    }) {
        if (data) {
            this.name = data.task_id.toString();
            this.startDate = new Date(data.ini_timestamp);
            this.endDate = new Date(data.end_timestamp);
        }
    }
}

export class Point {
    public zone: string;
    public row: string;
    public plant: string;

    constructor(data: {
        zone: string, row: string, plant: string
    }) {
        if (data) {
            this.zone = data.zone;
            this.row = data.row;
            this.plant = data.plant;
        }
    }
}