import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
    selector: 'drag-and-drop',
    templateUrl: './view/drag-and-drop.html',
    providers: [DragulaService],
    styleUrls: ['./styles/drag-and-drop.css']
})

export class DragAndDropComponent {
    constructor(private dragulaService: DragulaService) {
        dragulaService.drag.subscribe((value) => {
            this.onDrag(value.slice(1));
        });
        dragulaService.drop.subscribe((value) => {
            this.onDrop(value.slice(1));
        });
        dragulaService.over.subscribe((value) => {
            this.onOver(value.slice(1));
        });
        dragulaService.out.subscribe((value) => {
            this.onOut(value.slice(1));
        });
    }

    private hasClass(el: any, name: string) {
        return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
    }

    private addClass(el: any, name: string) {
        if (!this.hasClass(el, name)) {
            el.className = el.className ? [el.className, name].join(' ') : name;
        }
    }

    private removeClass(el: any, name: string) {
        if (this.hasClass(el, name)) {
            el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
        }
    }

    private onDrag(args) {
        let [e, el] = args;
        this.removeClass(e, 'ex-moved');
    }

    private onDrop(args) {
        let [e, el] = args;
        this.addClass(e, 'ex-moved active');
    }

    private onOver(args) {
        let [e, el, container] = args;
        this.addClass(el, 'ex-over');
    }

    private onOut(args) {
        let [e, el, container] = args;
        this.removeClass(el, 'ex-over');
    }


    //music data for drag and drop
    public musicList: string[] = ["Song 1", "Song 2", "Song 3","Song 5","Song 8","Song 9"];
    public playList: string[] = ["Song 4","Song 10"];
    public favouriteList: string[] = ["Song 6","Song 7"];

    //vegetables and fruit and data
    public vegetablesList: string[] = ["Carrot", "Cucumber", "Tomato","Raddish"];
    public fruitsList: string[] = ["Grapes","Apple","Orange","Papaya"];
    public salads: string[] = ["Watermelon"];
}