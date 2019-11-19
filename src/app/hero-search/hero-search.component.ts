import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Hero} from '../hero';
import {HeroService} from '../services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})

export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  // TODO: Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      // TODO: Wait 300ms after each keystroke before considering the term.
      debounceTime(300),

      // TODO: Ignore new term if same as previous term.
      distinctUntilChanged(),

      // TODO: Switch to new search observable each time the term changes.
      switchMap((term) => this.heroService.searchHeroes(term))
    );
  }

}
