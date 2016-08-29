import { Inject } from '@angular/core';


export class ChunkSizeService{
    window: Window;

    constructor (@Inject('Window') window: Window) {
        this.window = window;
    }
    getChunkSize() {
        //return number of cards per slide
        if(this.window.innerWidth <= 768) {
            return 1
        }
        else {
            return 3
        }

    }

}