// This is the main triggering script that renders
// a kaboom.js engine running

import dp from "./sprites/sola.png";
import platform from "./sprites/platform.png";
import ladder from "./sprites/ladder.png";
import { players } from "./multiplayer";
import { config } from "./config";
import { k1 } from "./levels";

const k = kaboom(config);
k.loadSprite("dp", dp);
k.loadSprite("platform",platform);
k.loadSprite("ladder", ladder);

// data structures
let player_avatars = [];

// main scene
k.scene("main", () => {


    // main level 
    k.addLevel([
        "                    ",
        "   -----        --- ", 
        "          --        ",
        "--------------------"
    ],{
        height:150,
        width:50,
        '-': [k.sprite('platform'),k.scale(0.10),k.solid(),'platform'],
    });

    // adding all players
    let pointer = 0;
    players.forEach(player=>{
        const temp = k.add([
            k.sprite('dp'),
            k.scale(0.25),
            k.pos(pointer,0),
            k.body({jumpForce: 640,}),
            player,
        ]);
        player_avatars.push(temp);
        pointer+=300;
    });

    // key controls
    let myplayer = 0; // testing 
    k.keyPress('space',()=>{
        player_avatars[myplayer].jump(300);
    });
    k.keyDown('left',()=>{
        player_avatars[myplayer].move(-300,0);
    });
    k.keyDown('right',()=>{
        player_avatars[myplayer].move(300,0);
    });

});

// start the game
k.start("main");
