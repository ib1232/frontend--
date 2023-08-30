import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { AuthService } from '../services/AuthService';
import { ListComponent } from '../list/list.component';
import { ship } from '../ship';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string | undefined;
  password: string | undefined;
  errorMessage = 'Données invalides !';
  successMessage: string | undefined;
  invalidLogin = false;
  loginSuccess = false;

  public ships: ship[] = [];
  ship: any;
  public editShip: ship | undefined;
  public deleteShip: ship | undefined;
  shipService: any;

  constructor(private authService: AuthService, private router: Router) {} // Inject Router
  ngOnInit(): void {
  this.getShips();
  this.shipList();
}
shipList() {
  throw new Error('Method not implemented.');
}



logout() {

this.router.navigate(['login']);
}
  handleLogin() {
    if (this.username === 'user' && this.password === '123') { // Check username and password
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Connexion réussie';

      this.router.navigate(['/list']); 
    } else {
      this.invalidLogin = true;
      this.loginSuccess = false;
    }
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

