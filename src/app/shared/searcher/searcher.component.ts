import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { INestedDropDown, ISearcherOptions } from 'src/app/utils/models/filter';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {

  @Input() searcherName: string = 'Buscador';
  @Input() list: any[] = [];
  @Input() searchOptions: ISearcherOptions[] = [];
  @Output() listFilteredOutput: EventEmitter<any[]> = new EventEmitter();

  filteredList: any[] = [];

  selectedOption: ISearcherOptions | undefined | null


  selectedFromNestedDrop: INestedDropDown | undefined

  selectedFromDate: string = '';
  selectedToDate: string = '';
  searchKey: string = '';
  searchKeyMoney: string = '';


  constructor() { 
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['list']?.currentValue){
      this.list = changes['list'].currentValue;
      this.filterList();
    }
  }

  ngOnInit(): void {
    
  }

  filterList(){
    
    
    let value: string;

    if(!this.selectedOption?.attribute){
      this.filteredList = [...this.list];
      this.listFilteredOutput.emit(this.filteredList);
  
      return;
    }

    const  attribute: string = this.selectedOption?.attribute;

    if(this.selectedOption?.isDropDown){

      if(!this.selectedFromNestedDrop?.value){
        return;
      }
      
      value = this.selectedFromNestedDrop.value;
      this.filteredList = [...this.list.filter(x=>x[attribute].toString().toLowerCase() == value.toString().toLowerCase())];
      this.listFilteredOutput.emit(this.filteredList);
      return;
    }

    if(!this.selectedOption.isMoney && !this.selectedOption.isDate && !this.selectedOption.isDropDown){
    
      value = this.searchKey?.trim();

      if(!value){
        this.filteredList = [...this.list];
      }else{
        try{
          this.filteredList = [...this.list.filter(x=> x[attribute]?.toString().toLowerCase().includes(value.toString().toLowerCase()))];
        }catch(e){
          this.filteredList = [...this.list];
        }
        
      }
      
      this.listFilteredOutput.emit(this.filteredList);
      return;
    }
    
  }

  clearOptions(){
    this.selectedFromDate = '';
    this.selectedToDate = '';
    this.searchKey = '';
    this.searchKeyMoney = '';
  }

  changeOption(){
    this.selectedFromNestedDrop = undefined
  }
}
