interface RaidObject {
    el: HTMLElement;
}

class Raid {
    arr: RaidObject[];
    parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.arr = [];
        this.parent = parent;
    }

    /**
     * Appends new elements to an array, and returns the new length of the array.
     * @param items New elements of the Array.
     */
    push(...items: RaidObject[]): number {
        items.forEach((item: RaidObject) => this.parent.appendChild(item.el));
        return this.arr.push(...items);
    }

    /**
     * Removes the last element from an array and returns it.
     */
    pop(): any | undefined {
        let last: any | undefined = this.arr.pop();
        last && this.parent.removeChild(last.el);
        return last;
    }

    /**
     * Removes the first element from an array and returns it.
     */
    shift(): any | undefined {
        let first: any | undefined = this.arr.shift();
        first && this.parent.removeChild(first.el);
        return first;
    }

    /**
     * Inserts new elements at the start of an array.
     */
    unshift(...items: RaidObject[]): number {
        if (this.arr.length) {
            items.forEach((item: RaidObject) => this.parent.insertBefore(item.el, this.arr[0].el));
        } else {
            items.forEach((item: RaidObject) => this.parent.appendChild(item.el));
        }
        return this.arr.unshift(...items);
    }

    /**
     * reverse elements in array and returns array.
     */
    reverse(): any | undefined {
        let reverse_arr: any | undefined = this.arr.reverse();
        reverse_arr.forEach((item: RaidObject) => this.parent.appendChild(item.el));
        return reverse_arr;
    }

    /**
     * Sorts an array.
     */
    sort(compareFn?: (a: RaidObject, b: RaidObject) => number): RaidObject[] {
        this.arr.sort.apply(this.arr, arguments);
        this.arr.forEach((item: RaidObject) => this.parent.appendChild(item.el));
        return this.arr;
    }

    /**
     * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
     * @param start The zero-based location in the array from which to start removing elements.
     * @param deleteCount The number of elements to remove.
     */
    splice(start: number, deleteCount?: number): RaidObject[];
    /**
     * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
     * @param start The zero-based location in the array from which to start removing elements.
     * @param deleteCount The number of elements to remove.
     * @param items Elements to insert into the array in place of the deleted elements.
     */
    splice(start: number, deleteCount: number, ...items: RaidObject[]): RaidObject[] {
        let will_be_deleted: RaidObject[] = this.arr.slice(start, (start < 0 && start + deleteCount >= 0) ? undefined : start + deleteCount);

        if (will_be_deleted.length) { /** @example splice(0, 1) */
            if (items.length) { /** @example splice(0, 1, {el: ...}) */
                for (let i = items.length - 1; i >= 0; i--) // reverse array
                    this.insertAfter(items[i].el, will_be_deleted[0].el);
            }
            will_be_deleted.forEach((item: RaidObject) => this.parent.removeChild(item.el));
        } else if(items.length) { /** @example splice(2, 0, {el: ...}) */
            let before_it = this.arr.slice(start);
            if (before_it && before_it.length) {
                items.forEach((item: RaidObject) => this.parent.insertBefore(item.el, before_it[0].el));
            } else { /** @example splice(9999999999, 0, {el: ...}) */
                items.forEach((item: RaidObject) => this.parent.appendChild(item.el));
            }
        } else {
            throw new Error('Some went wrong!');
        }
        return this.arr.splice.apply(this.arr, arguments);
    }

    /**
     * insertAfter for DOM
     * @return {Node}
     */
    insertAfter(elem: HTMLElement, refElem: HTMLElement): Node {
        return this.parent.insertBefore(elem, refElem.nextSibling);
    }

    set length(someArg) {
        console.warn('You cant modify length!');
    }

    get length() {
        return this.arr.length
    }
}