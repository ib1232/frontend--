import { Component, OnInit } from '@angular/core';
import { ship } from '../ship';
import { shipService } from '../ship.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/AuthService';
import { ActivatedRoute, Route, Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  public ships: ship[] = [];
  ship: any;
  public editShip: ship | undefined;
  public deleteShip: ship | undefined;
  //pagination

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5,10,15,20];
  

  constructor (private shipService: shipService, private router: Router){}

//pagination
shipList():void{
  this.shipService.getShips().subscribe((response)=>{
    this.ships=response;
    console.log(this.ships);
  })
}

onTableDataChange(event: any){
  this.page=event;
  this.shipList
}

onTableSizeChange(event:any):void{
  this.tableSize= event.target.value;
  this.page=1;
  this.shipList();
}

logout() {

  this.router.navigate(['login']);
}


//CRUD
  ngOnInit() {
    this.getShips();
    this.shipList();
  }

  public getShips(): void{
    this.shipService.getShips().subscribe(
      (response: ship[])=> {
        this.ships= response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddShip(addForm: NgForm): void {
   
    this.shipService.addShip(addForm.value).subscribe(
      (response: ship) => {
        console.log(response);
        this.getShips();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateShip(ship: ship): void {
    this.shipService.updateShip(ship).subscribe(
      (response: ship) => {
        console.log(response);
        this.getShips();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteShip(shipId: number ): void {
    this.shipService.deleteShip(shipId).subscribe(
      (response: void) => {
        console.log(response);
        this.getShips();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchShips(key: string): void {
    console.log(key);
    const results: ship[] = [];
    const searchKey = key ? key.toLowerCase() : ''; // Convert the key to lowercase if it's not null or undefined
  
    for (const ship of this.ships) {
      if (
        ship.nom.toLowerCase().indexOf(searchKey) !== -1 ||
        ship.post.toLowerCase().indexOf(searchKey) !== -1 ||
        ship.terminal.toLowerCase().indexOf(searchKey) !== -1 ||
        ship.grue.toLowerCase().indexOf(searchKey) !== -1 ||
        ship.engin.toLowerCase().indexOf(searchKey) !== -1 ||
        ship.equipe.toLowerCase().indexOf(searchKey) !== -1
      ) {
        results.push(ship);
      }
    }
  
    this.ships = results;
  
    if (!key || results.length === 0) {
      this.getShips();
    }
  }

  

  public onOpenModal(ship: ship, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addShipModal');
    }
    if (mode === 'edit') {
      this.editShip = ship;
      button.setAttribute('data-target', '#updateShipModal');
    }
    if (mode === 'delete') {
      this.deleteShip = ship;
      button.setAttribute('data-target', '#deleteShipModal');
    }
    if (container !== null) {
    container.appendChild(button);
    button.click();
  }
}

}
