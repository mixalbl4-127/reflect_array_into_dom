# Reflect array into DOM lib (RAID)
RAID will helps to reflect array changes into DOM.

You just make `new Raid(...html_container...)` and use like simple array, library will update the DOM itself. 

## How to install?
    npm install js-raid --save

## How to compile?
    npm run compile

## How to use?
- Connect lib to page: `<script src="./node_modules/js-raid/index.js"></script>`
- Use lib :) Example #1:

        <div id="some"></div>
        <script>
            var some = document.getElementById('some'); // Gets container object
            var someRAID = new Raid(some); // Makes new Raid on this container
            
            // function for makes object like: {text: 1, el: ...}
            function make_el_obj(text) {
                var div = document.createElement('div');
                div.innerHTML = text;
                return {text: text, el: div};
            }

            someRAID.push(make_el_obj('1')); // Makes and push div with 1
            someRAID.push(make_el_obj('2')); // Makes and push div with 2
            someRAID.push(make_el_obj('3')); // Makes and push div with 3

            // Pops array after 1s
            setTimeout(function(){
                someRAID.pop(); // Pops array
            }, 1000);
        </script>

**All array objects must contain `el` key with HTMLElement!**

## Example #2 (simple)

        <div id="some"></div>
        <script>
            var some = document.getElementById('some'); // Gets container object
            var someRAID = new Raid(some); // Makes new Raid on this container

            var div1 = document.createElement('div'); // Makes div with 1
            div1.innerHTML = 'First!'; // Adds some text

            var div2 = document.createElement('div'); // Makes div with 2
            div2.innerHTML = 'Second!'; // Adds some text

            someRAID.push({el: div1}); // Makes and push div with 'First!'
            someRAID.push({el: div2}); // Makes and push div with 'Second!'

            // Pops array after 1s
            setTimeout(function(){
                someRAID.pop(); // Pops array
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
- RAIDClass.sort(fn);
- RAIDClass.shift();
- RAIDClass.unshift([...]);
- RAIDClass.reverse();

## Supported props:
- RAIDClass.length - array length
- RAIDClass.arr - original array **(don't do any changes (like split, sort etc) in original array!)**

**All methods and props works like in [JS Array methods](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array)!**