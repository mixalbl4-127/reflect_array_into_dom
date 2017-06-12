'use strict';
describe('RAID E2E', function () {
    beforeEach(function () {
        browser.waitForAngularEnabled(false);
        browser.get('index.html');
    });

    function arr2html(items) {
        var html = '';
        items.forEach(function (item) {
            html += '<div>' + (typeof item === "object" ? item.text : item) + '</div>';
        });
        return html;
    }

    describe('push', function () {
        it('control test: push 3 elements one by one', function () {
            var result = browser.executeScript(function () {
                someRAID.push(make_el_obj(1));
                someRAID.push(make_el_obj(2));
                someRAID.push(make_el_obj(3));
                return some.innerHTML;
            });
            expect(result).toBe(arr2html([1,2,3]));
        });
        it('push one element', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1));
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr)); // check html
            });
        });
        it('push 3 elements one by one', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1));
                someRAID.push(make_el_obj(2));
                someRAID.push(make_el_obj(3));
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr)); // check html
            });
        });
        it('push 3 elements in one', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr)); // check html
            });
        });
    });

    describe('pop', function () {
        it('control test: push [1,2,3] and pop one', function () {
            var result = browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.pop();
                return some.innerHTML;
            });
            expect(result).toBe(arr2html([1, 2]));
        });
        it('push [1,2,3] and pop one', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.pop();
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr)); // check html
            });
        });

        it('push [1,2,3] and pop 2', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.pop();
                someRAID.pop();
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr)); // check html
            });
        });
    });

    describe('shift', function () {
        it('control test: push [1,2,3] and shift one', function () {
            var result = browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.shift();
                return some.innerHTML;
            });
            expect(result).toBe(arr2html([2, 3]));
        });

        it('push [1,2,3] and shift one', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.shift();
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr)); // check html
            });
        });
    });

    describe('reverse', function () {
        it('control test: push [1,2,3] and reverse', function () {
            var result = browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.reverse();
                return some.innerHTML;
            });
            expect(result).toBe(arr2html([3, 2, 1]));
        });

        it('push [1,2,3] and reverse', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.reverse();
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr)); // check html
            });
        });
    });

    describe('sort', function () {
        it('control test: push [1,2,3] and sort reverse', function () {
            var result = browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.sort(function (a, b) {
                    return b.text - a.text;
                });
                return some.innerHTML;
            });
            expect(result).toBe(arr2html([3, 2, 1]));
        });

        it('push [3,2,1] and sort (a - b)', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(3), make_el_obj(2), make_el_obj(1));
                someRAID.sort(function (a, b) {
                    return a.text - b.text;
                });
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr)); // check html
            });
        });

        it('push ["3","2","1"] and sort (a > b)', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj("3"), make_el_obj("2"), make_el_obj("1"));
                someRAID.sort(function (a, b) {
                    return +(a.text > b.text) || +(a.text === b.text) - 1;
                });
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr)); // check html
            });
        });

        it('push ["A", "B", "1", "C", "D", "2", "E", "X", "Y", "3", "Z"] and sort (a > b)', function () {
            browser.executeScript(function () {
                var arr = ["A", "B", "1", "C", "D", "2", "E", "X", "Y", "3", "Z"];
                arr.forEach(function (el) {
                    someRAID.push(make_el_obj(el));
                });
                someRAID.sort(function (a, b) {
                    return +(a.text > b.text) || +(a.text === b.text) - 1;
                });
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr)); // check html
            });
        });

        it('push ["Cam51", "Cam2", "Cam7", "Cam7", "Cam3", ...] and sort (a > b)', function () {
            browser.executeScript(function () {
                var arr = ["Cam2", "out", "Cam51", "Cam2", "Cam7", "Cam7", "Cam3", "Cam8", "out", "out", "out"];
                arr.forEach(function (el) {
                    someRAID.push(make_el_obj(el));
                });
                someRAID.sort(function (a, b) {
                    return +(a.text > b.text) || +(a.text === b.text) - 1;
                });
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr)); // check html
            });
        });
    });

    describe('splice', function () {
        it('control test: push [1,2,3] and splice(0, 1)', function () {
            var result = browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.splice(0, 1);
                return some.innerHTML;
            });
            expect(result).toBe(arr2html([2, 3]));
        });

        it('push [1,2,3] and splice(0, 1)', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.splice(0, 1);
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr)); // check html
            });
        });

        it('push [1,2,3] and splice(1, 1)', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.splice(1, 1);
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr)); // check html
            });
        });

        it('push [1,2,3] and splice(2, 1)', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.splice(1, 1);
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr)); // check html
            });
        });

        it('push [1,2,3] and splice(-1, 1)', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.splice(-1, 1);
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr)); // check html
            });
        });

        it('push [1,2,3] and splice(-2, 1)', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.splice(-2, 1);
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr)); // check html
            });
        });

        it('push [1,2,3] and add new via splice(0, 0, 4)', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.splice(0, 0, make_el_obj(4));
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr)); // check html
            });
        });

        it('push [1,2,3] and add new via splice(0, 0, 4, 5, 6)', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.splice(0, 0, make_el_obj(4), make_el_obj(5), make_el_obj(6));
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr)); // check html
            });
        });

        it('add new elements via splice(0, 0, 1, 2, 3)', function () {
            browser.executeScript(function () {
                someRAID.splice(0, 0, make_el_obj(1), make_el_obj(2), make_el_obj(3));
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr)); // check html
            });
        });

        it('push [1,2,3] and add new via splice(0, 0, 4, 5, 6)', function () {
            browser.executeScript(function () {
                someRAID.push(make_el_obj(1), make_el_obj(2), make_el_obj(3));
                someRAID.splice(99999, 0, make_el_obj(4), make_el_obj(6), make_el_obj(6));
                return {html: some.innerHTML, arr: someRAID.arr};
            }).then(function (result) {
                expect(result.html).toBe(arr2html(result.arr)); // check html
            });
        });
    });
});