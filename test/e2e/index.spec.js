'use strict';
describe('RAID E2E', function () {
    beforeEach(function () {
        browser.waitForAngularEnabled(false);
        browser.get('index.html');
        // browser.executeScript();
    });

    function arr2html(items) {
        var html = '';
        items.forEach(function (item) {
            html += '<div>' + item + '</div>';
        });
        return html;
    }

    describe('push', function () {
        it('push one element', function () {
            var result = browser.executeScript(function () {
                someRAID.push(make_el_obj(1));
                return some.innerHTML;
            });
            expect(result).toBe(arr2html([1]));
        });
        it('push 3 elements', function () {
            var result = browser.executeScript(function () {
                someRAID.push(make_el_obj(1));
                someRAID.push(make_el_obj(2));
                someRAID.push(make_el_obj(3));
                return some.innerHTML;
            });
            expect(result).toBe(arr2html([1, 2, 3]));
        });
    });

    describe('pop', function () {
        it('push [1,2,3] and pop one', function () {
            var result = browser.executeScript(function () {
                someRAID.push(make_el_obj(1));
                someRAID.push(make_el_obj(2));
                someRAID.push(make_el_obj(3));
                someRAID.pop();
                return some.innerHTML;
            });
            expect(result).toBe(arr2html([1, 2]));
        });
        it('push [1,2,3] and pop 2', function () {
            var result = browser.executeScript(function () {
                someRAID.push(make_el_obj(1));
                someRAID.push(make_el_obj(2));
                someRAID.push(make_el_obj(3));
                someRAID.pop();
                someRAID.pop();
                return some.innerHTML;
            });
            expect(result).toBe(arr2html([1]));
        });
    });
});