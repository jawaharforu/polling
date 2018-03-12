import {
    Component,
    HostBinding,
    ChangeDetectionStrategy,
    OnDestroy,
    Input,
    ElementRef,
    NgZone,
    Renderer, Directive
} from '@angular/core';

// TODO(josephperrott): Benchpress tests.

/** A single degree in radians. */
const DEGREE_IN_RADIANS = Math.PI / 180;
/** Duration of the indeterminate animation. */
const DURATION_INDETERMINATE = 667;
/** Duration of the indeterminate animation. */
const DURATION_DETERMINATE = 225;
/** Start animation value of the indeterminate animation */
const startIndeterminate = 3;
/** End animation value of the indeterminate animation */
const endIndeterminate = 80;
/* Maximum angle for the arc. The angle can't be exactly 360, because the arc becomes hidden. */
const MAX_ANGLE = 359.99 / 100;

export type ProgressSpinnerMode = 'determinate' | 'indeterminate';

type EasingFn = (currentTime: number, startValue: number,
                 changeInValue: number, duration: number) => number;

/**
* Directive whose purpose is to add the mat- CSS styling to this selector.
* @docs-private
*/
@Directive({
    selector: '[mdbSpinners], mat-progress-spinner'
})
export class MdProgressSpinnerCssMatStylerDirective {
    @HostBinding('class.mat-progress-spinner') true: any;
}


/**
* <md-progress-spinner> component.
*/
@Component({
    selector: 'mdb-Spinners, mat-progress-spinner',
    templateUrl: 'progress-spinner.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MdProgressSpinnerComponent implements OnDestroy {
    /** The id of the last requested animation. */
    private _lastAnimationId = 0;

    /** The id of the indeterminate interval. */
    private _interdeterminateInterval: any;

    /** The SVG <path> node that is used to draw the circle. */
    private _path: SVGPathElement;

    private _mode: ProgressSpinnerMode = 'determinate';
    private _value: number;
    private _color = 'primary';

    /**
    * Values for aria max and min are only defined as numbers when in a determinate mode.  We do this
    * because voiceover does not report the progress indicator as indeterminate if the aria min
    * and/or max value are number values.
    */
    get _ariaValueMin() {
        return this.mode === 'determinate' ? 0 : null;
    }

    get _ariaValueMax() {
        return this.mode === 'determinate' ? 100 : null;
    }

    /** @docs-private */
    get interdeterminateInterval() {
        return this._interdeterminateInterval;
    }
    /** @docs-private */
    set interdeterminateInterval(interval) {
        clearInterval(this._interdeterminateInterval);
        this._interdeterminateInterval = interval;
    }

    /**
    * Clean up any animations that were running.
    */
    ngOnDestroy() {
        this._cleanupIndeterminateAnimation();
    }

    /** The color of the progress-spinner. Can be primary, accent, or warn. */
    @Input()
        get color(): string { return this._color; }
        set color(value: string) {
        this._updateColor(value);
    }

    /** Value of the progress circle. It is bound to the host as the attribute aria-valuenow. */
    @Input()
    @HostBinding('attr.aria-valuenow')
    get value(): any {
        if (this.mode === 'determinate') {
            return this._value;
        }
        return;
    }
    set value(v: number | any) {
        if (v != null && this.mode === 'determinate') {
            const newValue = clamp(v);
            this._animateCircle(this.value || 0, newValue);
            this._value = newValue;
        }
    }

    /**
    * Mode of the progress circle
    *
    * Input must be one of the values from ProgressMode, defaults to 'determinate'.
    * mode is bound to the host as the attribute host.
    */
    @HostBinding('attr.mode')
    @Input()
    get mode() {
        return this._mode;
    }
    set mode(mode: ProgressSpinnerMode) {
        if (mode !== this._mode) {
            if (mode === 'indeterminate') {
                this._startIndeterminateAnimation();
            } else {
                this._cleanupIndeterminateAnimation();
                this._animateCircle(0, this._value);
            }
        this._mode = mode;
        }
    }

    constructor(
        private _ngZone: NgZone,
        private _elementRef: ElementRef,
        private _renderer: Renderer
    ) {}


    /**
    * Animates the circle from one percentage value to another.
    *
    * @param animateFrom The percentage of the circle filled starting the animation.
    * @param animateTo The percentage of the circle filled ending the animation.
    * @param ease The easing function to manage the pace of change in the animation.
    * @param duration The length of time to show the animation, in milliseconds.
    * @param rotation The starting angle of the circle fill, with 0° represented at the top center
    *    of the circle.
    */
    private _animateCircle(animateFrom: number, animateTo: number, ease: EasingFn = linearEase,
                            duration = DURATION_DETERMINATE, rotation = 0): void {

        const id = ++this._lastAnimationId;
        const startTime = Date.now();
        const changeInValue = animateTo - animateFrom;

        // No need to animate it if the values are the same
        if (animateTo === animateFrom) {
            this._renderArc(animateTo, rotation);
        } else {
            const animation = () => {
            const elapsedTime = Math.max(0, Math.min(Date.now() - startTime, duration));

            this._renderArc(
                ease(elapsedTime, animateFrom, changeInValue, duration),
                rotation
            );

            // Prevent overlapping animations by checking if a new animation has been called for and
            // if the animation has lasted longer than the animation duration.
            if (id === this._lastAnimationId && elapsedTime < duration) {
                requestAnimationFrame(animation);
            }
        };

        // Run the animation outside of Angular's zone, in order to avoid
        // hitting ZoneJS and change detection on each frame.
        this._ngZone.runOutsideAngular(animation);
        }
    }


    /**
    * Starts the indeterminate animation interval, if it is not already running.
    */
    private _startIndeterminateAnimation(): void {
        let rotationStartPoint = 0;
        let start = startIndeterminate;
        let end = endIndeterminate;
        const duration = DURATION_INDETERMINATE;
        const animate = () => {
            this._animateCircle(start, end, materialEase, duration, rotationStartPoint);
            // Prevent rotation from reaching Number.MAX_SAFE_INTEGER.
            rotationStartPoint = (rotationStartPoint + end) % 100;
            const temp = start;
            start = -end;
            end = -temp;
        };

        if (!this.interdeterminateInterval) {
            this._ngZone.runOutsideAngular(() => {
                this.interdeterminateInterval = setInterval(animate, duration + 50, 0, false);
                animate();
            });
        }
    }


    /**
    * Removes interval, ending the animation.
    */
    private _cleanupIndeterminateAnimation(): void {
        this.interdeterminateInterval = null;
    }

    /**
    * Renders the arc onto the SVG element. Proxies `getArc` while setting the proper
    * DOM attribute on the `<path>`.
    */
    private _renderArc(currentValue: number, rotation = 0): void {
        // Caches the path reference so it doesn't have to be looked up every time.
        const path = this._path = this._path || this._elementRef.nativeElement.querySelector('path');

        // Ensure that the path was found. This may not be the case if the
        // animation function fires too early.
        if (path) {
            path.setAttribute('d', getSvgArc(currentValue, rotation));
        }
    }

    /**
    * Updates the color of the progress-spinner by adding the new palette class to the element
    * and removing the old one.
    */
    private _updateColor(newColor: string): void {
        this._setElementColor(this._color, false);
        this._setElementColor(newColor, true);
        this._color = newColor;
    }

  /** Sets the given palette class on the component element. */
    private _setElementColor(color: string, isAdd: boolean) {
        if (color != null && color !== '') {
            this._renderer.setElementClass(this._elementRef.nativeElement, `mat-${color}`, isAdd);
        }
    }
}


/**
 * <md-spinner> component.
 *
 * This is a component definition to be used as a convenience reference to create an
 * indeterminate <md-progress-spinner> instance.
 */
@Component({
    selector: 'mdb-spinners, mat-spinner, mdb-progress-spinner',
    templateUrl: 'progress-spinner.component.html',
    styleUrls: ['progress-spinner.component.scss'],
})
export class MdSpinnerComponent extends MdProgressSpinnerComponent implements OnDestroy {

    @HostBinding('class.mat-spinner') true: any;

    constructor(elementRef: ElementRef, ngZone: NgZone, renderer: Renderer) {
        super(ngZone, elementRef, renderer);
        this.mode = 'indeterminate';
    }

    ngOnDestroy() {
        // The `ngOnDestroy` from `MdProgressSpinner` should be called explicitly, because
        // in certain cases Angular won't call it (e.g. when using AoT and in unit tests).
        super.ngOnDestroy();
    }
}


/**
* Module functions.
*/

/** Clamps a value to be between 0 and 100. */
function clamp(v: number) {
    return Math.max(0, Math.min(100, v));
}


/**
* Converts Polar coordinates to Cartesian.
*/
function polarToCartesian(radius: number, pathRadius: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees - 90) * DEGREE_IN_RADIANS;

    return (radius + (pathRadius * Math.cos(angleInRadians))) +
    ',' + (radius + (pathRadius * Math.sin(angleInRadians)));
}


