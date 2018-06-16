import {Component, OnInit} from '@angular/core';
import {Reminder} from '../models/reminder';
import {Recurring} from '../models/recurring';
import {ActivatedRoute} from '@angular/router';
import {SearchService} from '../services/search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  reminders: Reminder[] = [];
  recurring: Recurring[] = [];
  query = '';

  constructor(private route: ActivatedRoute, private searchService: SearchService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(map => {
      this.query = this.route.snapshot.paramMap.get('text');
      this.searchService.search(this.query)
        .then((res) => {
          this.reminders = res.reminders;
          this.recurring = res.recurring;
        });
    });
  }

}
