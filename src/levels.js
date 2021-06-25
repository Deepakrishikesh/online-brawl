import dp0 from "./sprites/sola.png";
import dp1 from "./sprites/deepak.png";
import dp2 from "./sprites/nikes.png";
import dp3 from "./sprites/tony.png";
import platform from "./sprites/platform.png";
import ladder from "./sprites/ladder.png";
import { players } from "./multiplayer";
import { config } from "./config";

export const k1 = kaboom(config);
const dps = [dp0,dp1,dp2,dp3];
//k.loadSprite("dp", dp);
let dp_index=0;
dps.forEach(dp => {
    k1.loadSprite('dp'+dp_index++,dp);
});
k1.loadSprite("platform",platform);
k1.loadSprite("ladder", ladder);

// data structures
let player_avatars = [];
//maps
const maps = [
     [
        "                    ",
        "   -----        --- ", 
        "          --        ",
        "--------------------"
    ],
    [
        "                    ",
        "|              |   |",
        "?      -----   |   ?",
        "--------------------"

    ]

];
// main scene
k1.scene("game", () => {


    //Random map
    let map_index= Math.floor(Math.random()*2); //To generate random numbers from 0 to 1

    // main level
    k1.addLevel(maps[map_index],{
        height:150,
        width:50,
        '-': [k1.sprite('platform'),k1.scale(0.10),k1.solid(),'platform'],
        '|': [k1.sprite('platform'),k1.scale(0.10),k1.solid(),'platform'],
        '?': [k1.sprite('platform'),k1.scale(0.15),k1.solid(),'platform']
    });

    // adding all players
    let pointer = 0;
    dp_index=0;
    players.forEach(player=>{
        const temp = k1.add([
            k1.sprite('dp'+dp_index++),
            k1.scale(0.25),
            k1.pos(pointer,0),
            k1.body({jumpForce: 640,}),
            player
        ]);
        player_avatars.push(temp);
        pointer+=300;
    });

    // key controls
    let myplayer = 0; // testing 
    k1.keyPress('space',()=>{
        player_avatars[myplayer].jump(300);
    });
    k1.keyDown('left',()=>{
        player_avatars[myplayer].move(-300,0);
    });
    k1.keyDown('right',()=>{
        player_avatars[myplayer].move(300,0);
    });
    //testing 
    k1.keyPress('up',()=>{ 
        myplayer = (myplayer+1)%4;
    });
    k1.keyPress('down',()=>{
        myplayer = myplayer>0 ? --myplayer : 3;
    })

});

// start the game
k1.start("game");
