import { Component } from 'angular2/core';
import { ControlGroup, FormBuilder } from 'angular2/common';
import { Observable} from 'rxjs/Rx'

@Component({
    selector : 'reactive',
    templateUrl : 'app/reactive.component.html'
})
export class ReactiveComponent {
    form : ControlGroup;
    
    // Initilize
    constructor(fb : FormBuilder) {
        this.form = fb.group( {
            search : []
        })

        var search = this.form.find('search');
        search.valueChanges
        .debounceTime(400)
        //replace space with the - 
        .map(text => (<string>text).replace(' ', '-'))
        .subscribe(text => console.log(text));

        //this.reseravation();
       // this.diffrentObservable();
       // this.parallalObservable();
       // this.errorObseravable();
       // this.retyrObservable();
        this.catchObservable();
    }

    reseravation() {

            // Get two dates from today
            var startDates = [];
            var startDate = new Date();
            for(var day =  -2; day <=2 ; day++){
                var date = new Date(
                    startDate.getFullYear(),
                    startDate.getMonth(),
                    startDate.getDate() + day
                );
                startDates.push(date);
            }

            // Array Observable
            Observable
                .fromArray(startDates)
                .map(date => { 
                        console.log("Getting deals for date " + date)
                        return  [1, 2, 3];
                    })
                .subscribe(result => console.log(result));
    }

    diffrentObservable() {
       //var observable = Observable.of(1);
       //var observable =  Observable.range(1,5);
       //var observable = Observable.of(1,2,3);
       //var observable = Observable.of([1, 2, 3]);

        var observable = Observable.fromArray([1, 2, 3]);
        observable.subscribe(x  => console.log(x));

        // Time interval observable
        var observableTimer = Observable.interval(1000);
        observableTimer
            .flatMap(x => {
                    console.log("calling to server to get the latest news");
                    return Observable.of([1, 2, 3]);
                })
            .subscribe(news => console.log(news));
    }

    parallalObservable() {

        var userStream =  Observable.of({
            userId : 1, username :  'Param'
        }).delay(2000);

        var tweetStream = Observable.of([1, 2, 3]).delay(1500);
        Observable
            .forkJoin(userStream, tweetStream)
            .map( joined =>  new Object({
                user : joined[0], 
                tweets : joined[1]
            }))
            .subscribe(
                result => console.log(result),
                error => console.error(error));
    }

    errorObseravable() {
        var observable =  Observable.throw(new Error("Something went wrong"));
        observable.subscribe(
            value => console.log(value),
            error => console.error(error)
        );
    }

    retyrObservable() {
        var counter = 0;
        var observable = Observable.of(13)
            .flatMap( () => {
                if(++counter < 2) {
                    return Observable.throw( new Error("Request failed."));
                }
                return Observable.of([1, 2, 3]);
            })
            .retry(3)
            .subscribe(
                value => console.log(value),
                error => console.error(error)
            )
    }

    catchObservable() {
        //var remoteDataStream = Observable.throw(new Error("Something went wrong"));
        var remoteDataStream = Observable.of(4,5,6).delay(5000);

        remoteDataStream.catch( error => {
            var localDataStream = Observable.of([1, 2, 3]);
            return localDataStream;
        })
        .timeout(2000)
        .subscribe(
            result => console.log(result),
            error => console.error(error),
            () => console.log("completed.")
            );
    }

 }