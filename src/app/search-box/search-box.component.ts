import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  query = '';

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  search() {
    if (this.query === '') {
      return;
    }
    this.router.navigate(['search', this.query]);
  }

}
