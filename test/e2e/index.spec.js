'use strict';
describe('RAID E2E', function () {
    beforeEach(function () {
        browser.waitForAngularEnabled(false);
        browser.get('index.html');
    });

    function arr2html(items) {
        var html = '';
        items.forEach(function (item) {
            html += '<div>' + item.text + '</div>';
        });
        return html;
    }

    describe('push', function () {
        it('push one element', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1));
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr));
            });
        });
        it('push 3 elements one by one', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1));
                someRAID.push(make_el_obj(2));
                someRAID.push(make_el_obj(3));
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr));
            });
        });
        it('push 3 elements in one', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr));
            });
        });
    });

    describe('pop', function () {
        it('push [1,2,3] and pop one', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.pop();
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr));
            });
        });

        it('push [1,2,3] and pop 2', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.pop();
                someRAID.pop();
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr));
            });
        });
    });

    describe('splice', function () {
        it('push [1,2,3] and splice(0, 1)', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.splice(0, 1);
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr));
            });
        });

        it('push [1,2,3] and splice(1, 1)', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.splice(1, 1);
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr));
            });
        });

        it('push [1,2,3] and splice(2, 1)', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.splice(1, 1);
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr));
            });
        });

        it('push [1,2,3] and splice(-1, 1)', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.splice(-1, 1);
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr));
            });
        });

        it('push [1,2,3] and splice(-2, 1)', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.splice(-2, 1);
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr));
            });
        });

        it('push [1,2,3] and add new via splice(0, 0, 4)', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.splice(0, 0, make_el_obj(4));
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr));
            });
        });

        it('push [1,2,3] and add new via splice(0, 0, 4, 5, 6)', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.splice(0, 0, make_el_obj(4), make_el_obj(5), make_el_obj(6));
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr));
            });
        });

        it('add new elements via splice(0, 0, 1, 2, 3)', function () {
            browser.executeScript(function () {
                someRAID.splice(0, 0, make_el_obj(1), make_el_obj(2), make_el_obj(3));
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr));
            });
        });

        it('push [1,2,3] and add new via splice(0, 0, 4, 5, 6)', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.splice(99999, 0, make_el_obj(4), make_el_obj(6), make_el_obj(6));
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr));
            });
        });
    });
});