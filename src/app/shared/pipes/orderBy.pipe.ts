import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform(array: any[], field: string, reverse: boolean = false): any[] {
        if (!Array.isArray(array)) {
            return
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        array.sort((a: any, b: any) => {
            if (a[field] < b[field]) {
                return reverse ? 1 : -1
            } else if (a[field] > b[field]) {
                return reverse ? -1 : 1
            } else {
                return 0
            }
        })
        return array
    }
}
