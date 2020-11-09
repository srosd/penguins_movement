window.onload = () => {


    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const keys = [];

    const player = {

        x: 0,
        y:300,
        width: 41,
        height: 42,
        frameX: 0,
        frameY: 2,
        speed: 9,
        moving: false
    
    }; 

    const playerSprite = new Image();
    playerSprite.src = "./images/pinguinos.png";

    const drawBack = () => {
        const back = new Image();
        back.src = './images/gridneon.jpg';
        back.onload = () => {
            ctx.drawImage(back, 0, 0, 1280, 720);
        }
    };

    const drawSprite = (img, sX, sY, sW, sH, dX, dY, dW, dH) => {
        ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
    };

    window.addEventListener("keydown", function(e){
        keys[e.keyCode] = true;
        player.moving = true;
        
    });

    window.addEventListener("keyup", function(e){
        keys[e.keyCode] =  false;
        player.moving = false; 
    
    });

    function movePlayer(){
        //TOP
        if (keys[87] && player.y > 251){
            player.y -= player.speed;
            player.frameY = 4; 
            player.moving = true;
        }
        //LEFT
        if (keys[65] && player.x > -player.width*5){
            player.x -= player.speed;
            player.frameY = 6;
            player.moving = true;
        }
        //DOWN
        if (keys[83] && player.y < canvas.height - player.height*5){
            player.y += player.speed;
            player.frameY = 0;
            player.moving = true;
        }
        //RIGHT
        if (keys[68] && player.x < canvas.width + player.width){
            player.x += player.speed;
            player.frameY = 2;
            player.moving = true;
        }
        //TOP RIGHT
        if (keys[87] && keys[68] && player.y > 0 && player.x < canvas.width - player.width ){
            
            player.y += player.speed/3;
            player.x -= player.speed/3;
            player.frameY = 3; 
            player.moving = true;
        }
        //TOP LEFT
        if (keys[87] && keys[65] && player.y > 0 && player.x > 0 ){
            player.y += player.speed/3;
            player.x += player.speed/3;
            player.frameY = 5; 
            player.moving = true;
    
        }
        //DOWN RIGHT
        if (keys[83] && keys[68] && player.y < canvas.height - player.height && player.x < canvas.width - player.width ){
            player.y -= player.speed/3;
            player.x -= player.speed/3;
            player.frameY = 1; 
            player.moving = true;
    
        }
        //DOWN LEFT
        if (keys[83] && keys[65] && player.x > 0 && player.y < canvas.height - player.height){
            
            player.y -= player.speed/3;
            player.x += player.speed/3;
            player.frameY = 7; 
            player.moving = true;
        }
    }

    function handlePlayerFrame(){
        if (player.frameX < 7 && player.moving) player.frameX++;
        else player.frameX = 0;
    }

    let fpsInterval, startTime, now, then, elapsed, animationId;

    function startAnimating(fps){
        fpsInterval = 1000/fps;
        then = Date.now();
        startTime = then;
        animate();
    }


    function animate(){
        animationId = requestAnimationFrame(animate);
        now = Date.now();
        elapsed = now - then;
        if (elapsed > fpsInterval){
            then = now - (elapsed % fpsInterval);
            drawBack();
        }
        
        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, (player.y*0.7)-150, (player.y*0.7)-150);
        
        movePlayer();
        handlePlayerFrame();
    }

    startAnimating(50);
















};