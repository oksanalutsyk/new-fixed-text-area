import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { combineLatest, fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('textarea', { static: true }) textArea: ElementRef;
  @ViewChild('rowsCountInput', { static: true }) rowsCountInput: ElementRef;
  @ViewChild('lineHeightInput', { static: true }) lineHeightInput: ElementRef;
  @ViewChild('fontSizeInput', { static: true }) fontSizeInput: ElementRef;

  private subscription = new Subscription();

  rowsCount = '3';
  lineHeight = '20px';
  fontSize = '20px';

  blockEnter = false;
  blockInit = false;
  elem

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
  showPosition(e) {
    console.log('Block enter ',this.blockEnter)
    this.elem = this.textArea.nativeElement;

    this.textAreaLimit(e)

    console.log(this.elem.selectionEnd )
    console.log(this.elem.value.length )
    if (this.elem.selectionEnd < this.elem.value.length) {
      if (this.blockInit == true) {
        console.log('BLOCK');
        this.blockEnter = true;
        return this.elem.selectionEnd;
      }
      this.blockEnter = false;
    }
  }
  onKeydownEvent(e) {
    if (this.blockEnter == true) {
      if (e.key === 'Enter') {
        return false;
      }
    }
  }
  textAreaLimit(e) {
    console.log(this.elem.clientHeight)
    console.log(this.elem.scrollHeight)
    while (this.elem.clientHeight < this.elem.scrollHeight) {
      this.blockInit = true;
      this.blockEnter = true;
      console.log('Block enter ',this.blockEnter);
      return (this.elem.value = this.elem.value.slice(0, -1));
    }
    if (this.elem.selectionEnd < this.elem.value.length) {
      if (this.blockInit == true) {
        console.log('BLOCK');
        // console.log(this.elem.selectionEnd);
        this.blockEnter = true;
        return this.elem.selectionEnd;
      }
      this.blockEnter = false;
    }
    else {
      this.blockInit = false;
      this.blockEnter = false;
    }
   
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
