System.register(['angular2/core', 'angular2/common', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, common_1, Rx_1;
    var ReactiveComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            ReactiveComponent = (function () {
                // Initilize
                function ReactiveComponent(fb) {
                    this.form = fb.group({
                        search: []
                    });
                    var search = this.form.find('search');
                    search.valueChanges
                        .debounceTime(400)
                        .map(function (text) { return text.replace(' ', '-'); })
                        .subscribe(function (text) { return console.log(text); });
                    //this.reseravation();
                    // this.diffrentObservable();
                    // this.parallalObservable();
                    // this.errorObseravable();
                    // this.retyrObservable();
                    this.catchObservable();
                }
                ReactiveComponent.prototype.reseravation = function () {
                    // Get two dates from today
                    var startDates = [];
                    var startDate = new Date();
                    for (var day = -2; day <= 2; day++) {
                        var date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + day);
                        startDates.push(date);
                    }
                    // Array Observable
                    Rx_1.Observable
                        .fromArray(startDates)
                        .map(function (date) {
                        console.log("Getting deals for date " + date);
                        return [1, 2, 3];
                    })
                        .subscribe(function (result) { return console.log(result); });
                };
                ReactiveComponent.prototype.diffrentObservable = function () {
                    //var observable = Observable.of(1);
                    //var observable =  Observable.range(1,5);
                    //var observable = Observable.of(1,2,3);
                    //var observable = Observable.of([1, 2, 3]);
                    var observable = Rx_1.Observable.fromArray([1, 2, 3]);
                    observable.subscribe(function (x) { return console.log(x); });
                    // Time interval observable
                    var observableTimer = Rx_1.Observable.interval(1000);
                    observableTimer
                        .flatMap(function (x) {
                        console.log("calling to server to get the latest news");
                        return Rx_1.Observable.of([1, 2, 3]);
                    })
                        .subscribe(function (news) { return console.log(news); });
                };
                ReactiveComponent.prototype.parallalObservable = function () {
                    var userStream = Rx_1.Observable.of({
                        userId: 1, username: 'Param'
                    }).delay(2000);
                    var tweetStream = Rx_1.Observable.of([1, 2, 3]).delay(1500);
                    Rx_1.Observable
                        .forkJoin(userStream, tweetStream)
                        .map(function (joined) { return new Object({
                        user: joined[0],
                        tweets: joined[1]
                    }); })
                        .subscribe(function (result) { return console.log(result); }, function (error) { return console.error(error); });
                };
                ReactiveComponent.prototype.errorObseravable = function () {
                    var observable = Rx_1.Observable.throw(new Error("Something went wrong"));
                    observable.subscribe(function (value) { return console.log(value); }, function (error) { return console.error(error); });
                };
                ReactiveComponent.prototype.retyrObservable = function () {
                    var counter = 0;
                    var observable = Rx_1.Observable.of(13)
                        .flatMap(function () {
                        if (++counter < 2) {
                            return Rx_1.Observable.throw(new Error("Request failed."));
                        }
                        return Rx_1.Observable.of([1, 2, 3]);
                    })
                        .retry(3)
                        .subscribe(function (value) { return console.log(value); }, function (error) { return console.error(error); });
                };
                ReactiveComponent.prototype.catchObservable = function () {
                    //var remoteDataStream = Observable.throw(new Error("Something went wrong"));
                    var remoteDataStream = Rx_1.Observable.of(4, 5, 6).delay(5000);
                    remoteDataStream.catch(function (error) {
                        var localDataStream = Rx_1.Observable.of([1, 2, 3]);
                        return localDataStream;
                    })
                        .timeout(2000)
                        .subscribe(function (result) { return console.log(result); }, function (error) { return console.error(error); }, function () { return console.log("completed."); });
                };
                ReactiveComponent = __decorate([
                    core_1.Component({
                        selector: 'reactive',
                        templateUrl: 'app/reactive.component.html'
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder])
                ], ReactiveComponent);
                return ReactiveComponent;
            }());
            exports_1("ReactiveComponent", ReactiveComponent);
        }
    }
});
//# sourceMappingURL=reactive.component.js.map