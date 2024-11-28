import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CINEMA_FRONTEND';

  ngOnInit() {


    $(function () {
      $('body').tooltip({
          selector: '[data-toggle="tooltip"]'
      }).click(function () {
        $('.tooltip.show').removeClass("show");
        
      });
     })

     
  }
}
