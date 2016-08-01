describe("Interpolation", function () {



    it("alone", function () {
        var MyComponent = san.Component({
            template: '<a>{{name}}</a>'
        });
        var myComponent = new MyComponent();
        myComponent.data.set('name', 'errorrik');

        var wrap = document.createElement('div');
        document.body.appendChild(wrap);
        myComponent.attach(wrap);

        expect(wrap.firstChild.textContent || wrap.firstChild.innerText).toBe('errorrik');

        myComponent.dispose();
        document.body.removeChild(wrap);
    });


    it("+static text", function () {
        var MyComponent = san.Component({
            template: '<a>Hello {{name}}!</a>'
        });
        var myComponent = new MyComponent();
        myComponent.data.set('name', 'errorrik');

        var wrap = document.createElement('div');
        document.body.appendChild(wrap);
        myComponent.attach(wrap);

        expect(wrap.firstChild.textContent || wrap.firstChild.innerText).toBe('Hello errorrik!');

        myComponent.dispose();
        document.body.removeChild(wrap);
    });


    it("global filter", function () {
        var MyComponent = san.Component({
            template: '<a>{{name|uppercase}}</a>',
            filters: {
                uppercase: function (source) {
                    if (source) {
                        return source.charAt(0).toUpperCase() + source.slice(1);
                    }

                    return source;
                }
            }
        });
        var myComponent = new MyComponent();
        myComponent.data.set('name', 'errorrik');

        var wrap = document.createElement('div');
        document.body.appendChild(wrap);
        myComponent.attach(wrap);

        expect(wrap.firstChild.textContent || wrap.firstChild.innerText).toBe('Errorrik');

        myComponent.dispose();
        document.body.removeChild(wrap);
    });


    it("component filter", function () {
        var MyComponent = san.Component({
            template: '<a>{{name|uppercase}}</a>',

            filters: {
                uppercase: function (source) {
                    if (source) {
                        return source.toUpperCase();
                    }

                    return source;
                }
            }
        });
        var myComponent = new MyComponent();
        myComponent.data.set('name', 'errorrik');

        var wrap = document.createElement('div');
        document.body.appendChild(wrap);
        myComponent.attach(wrap);

        expect(wrap.firstChild.textContent || wrap.firstChild.innerText).toBe('ERRORRIK');

        myComponent.dispose();
        document.body.removeChild(wrap);
    });


    it("set after attach", function (done) {
        var MyComponent = san.Component({
            template: '<a>Hello {{name}}!</a>'
        });
        var myComponent = new MyComponent();

        var wrap = document.createElement('div');
        document.body.appendChild(wrap);
        myComponent.attach(wrap);
        myComponent.data.set('name', 'errorrik');
        expect(wrap.firstChild.innerHTML.indexOf('Hello !')).toBe(0);

        san.nextTick(function() {
            expect(wrap.firstChild.textContent || wrap.firstChild.innerText).toBe('Hello errorrik!');
            myComponent.dispose();
            document.body.removeChild(wrap);
            done();
        });
    });

});
