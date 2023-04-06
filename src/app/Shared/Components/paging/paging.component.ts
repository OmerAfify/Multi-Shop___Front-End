import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

  @Input() itemsPerPage : any;
  @Input() totalItemsCount : any;
  @Output() E_pageChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  OnPagingChange(event:any){
  this.E_pageChanged.emit(event.page);
}

}
