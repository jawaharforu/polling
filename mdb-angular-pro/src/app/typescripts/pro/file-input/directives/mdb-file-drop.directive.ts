import { Directive, ElementRef, EventEmitter, Input, Output, OnInit, OnDestroy, PLATFORM_ID, Inject, HostListener } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { MDBUploaderService, UploadOutput, UploadInput } from '../classes/mdb-uploader.class';

@Directive({
  selector: '[mdbFileDrop]'
})
export class MDBFileDropDirective implements OnInit, OnDestroy {
  @Input() uploadInput: EventEmitter<UploadInput>;
  @Output() uploadOutput: EventEmitter<UploadOutput>;

  upload: MDBUploaderService;
  isServer: boolean = isPlatformServer(this.platform_id);
  el: HTMLInputElement;

  constructor(@Inject(PLATFORM_ID) private platform_id: any, private elementRef: ElementRef) {
    this.upload = new MDBUploaderService();
    this.uploadOutput = new EventEmitter<UploadOutput>();
  }

  ngOnInit() {
    if (this.isServer) {
      return;
    }

    this.el = this.elementRef.nativeElement;

    this.upload.serviceEvents.subscribe((event: UploadOutput) => {
      this.uploadOutput.emit(event);
    });

    if (this.uploadInput instanceof EventEmitter) {
      this.upload.initInputEvents(this.uploadInput);
    }

    this.el.addEventListener('drop', this.stopEvent, false);
    this.el.addEventListener('dragenter', this.stopEvent, false);
    this.el.addEventListener('dragover', this.stopEvent, false);
    this.el.addEventListener('dragover', this.stopEvent, false);
  }

  ngOnDestroy() {
    if (this.isServer) {
      return;
    }

    this.uploadInput.unsubscribe();
  }

  stopEvent = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
  }

  @HostListener('drop', ['$event'])
  public onDrop(e: any) {
    e.stopPropagation();
    e.preventDefault();

    const event: UploadOutput = { type: 'drop' };
    this.uploadOutput.emit(event);
    this.upload.handleFiles(e.dataTransfer.files);
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(e: Event) {
    if (!e) {
      return;
    }

    const event: UploadOutput = { type: 'dragOver' };
    this.uploadOutput.emit(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(e: Event) {
    if (!e) {
      return;
    }

    const event: UploadOutput = { type: 'dragOut' };
    this.uploadOutput.emit(event);
  }
}
