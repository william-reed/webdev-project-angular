import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() activePage = '';
  query = '';

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  search(text: string) {
    if (text === '') {
      return;
    }
    this.router.navigate(['search', text]);
  }
}
