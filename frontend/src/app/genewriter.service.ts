import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GeneWriterService {

  constructor(private webReqService: WebRequestService, http: HttpClient) { }

  getThings() {
    return this.webReqService.get('');
  }

  getElements() {
    return this.webReqService.get('new');
  }

  createSomething(description: string, content: string, title: string, writer: string, date: string) {
    return this.webReqService.post('', { description, content, title, writer, date });
  }

  addComment(thingID: string, title: {content: String, writer: String, date: String, time: String}) {
    return this.webReqService.patch(`thing/${thingID}`, { title });
  }

  getSelectedThing(thingID: string) {
    return this.webReqService.get(`thing/${thingID}`);
  }
  
  getSearchResults(searchTerm: string) {
    return this.webReqService.get(`search/${searchTerm}`);
  }
}
