

import {Component} from 'angular2/core';
import {ReactiveComponent} from './reactive.component'
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';

import 'rxjs/add/operator/map';

@Component({
    selector: 'my-app',
    template: `
        <input id="search" type="text" class="form-control">
        <reactive></reactive>
        
    `,
    directives: [ReactiveComponent]
})
export class AppComponent {
  
  

    constructor(){

        console.log(new Observable());
        var keyup = Observable.fromEvent($("#search"), "keyup")
                    .map( e => e.target.value)
                    .filter( text => text.length >= 3)
                    .debounceTime(400)

                    .distinctUntilChanged()
                    .flatMap(searchTerm => {
                        var url = "https://api.spotify.com/v1/search?type=artist&q=" + searchTerm;
                        var promise = $.getJSON(url);
                        return Observable.fromPromise(promise); 
                    });

    

        // Implemented using anonymous function.
        // keyup.subscribe(function(data) {
        //     console.log(data);
        // } )
        // or 
       var subscription =  keyup.subscribe( data => console.log(data));
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
}