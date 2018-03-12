import { trigger, state, style, transition, animate } from '@angular/core';

// SideNav
export const slideIn: any =  trigger('slideIn', [
  state('inactive', style({opacity: 0, transform: 'translateX(-300%)'})),
  state('active',   style({opacity: 1, transform: 'translateX(0)'})),
  transition('inactive => active', animate('500ms ease')),
  transition('active => inactive', animate('500ms ease')),
]);

export const fadeIn: any =  trigger('fadeIn', [
  state('inactive', style({opacity: 0})),
  state('active',   style({opacity: 1})),
  transition('inactive => active', animate('500ms ease')),
  transition('active => inactive', animate('500ms ease')),
]);

export const slideOut: any =  trigger('slideOut', [
  state('inactive', style({opacity: 0, transform: 'translateX(-300%)'})),
  state('active',   style({opacity: 1, transform: 'translateX(0)'})),
  transition('inactive => active', animate('500ms ease')),
  transition('active => inactive', animate('500ms ease')),
]);

export const flipState: any = trigger('flipState', [
  state('active', style({transform: 'rotateY(179.9deg)'})),
  state('inactive', style({transform: 'rotateY(0)'})),
]);

// Rotating animation animation
export const turnState: any =  trigger('turnState', [
  state('active', style({transform: 'rotateY(179.9deg)'})),
  state('inactive', style({transform: 'rotateY(0)'})),
]);

// Social reveal animation
export const iconsState: any =  trigger('iconsState', [
  state('isactive', style({visibility: 'visible', transform: 'translate(-6%)'})),
  state('isnotactive', style({visibility: 'hidden', transform: 'translate(27%)' })),
  transition('isactive => isnotactive', animate('100ms ease-in')),
  transition('isnotactive => isactive', animate('200ms ease-out')),
]);

// Reveal animation animation
export const socialsState: any =  trigger('socialsState', [
  state('active', style({visibility: 'visible', transform: 'translateY(-100%)'})),
  state('inactive', style({visibility: 'hidden', transform: 'translateY(0)'})),
  transition('* => void', animate('200ms ease-in')),
  transition('void => *', animate('200ms ease-out')),
]);

// image popup
export const zoomState: any = trigger('zoomState', [
  state('active', style({transform: 'scale(1, 1)', cursor: 'zoom-out'})),
  state('inactive', style({transform: 'scale(0.9, 0.9)', cursor: 'zoom-in'})),
  transition('active => inactive', animate('300ms ease-in')),
  transition('inactive => active', animate('300ms ease-out')),
]);

export const restartState: any = trigger('restartState', [
  state('inactive', style({transform: 'scale(0.9, 0.9)'})),
]);

// alerts
export const flyInOut: any = trigger('flyInOut', [
  state('inactive', style({display: 'none', opacity: 0.7})),
  state('active', style({ opacity: 0.7 })),
  state('removed', style({ opacity: 0 })),
  transition('inactive => active', animate('300ms ease-in')),
  transition('active => removed', animate('300ms ease-in')),
]);
