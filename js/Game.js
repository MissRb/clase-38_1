class Game{
    constructor(){}
    getState(){
        var gameStateRef = database.ref('gameState')
        gameStateRef.on("value",function(data){
        gameState = data.val();
        })
    }

    update(state){
        database.ref("/").update({ 
        gameState:state
        });
    }
//esa funcion es para que inice el juego y se muestre en pantalla 
async start(){
    if(gameState === 0){
    //estamos creando el objeto para el jugador
    player = new Player();
    var playerCountRef=await database.ref('playerCount').once("value");
   
    if(playerCountRef.exists()){
        playerCount = playerCountRef.val();//falta parentesis
    
    //obtener el puntaje para el jugador
    player.getCount();
    }
    
    //creamos un objeto para el formulario
    form = new Form();
    form.display();
    }
}

play(){
    form.hide();
    textSize(30);
    text("Inicio del juego",120,100)//estaba en mayúscula text
    Player.getPlayerInfo();
    if(allPlayers!==undefined){
        var display_position = 130;
        for(var plr in allPlayers){
            if(plr === "player"+player.index)
            fill("red");
            else
            fill("black");
        
        display_position+=20;
        textSize(15);
        text(allPlayers[plr].name+":"+allPlayers[plr].distance,120,display_position);//text va en minúsculas
  
        }//llave de for
}

     
if(keyIsDown(UP_ARROW) && player.index !== null){
    player.distance +=50
    player.update();
    }
}
}