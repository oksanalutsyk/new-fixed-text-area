import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { combineLatest, fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // @ViewChild('textarea', { static: true }) textArea: ElementRef;
  @ViewChild('rowsCountInput', { static: true }) rowsCountInput: ElementRef;
  @ViewChild('lineHeightInput', { static: true }) lineHeightInput: ElementRef;
  @ViewChild('fontSizeInput', { static: true }) fontSizeInput: ElementRef;

  private subscription = new Subscription();

  rowsCount = '5';
  lineHeight = '20px';
  fontSize = '20px';

  ngOnInit(): void {
    this.initComponent();
  }

  private initComponent() {
    // const textArea$ = fromEvent(this.textArea.nativeElement, 'input');
    const rowsCountInput$ = fromEvent(
      this.rowsCountInput.nativeElement,
      'input'
    );
    const lineHeightInput$ = fromEvent(
      this.lineHeightInput.nativeElement,
      'input'
    );
    const fontSizeInput$ = fromEvent(this.fontSizeInput.nativeElement, 'input');

    const rowsCountStream$ = rowsCountInput$
      .pipe(debounceTime(1200), distinctUntilChanged())
      .subscribe((data: any) => {
        this.rowsCount = data.target.value;
      });
    this.subscription.add(rowsCountStream$);

    const lineHeightStream$ = lineHeightInput$
      .pipe(debounceTime(1200), distinctUntilChanged())
      .subscribe((data: any) => {
        this.lineHeight = data.target.value + 'px';
      });
    this.subscription.add(lineHeightStream$);

    const fontSizeStream$ = fontSizeInput$
      .pipe(debounceTime(1200), distinctUntilChanged())
      .subscribe((data: any) => {
        this.fontSize = data.target.value + 'px';
      });
    this.subscription.add(fontSizeStream$);

    // const updateTextAreaStream$ = combineLatest([
    //   rowsCountInput$,
    //   lineHeightInput$,
    //   fontSizeInput$,
    // ]).pipe(debounceTime(1200), distinctUntilChanged())
    //   .subscribe((data: any) => {
    //     this.rowsCount = data[0].target.value;
    //     this.lineHeight = data[1].target.value;
    //     this.fontSize = data[2].target.value;
    //   });
    //   this.subscription.add(updateTextAreaStream$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
