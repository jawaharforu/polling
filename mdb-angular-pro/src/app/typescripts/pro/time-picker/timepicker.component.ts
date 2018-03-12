import { Component, ViewChild, Input, ElementRef, Renderer2, OnInit, AfterViewInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


export const TIME_PIRCKER_VALUE_ACCESSOT: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ClockPickerComponent),
    multi: true
};

@Component({
    selector: 'mdb-time-picker',
    templateUrl: './timepicker.component.html',
    providers: [TIME_PIRCKER_VALUE_ACCESSOT]
})

export class ClockPickerComponent implements OnInit, AfterViewInit, ControlValueAccessor {
    @ViewChild('hoursPlate') public hoursPlate: ElementRef;
    @ViewChild('minutesPlate') public minutesPlate: ElementRef;

    @ViewChild('plate') public plate: ElementRef;
    @ViewChild('svg') public svg: ElementRef;
    @ViewChild('g') public g: ElementRef;
    @ViewChild('hand') public hand: ElementRef;
    @ViewChild('fg') public fg: ElementRef;
    @ViewChild('bg') public bg: ElementRef;
    @ViewChild('bearing') public bearing: ElementRef;

    @Input('twelvehour') public twelvehour = false;
    @Input('darktheme') public darktheme = false;
    @Input('placeholder') public placeholder: String = '';
    @Input('label') public label = '';
    @Input('duration') public duration = 300;
    @Input('showClock') public showClock = false;
    @Input('buttonlabel') public buttonLabel: string;

    touchDevice = ('ontouchstart' in document.documentElement);
    showHours = false;

    dialRadius = 135;
    outerRadius = 110;
    innerRadius = 80;
    tickRadius = 20;
    diameter = this.dialRadius * 2;

    hoursTicks: any = [];
    minutesTicks: any = [];
    selectedHours: any = { 'h': '12', 'm': '00', 'ampm': 'AM' };
    endHours = '';


    touchSupported: any = 'ontouchstart' in window;
    mousedownEvent: any = 'mousedown' + (this.touchSupported ? ' touchstart' : '');
    mousemoveEvent: any = 'mousemove' + (this.touchSupported ? ' touchmove' : '');
    mouseupEvent: any = 'mouseup' + (this.touchSupported ? ' touchend' : '');

    constructor(public elem: ElementRef, public renderer: Renderer2) {
        renderer.listen(this.elem.nativeElement, 'click', (event: any) => {

            if (this.showClock &&
                event.target &&
                this.elem.nativeElement !== event.target &&
                !this.elem.nativeElement.contains(event.target)
            ) {
                this.showClock = false;
            }
            if (event.target.classList.contains('picker__holder')) {
                this.showClock = false;
            }
        });
    }

    ngOnInit() {
        this.generateTick();

    }

    ngAfterViewInit() {
        this.renderer.listen(this.elem.nativeElement.querySelector('.clockpicker-plate'), 'mousedown', (event: any) => {
            this.mousedown(event, false);
        });



    }
    checkDraw() {
        let value;
        const isHours = this.showHours;
        if (isHours) {
            value = parseInt(this.selectedHours.h, 0);
        } else {
            value = parseInt(this.selectedHours.m, 0);
        }


        const unit = Math.PI / (isHours ? 6 : 30),
            radian = value * unit,
            radius = isHours && value > 0 && value < 13 ? this.innerRadius : this.outerRadius,
            xd = Math.sin(radian) * radius,
            yd = - Math.cos(radian) * radius;
        this.setHand(xd, yd, false);

    }

