import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  searchText: String = '';

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  search(text: String) {
    if (text === '') {
      return;
    }
    this.router.navigate(['search', text]);
  }

}
