import { Directive, ElementRef, EventEmitter, Input, Output, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { MDBUploaderService, UploadOutput } from '../classes/mdb-uploader.class';

@Directive({
  selector: '[mdbFileSelect]'
})
export class MDBFileSelectDirective implements OnInit, OnDestroy {
  @Input() uploadInput: EventEmitter<any>;
  @Output() uploadOutput: EventEmitter<UploadOutput>;

  upload: MDBUploaderService;
  isServer: boolean = isPlatformServer(this.platform_id);
  // el: HTMLInputElement;
  el: HTMLInputElement | any;

  constructor(@Inject(PLATFORM_ID) private platform_id: any, private elementRef: ElementRef) {
    this.upload = new MDBUploaderService();
    this.uploadOutput = new EventEmitter<UploadOutput>();
  }

  ngOnInit() {
    if (this.isServer) {
      return;
    }

    this.el = this.elementRef.nativeElement;
    this.el.addEventListener('change', this.fileListener, false);

    this.upload.serviceEvents.subscribe((event: UploadOutput) => {
      this.uploadOutput.emit(event);
    });

    if (this.uploadInput instanceof EventEmitter) {
      this.upload.initInputEvents(this.uploadInput);
    }
  }

  ngOnDestroy() {
    if (this.isServer) {
      return;
    }

    this.el.removeEventListener('change', this.fileListener, false);
    this.uploadInput.unsubscribe();
  }

  fileListener = () => {
    this.upload.handleFiles(this.el.files);
  }
}
