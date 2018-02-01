/* Dies ist ein simples Memory Game
/ In diesem Spiel gibt es verschiedene Karten (hier gennant Tiles) welche der Spieler drücken kann
/ Wenn der Spieler eine Karte drückt, dreht sie sich um und zeigt dem Spieler ein Icon an, 
/ Nachdem der Spieler 2 Karten umgedreht hat checkt das Program ob diese beiden Karten die gleichen sind,
/ falls ja, bleiben beide Karten umgedreht und der Spieler kann die nächsten umdrehene,
/ falls nicht, drehen sich beide Karten wieder um
/ Das Spiel ist zuende wenn der Spieler alle Karten umgedreht hat und somit alle Memory-Paare gefunden hat
*/

// Hier werden die Variablen definiert: 

// Dies ist ein Array indem die Bilder/Icons der jeweiligen Karten gespeichert werden
var memory_array = ['mario_coin.jpg','mario_coin.jpg','pubg_helmet.jpg','pubg_helmet.jpg','Navi_Artwork.jpg','Navi_Artwork.jpg','metroid.jpg','metroid.jpg','destiny.jpg','destiny.jpg','overwatch.jpg','overwatch.jpg','flyff.jpg','flyff.jpg','lol.jpg','lol.jpg','life_is_strange.jpg','life_is_strange.jpg','monster_hunter.jpg','monster_hunter.jpg','cortana.jpg','cortana.jpg','mgs.jpg','mgs.jpg'];

//
var memory_values = [];
//
var memory_tile_ids = [];
// Dies ist eine variable die dazu dient sich zu merken wie viele Tiles umgedreht wurden. Am ende wird dieser wert mit der anzahl der tiles verglichen
var tiles_flipped = 0;

// dies ist eine Funktion die der Java Klasse 'Array' hinzugefügt wird da ihnen gewissen funktionalitäten fehlen
// diese Funktion mischt die Tiles neu in einer zufälligen Anordung
// Sie basiert auf dem Fisher-Yaters Modern Shuffle Algorithm
Array.prototype.memory_tile_shuffle = function()
{
// 3 Variablen werden hier definiert. i ist die Länge der Wert der Länge des Arrays, j wird zur speicherung einer zufälligen Zahl benutzt und temp ist dazu da 1 bestimmtes element im array mit einem anderen zu tauschen
    var i = this.length, j, temp;
// der Wert i(länge des arrays) wird jedes mal -1 gerechnet bis es zu 0 kommt
    while(--i > 0){
// Hier wird eine zufällige Zahl zwischen 0 und dem Array.length-1 generiert 
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
// Und am ende wird das object an der position index mit dem object an der zufälligen position "getauscht"
    }
}
// Diese Funktion generiert ein neues Feld aufdem die Tiles gelegt werden, dies ist sozusagen die Play() Funktion wodurch das Spiel anfängt
// 
function newBoard() 
{
 tiles_flipped = 0;
 var output = '';
// hier wird das array genommen und alle tiles werden vermischt
 memory_array.memory_tile_shuffle();
    
// Dies ist eine For-Schleife, sie wiederholt den in ihr liegenden Code so oft wie das Array: memory_array lang ist. 
 for(var i = 0; i < memory_array.length; i++)
 {
// Hier wird jedem Element in dem Array ein div gegeben und einem id mit unterschiedlichen Nummer basierend von 0 bis zur Länge des Arrays
// dann bekommt jedes Tile eine Funktion hinzugefügt mit den jeweiligen gebrauchten Parametern und zwar: (tile,val) was durch this und memory_array definiert ist
  output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
 }
// hier werden alle divs in das memory board gemachts
 document.getElementById('memory_board').innerHTML = output;
}

// In dieser Funktion werden 2 Werte übergeben, 
// tile ist 
function memoryFlipTile(tile,val)
{
//
 if(tile.innerHTML == "" && memory_values.length < 2)
 {
    tile.style.background = '#FFF';
// Hier wird der Wert von Value was alles in der jeweilign position des arrays ist, in das jeweilige Tile gemacht und dazu <img src> rangehangen. Dadurch hat dann das jweilige Tile ein Bild
    tile.innerHTML = '<img src="' + val + '">';
// Hier wird gecheckt ob irgendwas schon in memory_value ist. 
// Falls nichts drinnen ist wird der code ausgeführt welcher sich die Karte merkt
        if(memory_values.length == 0)
        {
            // Hier wird der ganze Inhalt in ein neues Array gemacht
            memory_values.push(val);
            // Und hier wird die ID des Tiles in das Array gemacht
            memory_tile_ids.push(tile.id);
        }
// Falls aber schon ein wert in dem array ist, also eine andere Karte geklickt wurde wird folgender code ausgeführt
 else if(memory_values.length == 1)
 {
// diese Karte wird auch dem array hinzugefüg
   memory_values.push(val);
   memory_tile_ids.push(tile.id);
// und hier werden beide objecte im array verglichen und geguckt ob sie gleich sind
   if(memory_values[0] == memory_values[1])
   {
    tiles_flipped += 2;
    // beide arrays werden gelöscht damit neue karte gecheckt werden können
    memory_values = [];
    memory_tile_ids = []; 
   
// hier wird die anzahl der umgedrehten tiles mit der gesamten anzahl aller tiles verglichen
    if(tiles_flipped == memory_array.length )
                {
                alert("Glückwunsch! Du hast das Memory geschaft. Ein neues zufälliges Memory wird generiert ");
                    document.getElementById('memory_board').innerHTML = "";
                    newBoard();
                }
   }
// Falls beide tiles in dem Array nicht die gleichen sind wird folgender code ausgeführt 
 else {
     
// Hier werden beide Tiles wieder zurück gedreht
    function flipBack()
     {
        var tile_1 = document.getElementById(memory_tile_ids[0]);
        var tile_2 = document.getElementById(memory_tile_ids[1]);
        tile_1.style.background = 'url(memory_karten_rücken.jpg) no-repeat';
        
        tile_1.innerHTML = "";
        tile_2.style.background = 'url(memory_karten_rücken.jpg) no-repeat';
        tile_2.innerHTML = "";
         
        memory_values = [];
        memory_tile_ids = [];
    }
     // Funktion flipBack zuende 
    setTimeout(flipBack, 1000);
   }
    // Letztes Else der function memoryFlipTile() funktin

  }
 }
}

function checkName() {
    
    var name, text;
    
    name = document.getElementById("firstname").value;

    if (/[\d]/.test(name)) {
        alert("Sie dürfen keine Zahlen in ihrem Namen verwenden!");
    }else {
        document.getElementById("game").action = "game.html";
    }
}
