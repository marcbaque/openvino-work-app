import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../core/auth.service';
import { EnchainteService } from '../core/enchainte.service';
import { WorkModel } from '../home/work.model';

@Injectable({
  providedIn: 'root'
})
export class NewService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private enchainteService: EnchainteService
  ) { }

  public createTask(task: WorkModel) {
    let account = this.authService.getAccount();

    let data = {
      hash: task.hash,
      public_key: account,
      ini_timestamp: task.startDate.toISOString(),
      ini_claro: task.locationIni.zone,
      ini_row: parseInt(task.locationIni.row),
      ini_plant: parseInt(task.locationIni.plant),
      end_timestamp: task.endDate.toISOString(),
      end_claro: task.locationEnd.zone,
      end_row: parseInt(task.locationEnd.row),
      end_plant: parseInt(task.locationEnd.plant),
      task_id: parseInt(task.type),
      tools_used: task.tools.map(tool => parseInt(tool)),
      chemicals: task.chemicals? task.chemicals.map(chemical => parseInt(chemical.name)) : undefined,
      chemicals_amount: task.chemicals? task.chemicals.map(chemical => chemical.amount) : undefined,
      notes: task.notes,
      category_id: parseInt(task.categories[0]),

      
    }
    
    return this.enchainteService.write(data).pipe(
      map(hash => {
        return {
          ...data,
          hash
        }
      }),
      switchMap(body => {
        return this.http.post(`${environment.apiUrl}/tasks`, body)
      })
    );    
  }
}
