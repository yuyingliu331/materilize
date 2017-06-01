import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, } from '@angular/http';
import {AdalService} from 'ng2-adal/core';
/**import {Observable} from 'rxjs/Observable';**/
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';

@Injectable()
export class GetDataService {
  constructor(public http: Http, private adalService: AdalService) {
    this.http = http;

  }
  jwt(): any {

    /** Auth settings **/
    let apiKey = 'F3A4F748-604A-4CDB-83AF-58B20FAC327B';
    let headers = new Headers();
    let token = localStorage.getItem('id_token');
    headers.append('ApiKey', apiKey);
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({headers: headers});
    return options;
  }

  getDevUrl(): any {
    /** dev setting **/
    return 'http://als-dev-1.mtvn.ad.viacom.com/alias/dev1/';
  }

  getLocalUrl(): any {
    /** local settings **/
    return 'http://localhost:55200/';
  }

  getSystemOrigin(): any {
    return this.http.get(this.getDevUrl() + 'SystemOfOrigin', this.jwt())
                    .map(response  => response.json());
  }


  getPriority(): any {
    return this.http.get(this.getDevUrl() + 'Priorities', this.jwt())
      .map(response  => response.json());
  }

  getContentType(): any {
    return this.http.get(this.getDevUrl() + 'ContentType', this.jwt())
      .map(response  => response.json());
  }

  getChannel(): any {
    return this.http.get(this.getDevUrl() + 'Channels', this.jwt())
      .map(response  => response.json());
  }

  getRen(): any {
    let  newRen =  this.http.get(this.getDevUrl() + 'Rendition', this.jwt());
    return this.http.get(this.getDevUrl() + 'Rendition', this.jwt())
      .map(data => data.json())
      .catch((err: any) => err);
  }
  getFormat(): any {
    return this.http.get(this.getDevUrl() + 'api/Formats/RenditionId?renditionId=102', this.jwt())
      .map(response  => response.json());
    
  }

  getWorkFlow(formatId: number): any {
    let serviceUrl = "/api/workflowtemplate/sourceFormat?formatID=" + formatId + "&$filter=WorkflowTemplateType eq 'Ingest' and IsActive eq true";
    return this.http.get(this.getDevUrl() + serviceUrl, this.jwt())
      .map(response  => response.json());
  }

  getArchivalRule() : any {
    return this.http.get(this.getDevUrl() + 'ArchivalRules', this.jwt())
              .map(response => response.json());
  }
  


}
