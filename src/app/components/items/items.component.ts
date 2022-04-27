
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Item } from '../../models/item';
import { ItemService } from 'src/app/services/item.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[] = [];
  total:number = 0;

  constructor(private itemService:ItemService) { }

  ngOnInit(): void {
    //this.items = [];
    //this.items = this.itemService.getItems();
    this.itemService.getItems().subscribe(data => {
      this.items = data;
      this.getTotal();
    })



  }

  deleteItem(item: Item){
this.items = this.items.filter(x => x.id !== item.id) ;
this.itemService.deleteItem(item).subscribe();
this.getTotal();
  }

  toggleItem(item:Item){
    this.itemService.toggleItem(item).subscribe();
    this.getTotal();
  }

  getTotal(){
    this.total = this.items
                .filter(item => !item.completed).
                 map ((item: { quantity: number; price: number; }) => item.quantity * item.price).
                 reduce( (acc: any, item: any) => acc += item, 0);
  }

}
function reduce(arg0: (acc: any, item: any) => any, arg1: number) {
  throw new Error('Function not implemented.');
}

