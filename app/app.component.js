System.register(['angular2/core', './reactive.component', 'rxjs/Rx', 'rxjs/add/operator/debounceTime', 'rxjs/add/operator/filter', 'rxjs/add/operator/distinctUntilChanged', 'rxjs/add/operator/map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, reactive_component_1, Rx_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (reactive_component_1_1) {
                reactive_component_1 = reactive_component_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (_4) {}],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    console.log(new Rx_1.Observable());
                    var keyup = Rx_1.Observable.fromEvent($("#search"), "keyup")
                        .map(function (e) { return e.target.value; })
                        .filter(function (text) { return text.length >= 3; })
                        .debounceTime(400)
                        .distinctUntilChanged()
                        .flatMap(function (searchTerm) {
                        var url = "https://api.spotify.com/v1/search?type=artist&q=" + searchTerm;
                        var promise = $.getJSON(url);
                        return Rx_1.Observable.fromPromise(promise);
                    });
                    // Implemented using anonymous function.
                    // keyup.subscribe(function(data) {
                    //     console.log(data);
                    // } )
                    // or 
                    var subscription = keyup.subscribe(function (data) { return console.log(data); });
                    //subscription.unsubscribe();
                    // var debounce = _.debounce(function(text){
                    //     var url = "https://api.spotify.com/v1/search?type=artist&q=" + text;
                    //         $.getJSON(url, function(artist)  {
                    //             console.log(artist);
                    //         });
                    // }, 400);
                    //     $("search").keyup(function(e) {
                    //         var text = e.target.value;
                    //         if(text.length < 3)
                    //             return;
                    //         debounce(text);
                    //     });
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n        <input id=\"search\" type=\"text\" class=\"form-control\">\n        <reactive></reactive>\n        \n    ",
                        directives: [reactive_component_1.ReactiveComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map