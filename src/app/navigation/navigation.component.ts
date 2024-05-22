import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit{
  
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
