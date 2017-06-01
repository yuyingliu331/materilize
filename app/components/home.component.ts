import {Component, OnInit  } from '@angular/core';
import {AdalService} from 'ng2-adal/core';
import { GetDataService } from '../services/data.service';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'home',
  templateUrl: '/app/components/home.html',
  providers: [Modal]
})
export class HomeComponent implements OnInit   {
  systemOfOrigins = new Array();
  channels =  new Array();
  contentTypes =  new Array();
  priorities =  new Array();
  renditions =  new Array();
  workflows =  new Array();
  archivalRules =  new Array();
  formats =  new Array();
  defaultSoO = '';
  defaultPriority = '';
  defaultContentType = '';
  isRush = false;
  selectedPriority = '';
  formatSelected: any;


  constructor(private adalService: AdalService, private dataService: GetDataService) {
     console.log('entering home');
     this.workflows = [{"name":''}];
  }

  public logOut() {
    this.adalService.logOut();
  }

  loadData() {
    this.dataService.getSystemOrigin()
        .subscribe((data: any) => {
      this.systemOfOrigins = data['value'];
      this.defaultSoO = this.systemOfOrigins[9];
    });

    this.dataService.getPriority()
       .subscribe((data: any) => {
      this.priorities = data['value'];

    });

    this.dataService.getChannel()
      .subscribe((data: any) => {
        this.channels = data['value'];
     
      });

    this.dataService.getContentType()
      .subscribe((data: any) => {
        this.contentTypes = data['value'];
        this.defaultContentType = this.contentTypes[1];
      });
    
    this.dataService.getRen()
      .subscribe((data: any) => {
        this.renditions = data['value'];
        this.renditions = this.renditions.filter(data => { 
            return data['IsDigital'] == true;
            });
      });

    this.dataService.getFormat()
      .subscribe((data: any) => {
        this.formats = data;
      });

    this.dataService.getArchivalRule()
    .subscribe((data: any) => {
      this.archivalRules = data['value'];
    });
}

 updateWorkFlowChange(format: any): any {
   let formatId = format['FormatId'];
    this.dataService.getWorkFlow(formatId)
                    .subscribe((data: any) => {
       this.workflows = data;
      });
 }

  browseFile() {
   // this.modal.alert()
  }

  getSelectedValue(name: any){
      console.log('name', name);
  }
 
  ngOnInit () {
    this.loadData();
  }
}  


