import {Component, Input, Output, ElementRef, EventEmitter, OnInit, HostListener} from '@angular/core';
import { zoomState, restartState } from '../../pro/animations/animations.component';

declare var screenfull: any;

import 'hammerjs';

@Component({
  selector: 'mdb-image-modal',
  animations: [zoomState, restartState] ,
  templateUrl: 'image-popup.html',
  // host: {
  //   '(document:keyup)': 'keyboardControl($event)'
  // },
})

export class ImageModalComponent implements OnInit {
  public _element: any;
  public opened = false;
  public imgSrc: string;
  public currentImageIndex: number;
  public loading= false;
  public showRepeat= false;
  public isMobile = false;

  public openModalWindow: any;

  zoomed = 'inactive';

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight'};

  @Input('modalImages') public modalImages: any;
  @Input('imagePointer') public imagePointer: number;

  @Input('fullscreen') public fullscreen: boolean;
  @Input('zoom') public zoom: boolean;
  @Input('smooth') public smooth = true;
  @Input('type') public type: String;

  @Output('cancelEvent') cancelEvent = new EventEmitter<any>();
  constructor(public element: ElementRef) {
  this._element = this.element.nativeElement;
  try {
    document.createEvent('TouchEvent');
    this.isMobile = true;
  } catch (err) {
    this.isMobile = false;
    return;
  }
  }

  toggleZoomed() {
  this.zoomed = (this.zoomed === 'inactive') ? 'active' : 'inactive';
  this.zoom = !this.zoom;
  }


  toggleRestart() {
  this.zoomed = (this.zoomed === 'inactive') ? 'active' : 'inactive';
  }

  ngOnInit() {
    this.loading = true;
    if (this.imagePointer >= 0) {
    this.showRepeat = false;
    this.openGallery(this.imagePointer);
  } else {
    this.showRepeat = true;
  }
  }

  closeGallery() {
  this.smooth = false;
  this.zoom = false;
  if (screenfull.enabled) {
     screenfull.exit();
  }
  this.opened = false;
  this.cancelEvent.emit(null);
  }

  prevImage() {
  // this.smooth = false;
  // this.zoom = false;
  this.loading = true;
  this.currentImageIndex--;
  if (this.currentImageIndex < 0) {
    this.currentImageIndex = this.modalImages.length - 1  ;
  }
  this.openGallery(this.currentImageIndex);
  }

  nextImage() {
  // this.smooth = false;
  // this.zoom = false;
  this.loading = true;
  this.currentImageIndex++;
  if (this.modalImages.length === this.currentImageIndex) {
    this.currentImageIndex = 0;
  }
  this.openGallery(this.currentImageIndex);
  }

  openGallery(index: any) {
  if (!index) {
  this.currentImageIndex = 1;
  }
  this.currentImageIndex = index;
    this.opened = true;
   for (let i = 0; i < this.modalImages.length; i++) {
      if (i === this.currentImageIndex ) {
        this.imgSrc = this.modalImages[i].img;
        this.loading = false;
        break;
      }
     }
  }

  fullScreen(): any {
  if (screenfull.enabled) {
    screenfull.toggle();
  }
  }

  get is_iPhone_or_iPod() {
  if (navigator && navigator.userAgent && navigator.userAgent != null) {
    const strUserAgent = navigator.userAgent.toLowerCase();
    const arrMatches = strUserAgent.match(/ipad/);
    if (arrMatches != null) {
      return true;
    }
  }
  return false;
  }

  @HostListener('document:keyup', ['$event'])
  keyboardControl(event: KeyboardEvent) {
  if (event.keyCode === 39) {
    this.nextImage();
  }
  if (event.keyCode === 37) {
    this.prevImage();
  }
  if (event.keyCode === 27) {
    this.closeGallery();
  }
  }


   swipe( action: String = this.SWIPE_ACTION.RIGHT) {
    // let thisImg = this._element.querySelector('.ng-gallery-content').querySelector('img[src="' + this.imgSrc + '"]');

    if (action === this.SWIPE_ACTION.RIGHT) {
      this.nextImage();
      // console.log(event.distance, this.modalImages);
    }

    // previous
    if (action === this.SWIPE_ACTION.LEFT) {
       this.prevImage();
    }

  }

}
