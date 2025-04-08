import { AfterViewInit, Directive, ElementRef } from '@angular/core'
import { AccessibilityUtils } from 'src/app/shared/services/accessibility.utils'
import { DataService } from 'src/app/shared/services/data.service'

@Directive({
    standalone: true,
    selector: '[tdtAccessibleColor]',
})
export class AccessibleColorDirective implements AfterViewInit {
    constructor(
        private el: ElementRef,
        private dataService: DataService
    ) {
        el.nativeElement.style.customProperty = true
    }

    ngAfterViewInit() {
        const backgroundColor = this.getBackgroundColor()
        const initialTextColor = this.getTextColor()
        console.log(
            backgroundColor,
            initialTextColor,
            AccessibilityUtils.computeContrastRatio(backgroundColor, initialTextColor).toString()
        )
        if (this.isAccessibleColor(backgroundColor, initialTextColor)) {
            return
        }
        // console.log(backgroundColor, this.textColors.map((color) => ({ color, ratio: AccessibilityUtils.computeContrastRatio(backgroundColor, color) })))
        const textColor = this.textColors
            .map((color) => ({
                color,
                ratio: AccessibilityUtils.computeContrastRatio(backgroundColor, color),
            }))
            .reduce((acc, val) => (acc.ratio > val.ratio ? acc : val), {
                color: '#00aaff',
                ratio: 0,
            }).color
        // console.log(textColor, backgroundColor)
        this.el.nativeElement.style.color = textColor
    }

    get textColors(): string[] {
        return [
            this.dataService.config.value.primary_color,
            this.dataService.config.value.primary_color,
            '#000000',
            '#FFFFFF',
        ]
    }

    /**
     * Get the background color of the element
     * @private
     */
    private getBackgroundColor(): string {
        const computedStyle = window.getComputedStyle(this.el.nativeElement)
        return computedStyle.backgroundColor
    }

    /**
     * Get the text color of the element
     * @private
     */
    private getTextColor(): string {
        const computedStyle = window.getComputedStyle(this.el.nativeElement)
        return computedStyle.color
    }

    /**
     * Return is the color contrast is accessible
     * @param bgColor the background color
     * @param textColor the color to check
     * @private
     */
    private isAccessibleColor(bgColor: string, textColor: string): boolean {
        return AccessibilityUtils.computeContrastRatio(bgColor, textColor) >= 4.5 // WCAG AA
    }
}
