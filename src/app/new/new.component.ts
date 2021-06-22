import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonDatetime, NavController, PickerController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { RSA_X931_PADDING } from 'constants';
import { Point, WorkModel } from '../home/work.model';
import { NewService } from './new.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewPage implements OnInit {

  @ViewChild('startDateComponent') startDateComponent: IonDatetime;
  @ViewChild('endDateComponent') endDateComponent: IonDatetime;

  public newItem: WorkModel = new WorkModel();

  public toolLabels = {};
  public typeLabels: { name: string, description:string }[][];
  public chemicalLabels: { name: string, value: string }[][];
  public locationLabels: { name: string, value: string }[][];

  public loading = false;

  constructor(
    public translate: TranslateService,
    public newService: NewService,
    public navCtrl: NavController,
    public alertController: AlertController,
    public pickerController: PickerController,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.toolLabels = this.translate.instant('tasks.tools')
    let taskType = this.translate.instant('tasks.types')
    let chemicals = this.translate.instant('tasks.labels.chemicals')
    let locations = this.translate.instant('tasks.locations')


    this.typeLabels = [
      Object.keys(taskType).map(type => {
        console.log(taskType[type].name)

        return {
          name: taskType[type].name,
          description:taskType[type].description
        }
      })
    ]

    
  
    this.chemicalLabels = [
      Object.keys(chemicals).map(chemical => {
        return {
          name: chemicals[chemical],
          value: chemical
        }
      }),
      [...Array(10).keys()].map(key => {
        return {
          name: key.toString(),
          value: key.toString()
        }
      })
    ]

    this.locationLabels = [
      Object.keys(locations.zones).map(zone => {
        return {
          name: locations.zones[zone],
          value: zone
        }
      }),
      locations.rows = [
        {name: "row_1", value: "1"},
        {name: "row_2", value: "2"},
        {name: "row_3", value: "3"},
        {name: "row_4", value: "4"}

      ],
      locations.plants = [
        {name: "plant_1", value: "1"},
        {name: "plant_2", value: "2"},
        {name: "plant_3", value: "3"},
        {name: "plant_4", value: "4"},
        {name: "plant_5", value: "5"},
        {name: "plant_6", value: "6"},
        {name: "plant_7", value: "7"}
      ],

    ]
    console.log(this.locationLabels, "location labels")
    console.log(this.chemicalLabels, "chem labels")
  }

  back() {
    this.navCtrl.navigateBack('home')
  }


  async openTaskType() {
    let callback = (values) => {
      let taskType = {
        name: values[0].value,
     description: values[1].value
      };
      this.newItem.types = [taskType];
    }

    let picker = await this.openPicker(this.typeLabels, callback);
    await picker.present();
  }

  getTaskType() {
    if (this.newItem.chemicals) {
      return this.newItem.chemicals.map(chemical => `${chemical.amount}x ${this.chemicalLabels[0].find(chemicalLabel => chemical.name === chemicalLabel.value).name}`).join(', ')
    } else {
      return this.translate.instant('tasks.labels.chemicals')
    }
  }

  
  async openTools() {
    let callback = (values) => {
      this.newItem.tools = values;
    }

    let selected = this.newItem.tools ? this.newItem.tools : [];
    let alert = await this.openSelectAlert(this.translate.instant('tasks.labels.tools'), true, this.toolLabels, selected, callback);
    await alert.present();
  }

  getToolsLabel() {
    if (this.newItem.tools) {
      return this.newItem.tools.map(tool => this.toolLabels[tool]).join(', ')
    } else {
      return this.translate.instant('tasks.labels.tools')
    }
  }

  async openChemicals() {
    let callback = (values) => {
      let chemical = {
        name: values[0].value,
        amount: parseInt(values[1].value),
      };
      this.newItem.chemicals = [chemical];
    }

    let picker = await this.openPicker(this.chemicalLabels, callback);
    await picker.present();
  }

  getChemicalLabel() {
    if (this.newItem.chemicals) {
      return this.newItem.chemicals.map(chemical => `${chemical.amount}x ${this.chemicalLabels[0].find(chemicalLabel => chemical.name === chemicalLabel.value).name}`).join(', ')
    } else {
      return this.translate.instant('tasks.labels.chemicals')
    }
  }

  async openStart() {
    this.startDateComponent.open();

    this.startDateComponent.ionChange.subscribe(value => {
      let date = new Date(value.detail.value)
      this.newItem.startDate = date;
    })
  }

  getStartLabel() {
    if (this.newItem.startDate) {
      return this.datePipe.transform(this.newItem.startDate, 'd/M/yy, HH:mm')
    } else {
      return this.translate.instant('tasks.labels.start')
    }
  }

  async openEnd() {
    this.endDateComponent.open();

    this.endDateComponent.ionChange.subscribe(value => {
      let date = new Date(value.detail.value)
      this.newItem.endDate = date;
    })
  }

  getEndLabel() {
    if (this.newItem.endDate) {
      return this.datePipe.transform(this.newItem.endDate, 'd/M/yy, HH:mm')
    } else {
      return this.translate.instant('tasks.labels.end')
    }
  }


  async openLocationStart() {
    let callback = (values) => {
      let point = new Point({
        zone: values[0].value,
        row: values[1].value,
        plant: values[2].value
      });
      this.newItem.locationIni = point;
    }

    let picker = await this.openPicker(this.locationLabels, callback);
    await picker.present();
  }

  getLocationStartLabel() {
    if (this.newItem.locationIni) {
      let zone = this.locationLabels[0].find(item => item.value == this.newItem.locationIni.zone).name;
      let row = this.locationLabels[1].find(item => item.value == this.newItem.locationIni.row).name;
      let plant = this.locationLabels[2].find(item => item.value == this.newItem.locationIni.plant).name;
      return `${zone} ${row} ${plant}`
    } else {
      return this.translate.instant('tasks.labels.location-start')
    }
  }

  async openLocationEnd() {
    let callback = (values) => {
      let point = new Point({
        zone: values[0].value,
        row: values[1].value,
        plant: values[2].value
      });
      this.newItem.locationEnd = point;
    }

    let picker = await this.openPicker(this.locationLabels, callback);
    await picker.present();
  }

  getLocationEndLabel() {
    if (this.newItem.locationEnd) {
      let zone = this.locationLabels[0].find(item => item.value == this.newItem.locationEnd.zone).name;
      let row = this.locationLabels[1].find(item => item.value == this.newItem.locationEnd.row).name;
      let plant = this.locationLabels[2].find(item => item.value == this.newItem.locationEnd.plant).name;
      return `${zone} ${row} ${plant}`
    } else {
      return this.translate.instant('tasks.labels.location-end')
    }
  }

  async openNotes() {
    let callback = (value) => {
      console.log(value)
      this.newItem.notes = value && value[0];
    }

    let alert = await this.openTextAreaAlert(this.translate.instant('tasks.labels.notes'), this.newItem.notes, callback);
    await alert.present();
  }

  getNotesLabel() {
    if (this.newItem.notes) {
      return this.newItem.notes
    } else {
      return this.translate.instant('tasks.labels.notes')
    }
  }

  private async openSelectAlert(title: string, multiple: boolean, inputs: { [key: string]: string }, selected: string[], callback: (value: any) => void) {
    return this.alertController.create({
      header: title,
      inputs: Object.keys(inputs).map(key => {
        return {
          type: multiple ? 'checkbox' : 'radio',
          cssClass: 'select-interface-option',
          label: inputs[key] || '',
          value: key,
          checked: selected.some((value) => key == value)
        }
      }),
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
        },
        {
          text: "Ok",
          handler: callback
        }
      ],
      cssClass: ['select-alert', 'single-select-alert']
    });
  }

  private async openTextAreaAlert(title: string, value: string, callback: (value: any) => void) {
    return this.alertController.create({
      header: title,
      inputs: [{
        type: 'textarea',
        cssClass: 'select-interface-option',
        value,
      }],
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
        },
        {
          text: "Ok",
          handler: callback
        }
      ],
      cssClass: ['select-alert', 'single-select-alert']
    });
  }

  private async openPicker(columns: { name: string, value: string }[][], callback: (value: any) => void) {
    let options = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: callback
        }
      ],
      columns: columns.map((column, index) => {
        return {
          name: `${index}`,
          options: column.map(item => {
            return {
              text: item.name,
              value: item.value
            }
          })
        }
      })
    };
    return this.pickerController.create(options);
  }

  isValid() {
    if (
      !this.loading &&
      this.newItem.name &&
      this.newItem.tools && this.newItem.tools.length > 0 &&
      this.newItem.chemicals && this.newItem.chemicals.length > 0 &&
      this.newItem.startDate &&
      this.newItem.endDate &&
      this.newItem.locationIni &&
      this.newItem.locationEnd
    ) {
      return true
    }
    return false
  }

  createTask() {
    this.loading = true;
    this.newService.createTask(this.newItem)
      .subscribe(() => {
        this.loading = false;
        this.navCtrl.navigateRoot('home')
      }, () => {
        this.loading = false;
      })
  }
}
