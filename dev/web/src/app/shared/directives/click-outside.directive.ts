import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[vthClickOutside]'
})
export class ClickOutsideDirective {
  constructor(private _elementRef: ElementRef) {
  }

  @Output()
  public vthClickOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(element) {
    const clickedInside = this._elementRef.nativeElement.contains(element);

    if (!clickedInside) {
      this.vthClickOutside.emit(element);
    }
  }
}
