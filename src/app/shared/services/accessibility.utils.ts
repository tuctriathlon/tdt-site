export class AccessibilityUtils {
    static computeContrastRatio(bgColor: string, textColor: string): number {
        const bgLuminance = AccessibilityUtils.getLuminance(bgColor);
        const textLuminance = AccessibilityUtils.getLuminance(textColor);
        return (Math.max(bgLuminance, textLuminance) + 0.05) / (Math.min(bgLuminance, textLuminance) + 0.05);
    }

    static getLuminance(color: string): number {
        let rgb: number[]
        if (color.startsWith('#')) {
            rgb = AccessibilityUtils.hexToRgb( color )
        } else if (color.startsWith('rgb')) {
            rgb= color.match(/\d+/g).map(Number)
        }
        const a = rgb.map(v => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    static hexToRgb(hex: string): number[] {
        const bigint = parseInt(hex.slice(1), 16);
        return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    }
}
