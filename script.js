/* Dies ist ein simples Memory Game, welches auf dem Memory Game von .... aufbaut
/ In diesem Spiel gibt es verschiedene Karten (hier gennant Tiles) welche der Spieler drücken kann
/ Wenn der Spieler eine Karte drückt, dreht sie sich um und zeigt dem Spieler ein Icon an, 
/ Nachdem der Spieler 2 Karten umgedreht hat checkt das Program ob diese beiden Karten die gleichen sind,
/ falls ja, bleiben beide Karten umgedreht und der Spieler kann die nächsten umdrehene,
/ falls nicht, drehen sich beide Karten wieder um
/ Das Spiel ist zuende wenn der Spieler alle Karten umgedreht hat und somit alle Memory-Paare gefunden hat
*/

// Hier werden die Variablen definiert: 

// Dies ist ein Array indem die Bilder/Icons der jeweiligen Karten gespeichert werden
var memory_array = ['mario_coin.jpg','mario_coin.jpg','pubg_helmet.jpg','pubg_helmet.jpg','Navi_Artwork.jpg','Navi_Artwork.jpg','metroid.jpg','metroid.jpg','destiny.jpg','destiny.jpg','overwatch.jpg','overwatch.jpg','flyff.jpg','flyff.jpg'];

//
var memory_values = [];
//
var memory_tile_ids = [];
// Dies ist eine variable die dazu dient den Status des Spiels zu definieren. 
// 0 bedeutet das gerade keine Karte umgedreht wurde
// 1 bedeutet das gerade eine Karte umgedreht wurde
// 2 bedeutet das 2 Karten gerade umgedreht wurden
var tiles_flipped = 0;

// dies ist eine Funktion die der Java Klasse 'Array' hinzugefügt wird da ihnen gewissen funktionalitäten fehlen
// diese Funktion mischt die Tiles neu in einer zufälligen Anordung
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
// Diese Funktion generiert ein neues Feld aufdem die Tiles gelegt werden, dies ist sozusagen die Play() Funktion wodurch das Spiel anfängt
// 
function newBoard() 
{
 tiles_flipped = 0;
 var output = '';
 memory_array.memory_tile_shuffle();
    
// Dies ist eine For-Schleife, sie wiederholt den in ihr liegenden Code so oft wie das Array: memory_array lang ist. 
 for(var i = 0; i < memory_array.length; i++)
 {
// Hier wird jedem Element in dem Array ein div gegeben und einem id mit unterschiedlichen Nummer basierend von 0 bis zur Länge des Arrays
// dann bekommt jedes Tile eine Funktion hinzugefügt mit den jeweiligen gebrauchten Parametern und zwar: (tile,val) was durch this
  output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
 }
 document.getElementById('memory_board').innerHTML = output;
}


function memoryFlipTile(tile,val)
{
 if(tile.innerHTML == "" && memory_values.length < 2)
 {
    tile.style.background = '#FFF';
    tile.innerHTML = '<img src="' + val + '">';
        if(memory_values.length == 0)
        {
            if(tiles_flipped == memory_array.length - 1)
                {
                alert("Board cleared... generating new board");
                    document.getElementById('memory_board').innerHTML = "";
                    newBoard();
                }
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
        }
 else if(memory_values.length == 1)
 {
   memory_values.push(val);
   memory_tile_ids.push(tile.id);
   if(memory_values[0] == memory_values[1])
   {
    tiles_flipped += 2;
    // Clear both arrays
    memory_values = [];
             memory_tile_ids = []; 
   } 
     
 else {
     
// Hier werden beide Tiles wieder zurück gedreht
    function flip2Back()
     {
        var tile_1 = document.getElementById(memory_tile_ids[0]);
        var tile_2 = document.getElementById(memory_tile_ids[1]);
        tile_1.style.background = 'url(tile_bg.jpg) no-repeat';
        tile_1.style.backgroundSize = '110px 110px';
        
        tile_1.innerHTML = "";
        tile_2.style.background = 'url(tile_bg.jpg) no-repeat';
        tile_2.style.backgroundSize = '110px 110px';

        tile_2.innerHTML = "";
         
        // Clear both arrays
        memory_values = [];
                 memory_tile_ids = [];
    }
     // Funktion flip2Back zuende 
    setTimeout(flip2Back, 700);
   }
    // Letztes Else der function memoryFlipTile() funktin

  }
 }
}