    mousedown(e: any, space: any) {
        const offset = this.plate.nativeElement.getBoundingClientRect(),
            isTouch = /^touch/.test(e.type),
            x0 = offset.left + this.dialRadius,
            y0 = offset.top + this.dialRadius,
            dx = (isTouch ? e.originalEvent.touches[0] : e).clientX - x0,
            dy = (isTouch ? e.originalEvent.touches[0] : e).clientY - y0,
            z = Math.sqrt(dx * dx + dy * dy);
        let moved = false;

        if (space && (z < this.outerRadius - this.tickRadius || z > this.outerRadius + this.tickRadius)) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();


        if (this.showHours) {
            this.setHand(dx, dy, true);
        } else {
            this.setHand(dx, dy, false);
        }

        const mousemoveEventMethod = (event: any) => {

            event.preventDefault();
            event.stopPropagation();
            const x = event.clientX - x0,
                y = event.clientY - y0;
            if (!moved && x === dx && y === dy) {
                return;
            }
            moved = true;

            this.setHand(x, y, false);
        };

        const mouseupEventMethod = (event: any) => {
            document.removeEventListener(this.mousemoveEvent, mousemoveEventMethod);
            e.preventDefault();
            const x = event.clientX - x0,
                y = event.clientX - y0;
            if ((space || moved) && x === dx && y === dy) {
                this.setHand(x, y, false);
            }
            this.showMinutesClock();
            document.removeEventListener(this.mouseupEvent, mouseupEventMethod);
        };
        document.addEventListener(this.mousemoveEvent, mousemoveEventMethod);
        document.addEventListener('mouseup', mouseupEventMethod);
    }
    hideKeyboard() {
        // this set timeout needed for case when hideKeyborad
        // is called inside of 'onfocus' event handler
        setTimeout(function () {

            // creating temp field
            const field = document.createElement('input');
            field.setAttribute('type', 'text');
            // hiding temp field from peoples eyes
            // -webkit-user-modify is nessesary for Android 4.x
             /*tslint:disable:max-line-length*/
            field.setAttribute('style', 'position:absolute; top: 0px; opacity: 0; -webkit-user-modify: read-write-plaintext-only; left:0px;');
            document.body.appendChild(field);

            // adding onfocus event handler for out temp field
            field.onfocus = function () {
                // this timeout of 200ms is nessasary for Android 2.3.x
                setTimeout(function () {

                    field.setAttribute('style', 'display:none;');
                    setTimeout(function () {
                        document.body.removeChild(field);
                        document.body.focus();
                    }, 14);

                }, 20);
            };
            // focusing it
            field.focus();

        }, 50);
    }

    openBtnClicked(): void {
        this.showClock = true;
        this.showHours = true;
        this.checkDraw();
        this.hideKeyboard();
    }

    closeBtnClicked() {
        const h = this.selectedHours.h;
        const m = this.selectedHours.m;
        const ampm = this.selectedHours.ampm;

        if (this.twelvehour) {
            this.endHours = h + ':' + m + ampm;
        } else {
            this.endHours = h + ':' + m;
        }
        this.onChangeCb(this.endHours);
        this.onTouchedCb();
        this.showClock = false;
    }

    setHour(hour: String) {
        this.selectedHours.h = hour;
    }

    setMinute(min: String) {
        // event.stopPropagation();
        this.selectedHours.m = min;
    }

    setAmPm(ampm: String) {
        // event.stopPropagation();
        this.selectedHours.ampm = ampm;
    }

    showHoursClock() {
        this.showHours = true;
        this.checkDraw();
    }

    showMinutesClock() {
        this.showHours = false;
        this.checkDraw();
    }


