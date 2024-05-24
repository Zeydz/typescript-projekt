import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import {
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule, MatSlideToggleModule, FormsModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit{
  isChecked: boolean = false;

  onToggleChange(event: any): void {
    this.isChecked = event.checked;
  }

  /* Kod för mobilmeny */
  ngOnInit(): void {
    const menu = document.getElementById('togglemenuicon');
    const navlist = document.querySelector('.navlist');
    const header = document.querySelector('header');

    menu?.addEventListener('click', () => {
      menu?.classList.toggle('fa-xmark');
      navlist?.classList.toggle('open');
      header?.classList.toggle('sticky');
    });

    navlist?.addEventListener('click', () => {
      navlist.classList.toggle('open');
      menu?.classList.toggle('fa-xmark');
    });
  }


}
