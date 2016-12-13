import {Component} from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'right-sidebar',
    templateUrl: './view/right-sidebar.html',
    styleUrls:['./styles/right-side-bar.css']
})

export class RightSidebarComponent{
    public changeTheme(e:any):void{
        console.log("dsdsd",$('body'));
    }
}