    generateTick() {
        if (this.twelvehour) {
            for (let i = 1; i < 13; i++) {
                const radian = i / 6 * Math.PI;
                const radius = this.outerRadius;

                const tick = {
                    'hour': i,
                    'left': this.dialRadius + Math.sin(radian) * radius - this.tickRadius,
                    'top': this.dialRadius - Math.cos(radian) * radius - this.tickRadius,
                };
                this.hoursTicks.push(tick);
            }
        } else {
            for (let i = 0; i < 24; i++) {
                const radian = i / 6 * Math.PI;
                const inner = i > 0 && i < 13;
                const radius = inner ? this.innerRadius : this.outerRadius;
                let h;

                if (i === 0) {
                    h = '0' + i.toString();
                } else {
                    h = i;
                }

                const tick = {
                    'hour': h,
                    'left': this.dialRadius + Math.sin(radian) * radius - this.tickRadius,
                    'top': this.dialRadius - Math.cos(radian) * radius - this.tickRadius,
                };
                this.hoursTicks.push(tick);
            }
        }

        for (let i = 0; i < 60; i += 5) {
            const radian = i / 30 * Math.PI;
            let min = i.toString();
            if (i < 10) {
                min = '0' + i.toString();
            }
            const tick = {
                'min': min,
                'left': this.dialRadius + Math.sin(radian) * this.outerRadius - this.tickRadius,
                'top': this.dialRadius - Math.cos(radian) * this.outerRadius - this.tickRadius,
            };
            this.minutesTicks.push(tick);
        }

    }

    setHand(x: any, y: any, roundBy5: any) {
        let radian = Math.atan2(x, - y);
        const isHours = this.showHours;
        const unit = Math.PI / (isHours || roundBy5 ? 6 : 30);
        const z = Math.sqrt(x * x + y * y);
        const inner = isHours && z < (this.outerRadius + this.innerRadius) / 2;
        let radius = inner ? this.innerRadius : this.outerRadius;
        let value;


        if (this.showHours) {
            value = parseInt(this.selectedHours.h, 0);
        } else {
            value = parseInt(this.selectedHours.m, 0);
        }

        if (this.twelvehour) {
            radius = this.outerRadius;
        }

        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }

        value = Math.round(radian / unit);
        radian = value * unit;

        if (this.twelvehour) {
            if (isHours) {
                if (value === 0) {
                    value = 12;
                }
            } else {
                if (roundBy5) {
                    value *= 5;
                }
                if (value === 60) {
                    value = 0;
                }
            }
        } else {
            if (isHours) {
                value = !inner ? value + 12 : value;
                value = value === 24 ? 0 : value;
                value = (inner && value === 0) ? 12 : value;
                value = (!inner && value === 12) ? 0 : value;
            } else {
                if (roundBy5) {
                    value *= 5;
                }
                if (value === 60) {
                    value = 0;
                }
            }
        }

        if (isHours) {
            this.fg.nativeElement.setAttribute('class', 'clockpicker-canvas-fg');
        } else {
            if (value % 5 === 0) {
                this.fg.nativeElement.setAttribute('class', 'clockpicker-canvas-fg');
            } else {
                this.fg.nativeElement.setAttribute('class', 'clockpicker-canvas-fg active');
            }
        }

        const cx1 = Math.sin(radian) * (radius - this.tickRadius),
            cy1 = - Math.cos(radian) * (radius - this.tickRadius),
            cx2 = Math.sin(radian) * radius,
            cy2 = - Math.cos(radian) * radius;

        this.hand.nativeElement.setAttribute('x2', cx1);
        this.hand.nativeElement.setAttribute('y2', cy1);
        this.bg.nativeElement.setAttribute('cx', cx2);
        this.bg.nativeElement.setAttribute('cy', cy2);
        this.fg.nativeElement.setAttribute('cx', cx2);
        this.fg.nativeElement.setAttribute('cy', cy2);

        if (this.showHours) {
            if (value < 10) {
                this.setHour('0' + value.toString());
            } else {
                this.setHour(value.toString());
            }
        } else {
            if (value < 10) {
                this.setMinute('0' + value.toString());
            } else {
                this.setMinute(value.toString());
            }
        }
    }

    offset(obj: any) {
        let left = 0,
            top = 0;

        if (obj.offsetParent) {
            do {
                left += obj.offsetLeft;
                top += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }
        return { left, top };
    }



    onChangeCb: (_: any) => void = () => { };
    onTouchedCb: () => void = () => { };

    writeValue(value: any): void {
        this.endHours = value;
    }

    registerOnChange(fn: any): void {
        this.onChangeCb = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCb = fn;
    }
}
