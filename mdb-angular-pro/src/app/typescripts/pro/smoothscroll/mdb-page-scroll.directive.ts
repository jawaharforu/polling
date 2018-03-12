import {
  Directive,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  Inject,
  Optional,
  OnChanges,
  HostListener
} from '@angular/core';
import {
  Router,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
  UrlTree
} from '@angular/router';
import {DOCUMENT} from '@angular/platform-browser';

import {Subscription} from 'rxjs/Subscription';

import {PageScrollService} from './mdb-page-scroll.service';
import {PageScrollInstance} from './mdb-page-scroll.instance';
import {PageScrollUtilService as Util} from './mdb-page-scroll-util.service';
import {EasingLogic} from './mdb-page-scroll.config';

@Directive({
  selector: '[mdbPageScroll]'
})
export class PageScrollDirective implements OnChanges, OnDestroy {

  @Input()
  public routerLink: any;

  @Input()
  public href: string;

  @Input()
  // public pageScrollHorizontal: boolean = null;
  public pageScrollHorizontal: boolean | any = null;

  @Input()
  // public pageScrollOffset: number = null;
  public pageScrollOffset: number | any = null;

  @Input()
  // public pageScrollDuration: number = null;
  public pageScrollDuration: number | any = null;

  @Input()
  // public pageScrollSpeed: number = null;
  public pageScrollSpeed: number | any = null;

  @Input()
  // public pageScrollEasing: EasingLogic = null;
  public pageScrollEasing: EasingLogic | any = null;

  @Input()
  public pageScrollInterruptible: boolean;

  @Input()
  public pageScrollAdjustHash = false;

  @Input()
  // public pageScroll: string = null;
  public pageScroll: string | any = null;

  @Output()
  pageScrollFinish: EventEmitter<boolean> = new EventEmitter<boolean>();

  // private pageScrollInstance: PageScrollInstance;
  private pageScrollInstance: PageScrollInstance | any;
  private document: Document;

  constructor(private pageScrollService: PageScrollService, @Optional() private router: Router, @Inject(DOCUMENT) document: any) {
    this.document = <Document> document;
  }

  ngOnChanges(): void {
    // Some inputs changed, reset the pageScrollInstance
    this.pageScrollInstance = undefined;
  }

  ngOnDestroy(): void {
    if (this.pageScrollInstance) {
        this.pageScrollService.stop(this.pageScrollInstance);
    }
    return undefined;
  }

  // private generatePageScrollInstance(): PageScrollInstance {
    private generatePageScrollInstance(): PageScrollInstance | any {
    if (Util.isUndefinedOrNull(this.pageScrollInstance)) {
      this.pageScrollInstance = PageScrollInstance.newInstance({
          document: this.document,
          scrollTarget: this.href,
          scrollingViews: null,
          namespace: this.pageScroll,
          verticalScrolling: !this.pageScrollHorizontal,
          pageScrollOffset: this.pageScrollOffset,
          pageScrollInterruptible: this.pageScrollInterruptible,
          pageScrollEasingLogic: this.pageScrollEasing,
          pageScrollDuration: this.pageScrollDuration,
          pageScrollSpeed: this.pageScrollSpeed,
          pageScrollFinishListener: this.pageScrollFinish
      });
    }
    return this.pageScrollInstance;
  }

  private pushRouterState() {
    if (this.pageScrollAdjustHash && typeof this.pageScrollInstance.scrollTarget === 'string'
        && this.pageScrollInstance.scrollTarget.substr(0, 1) === '#') {
        // "Navigate" to the current route again and this time set the fragment/hash
        this.router.navigate([], {
          fragment: <string>this.pageScrollInstance.scrollTarget.substr(1),
          preserveQueryParams: true
        });
    }
  }

  private scroll(): void {
    const pageScrollInstance = this.generatePageScrollInstance();
    this.pushRouterState();
    this.pageScrollService.start(pageScrollInstance);
  }

  @HostListener('click', ['$event']) public handleClick(): boolean {
    if (this.routerLink && this.router !== null && this.router !== undefined) {
        let urlTree: UrlTree;
        if (typeof this.routerLink === 'string') {
            urlTree = this.router.parseUrl(this.routerLink);
        } else {
            urlTree = this.router.createUrlTree(this.routerLink);
        }
        if (!this.router.isActive(urlTree, true)) {
            // We need to navigate their first.
            // Navigation is handled by the routerLink directive
            // so we only need to listen for route change
            const subscription: Subscription = <Subscription>this.router.events.subscribe((routerEvent) => {
                if (routerEvent instanceof NavigationEnd) {
                    subscription.unsubscribe();
                    this.scroll();
                } else if (routerEvent instanceof NavigationError || routerEvent instanceof NavigationCancel) {
                    subscription.unsubscribe();
                }
            });
            return false; // to preventDefault()
        }
    }
    this.scroll();
    return false; // to preventDefault()
  }

}