/**
* Easing function for linear animation.
*/
function linearEase(currentTime: number, startValue: number,
                    changeInValue: number, duration: number) {
    return changeInValue * currentTime / duration + startValue;
}


/**
 * Easing function to match material design indeterminate animation.
 */
function materialEase(currentTime: number, startValue: number,
                        changeInValue: number, duration: number) {
    const time = currentTime / duration;
    const timeCubed = Math.pow(time, 3);
    const timeQuad = Math.pow(time, 4);
    const timeQuint = Math.pow(time, 5);
    return startValue + changeInValue * ((6 * timeQuint) + (-15 * timeQuad) + (10 * timeCubed));
}


/**
* Determines the path value to define the arc.  Converting percentage values to to polar
* coordinates on the circle, and then to cartesian coordinates in the viewport.
*
* @param currentValue The current percentage value of the progress circle, the percentage of the
*    circle to fill.
* @param rotation The starting point of the circle with 0 being the 0 degree point.
* @return A string for an SVG path representing a circle filled from the starting point to the
*    percentage value provided.
*/
function getSvgArc(currentValue: number, rotation: number) {
    const startPoint = rotation || 0;
    const radius = 50;
    const pathRadius = 40;

    const startAngle = startPoint * MAX_ANGLE;
    const endAngle = currentValue * MAX_ANGLE;
    const start = polarToCartesian(radius, pathRadius, startAngle);
    const end = polarToCartesian(radius, pathRadius, endAngle + startAngle);
    const arcSweep = endAngle < 0 ? 0 : 1;
    let largeArcFlag: number;

    if (endAngle < 0) {
            largeArcFlag = endAngle >= -180 ? 0 : 1;
    } else {
            largeArcFlag = endAngle <= 180 ? 0 : 1;
    }

    return `M${start}A${pathRadius},${pathRadius} 0 ${largeArcFlag},${arcSweep} ${end}`;
}
