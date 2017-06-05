# Reflect array into DOM lib (RAID)
RAID will helps to reflect array changes into DOM.

You just make `new RAID(...)` and use like simple array, library will update the DOM itself. 

## How to install?
    npm install reflectArrayIntoDOM --save

## How to compile?
    npm run compile

## How to use?
- Connect lib to page: `<script src="./node_modules/reflectArrayIntoDOM/index.js"></script>`
- Use lib :)


    <div id="some"></div>
    <script>
        var some = document.getElementById('some');
        var someRAID = new Raid(some);

        function make_el_obj(text) {
            var div = document.createElement('div');
            div.innerHTML = text;
            return {text: text, el: div};
        }
        someRAID.push(make_el_obj('1'));
        someRAID.push(make_el_obj('2'));
        someRAID.push(make_el_obj('3'));
        setTimeout(function(){
            someRAID.pop();
        }, 1000);
    </script>

## How to test?
1. Clone this repo
2. `npm install`
3. Update WebDriver: `npm run preprotractor`
4. Run tests: `npm run protractor`

## Supported methods:
- RAIDClass.push({el: HTMLElement} [, ...]);
- RAIDClass.pop();
- RAIDClass.splice([...]);

## Supported props:
- RAIDClass.length

**All methods and props works like in [JS Array methods](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array)!**