var Raid = (function () {
    function Raid(parent) {
        this.arr = [];
        this.parent = parent;
    }
    /**
     * Appends new elements to an array, and returns the new length of the array.
     * @param items New elements of the Array.
     */
    Raid.prototype.push = function () {
        var _this = this;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        items.forEach(function (item) { return _this.parent.appendChild(item.el); });
        return (_a = this.arr).push.apply(_a, items);
        var _a;
    };
    /**
     * Removes the last element from an array and returns it.
     */
    Raid.prototype.pop = function () {
        var last = this.arr.pop();
        last && this.parent.removeChild(last.el);
        return last;
    };
    /**
     * Removes the first element from an array and returns it.
     */
    Raid.prototype.shift = function () {
        var first = this.arr.shift();
        first && this.parent.removeChild(first.el);
        return first;
    };
    /**
     * Inserts new elements at the start of an array.
     */
    Raid.prototype.unshift = function () {
        var _this = this;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        if (this.arr.length) {
            items.forEach(function (item) { return _this.parent.insertBefore(item.el, _this.arr[0].el); });
        }
        else {
            items.forEach(function (item) { return _this.parent.appendChild(item.el); });
        }
        return (_a = this.arr).unshift.apply(_a, items);
        var _a;
    };
    /**
     * reverse elements in array and returns array.
     */
    Raid.prototype.reverse = function () {
        var _this = this;
        var reverse_arr = this.arr.reverse();
        reverse_arr.forEach(function (item) { return _this.parent.appendChild(item.el); });
        return reverse_arr;
    };
    /**
     * Sorts an array.
     */
    Raid.prototype.sort = function (compareFn) {
        var _this = this;
        this.arr.sort.apply(this.arr, arguments);
        this.arr.forEach(function (item) { return _this.parent.appendChild(item.el); });
        return this.arr;
    };
    /**
     * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
     * @param start The zero-based location in the array from which to start removing elements.
     * @param deleteCount The number of elements to remove.
     * @param items Elements to insert into the array in place of the deleted elements.
     */
    Raid.prototype.splice = function (start, deleteCount) {
        var _this = this;
        var items = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            items[_i - 2] = arguments[_i];
        }
        var will_be_deleted = this.arr.slice(start, (start < 0 && start + deleteCount >= 0) ? undefined : start + deleteCount);
        if (will_be_deleted.length) {
            if (items.length) {
                for (var i = items.length - 1; i >= 0; i--)
                    this.insertAfter(items[i].el, will_be_deleted[0].el);
            }
            will_be_deleted.forEach(function (item) { return _this.parent.removeChild(item.el); });
        }
        else if (items.length) {
            var before_it_1 = this.arr.slice(start);
            if (before_it_1 && before_it_1.length) {
                items.forEach(function (item) { return _this.parent.insertBefore(item.el, before_it_1[0].el); });
            }
            else {
                items.forEach(function (item) { return _this.parent.appendChild(item.el); });
            }
        }
        else {
            throw new Error('Some went wrong!');
        }
        return this.arr.splice.apply(this.arr, arguments);
    };
    /**
     * insertAfter for DOM
     * @return {Node}
     */
    Raid.prototype.insertAfter = function (elem, refElem) {
        return this.parent.insertBefore(elem, refElem.nextSibling);
    };
    Object.defineProperty(Raid.prototype, "length", {
        get: function () {
            return this.arr.length;
        },
        set: function (someArg) {
            console.warn('You cant modify length!');
        },
        enumerable: true,
        configurable: true
    });
    return Raid;
}());
//# sourceMappingURL=index.js.map