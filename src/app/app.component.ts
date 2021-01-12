import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { combineLatest, fromEvent } from 'rxjs';
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

  rowsCount = '5';
  lineHeight = '50px';
  fontSize = '20px';

  ngOnInit(): void {
    // const textArea$ = fromEvent(this.textArea.nativeElement, 'input');
    const rowsCountInput$ = fromEvent(this.rowsCountInput.nativeElement, 'input');
    const lineHeightInput$ = fromEvent(this.lineHeightInput.nativeElement, 'input');
    const fontSizeInput$ = fromEvent(this.fontSizeInput.nativeElement, 'input');
    const updateTextAreaStream$ = combineLatest([rowsCountInput$, lineHeightInput$, fontSizeInput$])
    .pipe(
      debounceTime(1200),
      distinctUntilChanged()
    )
    .subscribe((data:any) => {
      this.rowsCount = data[0].target.value;
      this.lineHeight = data[1].target.value + 'px';
      this.fontSize = data[2].target.value + 'px';
      // data[0].target.value
      console.log(data[0].target.value)
    });
      // .subscribe((data) => {
      //   data.forEach((d:any)=> {
      //     // console.log(d.target.value)
      //   }) 
      // });
  }
}
