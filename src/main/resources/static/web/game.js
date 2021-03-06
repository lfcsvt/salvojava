 var urlParams = new URLSearchParams(window.location.search);
 var myParam = urlParams.get('gp');
 getData()
 makeGrid()
 let turn;

// fetch data from game
function getData() {
var url1 = 'http://localhost:8080/api/game_view/' + myParam
    fetch(url1)
      .then(response => response.json())
      .then(response => {
          let slvGames = response
          console.log(response)
          main(slvGames)
      })
      .catch(err => console.log(err));
}

function getTurn(slvGames){
    let n;
        slvGames.salvoes.forEach(el => {
            if(el.gp_id == myParam){
                el.gp_salvoes.length
                n = el.gp_salvoes.length + 1
            }
        })
    return n
}
// serves as
function main(slvGames){
   turn = getTurn(slvGames)
   makeSGrid(slvGames)
   addPlayerInfo(slvGames)
   placeShips(slvGames)
   placeSalvoes(slvGames)
   placeSHits(slvGames)
   myOpponentHits(slvGames)
   getTurn(slvGames)
   opponentInfo(slvGames)
   histTable(slvGames)
   gameTurn(slvGames)
   markHits(slvGames)
   oHits(slvGames)
}

function makeGrid(){
var tblBody = document.getElementById("grid-tBody")
var tbl = document.getElementById("grid-table");
var letArr = ["A", "B" ,"C" ,"D" ,"E","F", "G", "H", "I", "J" ]
var numArr = [1, 2 ,3 ,4 , 5, 6, 7, 8, 9, 10 ]
var row = document.createElement("tr");
    tblBody.innerHTML = ""
    for (var i = 0; i < letArr.length; i++) {
        var letter = letArr[i]
        var blank = " "
        var row = document.createElement("tr");
        var td = document.createElement("td");
        row.insertCell().innerHTML = letter
        for(var j = 0 ; j< numArr.length; j++){
              var td = document.createElement("td");
              td.setAttribute("id",letArr[i] + numArr[j])
              td.setAttribute("ondrop", "drop(event)")
              td.setAttribute("ondragover", "allowDrop(event)")
              row.appendChild(td)
        }

        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
}

function makeSGrid(slvGames){
var tblBody = document.getElementById("salvo-tBody")
var tbl = document.getElementById("salvo-table");
var letArr = ["A", "B" ,"C" ,"D" ,"E","F", "G", "H", "I", "J" ]
var numArr = [1, 2 ,3 ,4 , 5, 6, 7, 8, 9, 10 ]
var row = document.createElement("tr");
    tblBody.innerHTML = ""
    for (var i = 0; i < letArr.length; i++) {
        var letter = letArr[i]
        var blank = " "
        var row = document.createElement("tr");
        var td = document.createElement("td");
        row.insertCell().innerHTML = letter
        for(var j = 0 ; j< numArr.length; j++){
              var td = document.createElement("td");
              td.setAttribute("id","S" + letArr[i] + numArr[j])
               td.setAttribute("onClick", "getSalvo(this.id)")

            row.appendChild(td)
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
}

//function checkSalvo(){
//
//    let hitDiv = document.querySelectorAll('.hit-div')
//        console.log(hitDiv)
//        console.log(Array.from(hitDiv).length)
//        hitDiv.forEach(e => {
//        let a = e.offsetParent
//        console.log(a)
//        return a
//        })
//
//
//}


function addPlayerInfo(slvGames){
    var myPlayer_id = slvGames.gPlayer_id
    var infoPlace = document.getElementById("game-info")
    var myPlayer_user= ""
    var myOpponent= ""
    var arr = slvGames.gamePlayer
    var user = document.createElement("h3");
    if(arr > 0){
        arr.forEach(elem => {
            if(elem.player.id == myPlayer_id){
                myPlayer_user = elem.player.user
                user = document.createElement("h3");
                var t = document.createTextNode("User: " + myPlayer_user + " X ")
                var x = document.createTextNode("Opponent: " + myOpponent)
                user.appendChild(t);
                user.appendChild(x);
                infoPlace.appendChild(user);
            }else if(elem.player.id !== myPlayer_id){
                    myOpponent = elem.player.user

            }
        })
    }
}

function placeShips(slvGames){
   var arr = slvGames.ships
       if(arr.length > 0){
           arr.forEach(locate => {
               locate.ships_locations.forEach(place => {
               var shipSeg = document.getElementById(place)
                   if(shipSeg.id == place){
                        shipSeg.setAttribute("style", "background-color: blue;");
                   }
               })
           })
       }
}

function placeSalvoes(slvGames){
 var urlParams = new URLSearchParams(window.location.search);
 var myParam = urlParams.get('gp');
    let turn = document.createElement("p");
    let arr = slvGames.salvoes
    let user_id = slvGames.gPlayer_id
        if(arr.length > 0){
        arr.forEach(elem => {
                if(elem.gp_id == myParam){
                    elem.gp_salvoes.forEach(elem2 => {
                        elem2.salvoes_locations.forEach(place => {
                            var slvSeg = document.getElementById("S" + place)
                               if(slvSeg.id ==  "S" + place){
                                   let hitDiv = document.createElement("div")
                                   hitDiv.setAttribute("class", "hit-div")
                                   let x = elem2.turn;
                                   let text = document.createElement("p")
                                   text.setAttribute("align", "center")
                                   var t = document.createTextNode(x);
                                   text.appendChild(t)
                                   hitDiv.appendChild(text)
                                   slvSeg.appendChild(hitDiv)
                                   slvGames.histObj.hitOShips.forEach(el =>{
                                        if(place == el.hit){
                                            hitDiv.setAttribute("style", "background-color: red")
                                            }
                                        });
                            }
                        })
                    })
                }
            })
        }
}


function placeSHits(slvGames){
 var urlParams = new URLSearchParams(window.location.search);
 var myParam = urlParams.get('gp');
    let turn = document.createElement("p");
    let arr = slvGames.salvoes
    let user_id = slvGames.player_id
    if(arr.length > 0){
        arr.forEach(elem => {
            slvGames.gamePlayer.forEach(playa =>{
            })
                if(elem.gp_id != myParam){
                    elem.gp_salvoes.forEach(elem2 => {
                        elem2.salvoes_locations.forEach(place => {
                            var slvSeg = document.getElementById(place)
                               if(slvSeg.id ==  place){
                                   let hitDiv = document.createElement("div")
                                   hitDiv.setAttribute("class", "hit-div")
                                   let x = elem2.turn;
                                   let text = document.createElement("p")
                                   var t = document.createTextNode(x);
                                   text.appendChild(t)
                                   hitDiv.appendChild(text)
                                   slvSeg.appendChild(hitDiv)
                            }
                        })
                    })
                }
            })
    }
}

function myOpponentHits(slvGames){
    let arr = slvGames.salvoes
    let arr2 = slvGames.ships
    let shipLocArr = []
    let slvLocArr = []
    let user_id = slvGames.gPlayer_id
        if(arr2.length > 0){
            arr2.forEach(elem => {
                elem.ships_locations.forEach(elem2 => {
                    shipLocArr.push(elem2)
                })
            })
        }
        if(arr.length > 0){
            arr.forEach(elem =>{
                if(elem.gp_id != myParam){
                    elem.gp_salvoes.forEach(elem2 =>{
                        elem2.salvoes_locations.forEach(elem3 => {
        //                    let elem4 = elem3.split('').slice(1, 4).join("")
                            let a = shipLocArr.filter(loc => loc == elem3)
                                    a.forEach(hit => {
                                        let divHit = document.getElementById(hit)
                                        divHit.firstChild.setAttribute("style", "background-color: red")
                                   })
                        })

                    })
                }
            })
        }
}

function placeShip(){
    var urlParams = new URLSearchParams(window.location.search);
    var myParam = urlParams.get('gp');

    let data = [
              { "type": "Carrier", "locations": ["A10", "B10", "C10","D10","E10"] },
              { "type": "Battleship", "locations": ["D2", "D3", "D4", "D5"] },
              { "type": "Destroyer", "locations" : ["A1", "B1", "C1"] },
              { "type": "Submarine", "locations": ["F2", "F3", "F4"] },
              { "type": "Patrol Boat", "locations": ["H5", "H6"] }
               ]

    let  url = '/api/games/players/'+ myParam + '/ships'
    console.log(url);

    fetch(url, {
        method: "POST",
        credentials: "include",
        headers:{
            'Accept': "application/json",
            'Content-Type': "application/json"
        },

         body : JSON.stringify(data)

         })
         .then(function(response){
            return response.json();
         })
         .then(function(json){
            console.log(data)
            location.reload();
         });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function addShips(){

    }
//    for(var c = 0; c < 1; c++){
//    let n = getRandomInt(25) + 1
//    const every_nth = (data, nth) => data.filter((e, i) => i % nth === nth - 1);
//    let a = data.slice(0, n)
//     data = data.filter( item => !a.includes(item))
//
//    let c = every_nth(data, 10)
//    console.log(c);
//    while(c.length > 5){
//        c.shift()
//        c.pop()
//        console.log(c)
//    }
//    }
//
//
//var urlParams = new URLSearchParams(window.location.search);
//    var myParam = urlParams.get('gp');
//
//    let ships = [
//              { type: "Carrier", locations: carrierArr},
//              { type: "Battleship",locations: battleshipArr},
//              { type: "Destroyer", locations: submarineArr },
//              { type: "Submarine", locations: destroyerArr },
//              { type: "Patrol Boat", locations: patrolBoatArr }
//              ]
//                let  url = '/api/games/players/'+ myParam + '/ships'
//                  console.log(url);
//
//                  fetch(url, {
//                      method: "POST",
//                      credentials: "include",
//                      headers:{
//                          'Accept': "application/json",
//                          'Content-Type': "application/json"
//                      },
//
//                       body : JSON.stringify(ships)
//
//                       })
//                       .then(function(response){
//                          return response.json();
//                       })
//                       .then(function(json){
//
//                          location.reload();
//                       });
//
//}

//function allowDrop(ev) {
//  ev.preventDefault();
//}
//
//function drag(ev) {
//
//  ev.dataTransfer.setData("text", ev.target.id);
//}
//
//function drop(ev) {
//  ev.preventDefault();
//  var data = ev.dataTransfer.getData("text");
//  ev.target.appendChild(document.getElementById(data));
//  console.log(ev.target)
//}
function getSalvo(id){
    let isClicked = false
    let allSalvoes = []
    let td = document.getElementById(id)
    let newId = id.split('').slice(1, 4).join("")
        allSalvoes.push(id)
            if (allSalvoes.includes(id)){
                 isClicked = true
                 if(isClicked == true){
                    let salvos = {turn: turn, locations:[newId]}
                        console.log(salvos)
                        var urlParams = new URLSearchParams(window.location.search);
                        var myParam = urlParams.get('gp');

                            let  url = '/api/games/players/'+ myParam + '/salvos'
                              fetch(url, {
                                  method: "POST",
                                  credentials: "include",
                                  headers:{
                                      'Accept': "application/json",
                                      'Content-Type': "application/json"
                                  },

                                   body : JSON.stringify(salvos)

                                   })
                                   .then(function(response){

                                      return response.json();
                                   })
                                   .then(function(json){
                                       console.log(json)

                                       location.reload();

                                   })
                                    .catch(err => console.log(err));
        }
    }

}

function opponentInfo(slvGames){
     var arr = slvGames.histObj.turnHitMe
     var arr2 = slvGames.histObj.turnHitO
     var arr3 = slvGames.histObj.hitOShips
     var arr4 = slvGames.histObj.hitMyShips
     var oppHist =[]
         arr4.forEach(el =>{
             let obj = {}
                arr.forEach(el4 => {
                    let ship ;
                    if(el4.hit == el.hit){
                        ship = el.ship
                             obj = {
                              "gp_id": el4.player,
                              "turn": el4.turn,
                              "hit": el4.hit,
                              "ship": ship
                               }
                    }
                 })
             oppHist.push(obj)
         })
         arr2.forEach(el2 =>{
            let obj2 = {}
            arr3.forEach(el3 => {
            let ship ;
            if(el2.hit == el3.hit){
                ship = el3.ship
                obj2 = {
                "gp_id": el2.player,
                "turn": el2.turn,
                "hit": el2.hit,
                "ship": ship
                 }
             }
          })
         oppHist.push(obj2)
     })
     return oppHist
 }

// create game history table
 function histTable(slvGames){
    var hitArr = []
    var hitArrOpp = []
     var arr = opponentInfo(slvGames)
     slvGames.gamePlayer.forEach(elem => {
        let user = document.getElementById("player")
        let opponent = document.getElementById("opponent")
             if(elem.gp_id == myParam){
                user.innerHTML = elem.player.name + " "
             }
             else if(elem.gp_id != myParam){
                opponent.innerHTML = elem.player.name
             }
     })
     arr.forEach(el => {
        if(el.gp_id == myParam){
            let x = document.getElementById("O" + el.ship)
            x.innerHTML = el.ship
            hitArrOpp.push(el.ship)
        } else if(el.gp_id != myParam){
            let y = document.getElementById(el.ship)
            y.innerHTML = el.ship
            hitArr.push(el.ship)
        }
     })

// set hits on my ships
            var hitOnSub = 0;
            var hitOnPT = 0;
            var hitOnCar = 0;
            var hitOnDes = 0;
            var hitOnBat = 0;
            for(var i=0;i<hitArr.length;i++){
                if(hitArr[i] === "Submarine"){
                    hitOnSub++;
                    if(hitOnSub == 3){
                        let p = document.getElementById("sSub")
                        p.innerHTML = "Submarine"
                        p.style.color = "red"
                        }
                } else if(hitArr[i] === "Patrol Boat"){
                    hitOnPT++;
                    if(hitOnPT == 2){
                        let p = document.getElementById("sPat")
                        p.innerHTML = "Patrol Boat"
                        p.style.color = "red"
                        }
                } else if(hitArr[i] === "Carrier"){
                    hitOnCar++;
                    if(hitOnCar == 5){
                        let p = document.getElementById("sCar")
                        p.innerHTML = "Carrier"
                        p.style.color = "red"
                        }
                } else if(hitArr[i] === "Battleship"){
                    hitOnBat++;
                    if(hitOnBat == 4){
                        let p = document.getElementById("sBat")
                        p.innerHTML = "Battleship"
                        p.style.color = "red"
                        }
                } else if(hitArr[i] === "Destroyer"){
                    hitOnDes++;
                    if(hitOnDes == 3){
                        let p = document.getElementById("sDes")
                        p.innerHTML = "Destroyer"
                        p.style.color = "red"
                        }
                }
            }

// set hits on Opponent ships
            var hitOnOSub = 0;
            var hitOnOPT = 0;
            var hitOnOCar = 0;
            var hitOnODes = 0;
            var hitOnOBat = 0;
            for(var i=0;i<hitArrOpp.length;i++){
                if(hitArrOpp[i] === "Submarine"){
                    hitOnOSub++;
                    if(hitOnOSub == 3){
                        let p = document.getElementById("osSub")
                        p.innerHTML = "Submarine"
                        p.style.color = "red"
                        }
                } else if(hitArrOpp[i] === "Patrol Boat"){
                    hitOnOPT++;
                    if(hitOnOPT == 2){
                        let p = document.getElementById("osPat")
                        p.innerHTML = "Patrol Boat"
                        p.style.color = "red"
                        }
                } else if(hitArrOpp[i] === "Carrier"){
                    hitOnOCar++;
                    if(hitOnOCar == 3){
                        let p = document.getElementById("osCar")
                        p.innerHTML = "Carrier"
                        p.style.color = "red"
                        }
                } else if(hitArrOpp[i] === "Battleship"){
                    hitOnOBat++;
                    if(hitOnOBat == 3){
                        let p = document.getElementById("osBat")
                        p.innerHTML = "Battleship"
                        p.style.color = "red"
                        }
                } else if(hitArrOpp[i] === "Destroyer"){
                    hitOnODes++;
                    if(hitOnODes == 3){
                        let p = document.getElementById("osDes")
                        p.innerHTML = "Destroyer"
                        p.style.color = "red"
                        }
                }
            }

// set my ships display
    slvGames.ships.forEach(ship => {
    let Pt = document.getElementById("patrol boat-hit")
    let Cr = document.getElementById("carrier-hit")
    let Sb = document.getElementById("submarine-hit")
    let Dt = document.getElementById("destroyer-hit")
    let Bt = document.getElementById("battleship-hit")
        if(ship.type == "Carrier" && hitOnCar > 0){
           document.getElementById("carrier-hit").style.marginBottom = '10px'
                ship.ships_locations.forEach(el => {
                    let div = document.createElement("div")
                    div.setAttribute("id", "h" + el)
                    div.setAttribute("class", "col-1")
                    div.innerHTML = el
                    Cr.appendChild(div)
                        })
        } else if(ship.type == "Battleship" && hitOnBat != 0){
            document.getElementById("battleship-hit").style.marginBottom = '10px'
                  ship.ships_locations.forEach(el => {
                    let div = document.createElement("div")
                     div.setAttribute("id", "h" + el)
                     div.setAttribute("class", "col-1")
                     div.innerHTML = el
                     Bt.appendChild(div)
                         })
        } else if(ship.type == "Submarine" && hitOnSub != 0){
            document.getElementById("submarine-hit").style.marginBottom = '10px'
               ship.ships_locations.forEach(el => {
                let div = document.createElement("div")
                    div.setAttribute("id", "h" + el)
                    div.setAttribute("class", "col-1")
                    div.innerHTML = el
                    Sb.appendChild(div)
                        })
        } else if(ship.type == "Patrol Boat" && hitOnPT != 0){
            document.getElementById("patrol boat-hit").style.marginBottom = '10px'
            ship.ships_locations.forEach(el => {
                let div = document.createElement("div")
                    div.setAttribute("id", "h" + el)
                    div.setAttribute("class", "col-1")
                    div.innerHTML = el
                    Pt.appendChild(div)
                    })
        }  else if(ship.type == "Destroyer" && hitOnDes != 0){
            document.getElementById("destroyer-hit").style.marginBottom = '10px'
             ship.ships_locations.forEach(el => {
                let div = document.createElement("div")
                    div.setAttribute("id", "h" + el)
                    div.setAttribute("class", "col-1")
                    div.innerHTML = el
                    Dt.appendChild(div)
                    })
        }
    })
 // set my Opponents ships display
  slvGames.ships.forEach(ship => {
     let Pt = document.getElementById("Opatrol boat-hit")
     let Cr = document.getElementById("Ocarrier-hit")
     let Sb = document.getElementById("Osubmarine-hit")
     let Dt = document.getElementById("Odestroyer-hit")
     let Bt = document.getElementById("Obattleship-hit")
         if(ship.type == "Carrier" && hitOnOCar > 0){
            document.getElementById("Ocarrier-hit").style.marginBottom = '10px'
             ship.ships_locations.forEach(el => {
             let div = document.createElement("div")
                div.setAttribute("id", "ocar" + ship.ships_locations.indexOf(el))
                 div.setAttribute("class", "col-1")
                 div.innerHTML = el
                 Cr.appendChild(div)
                     })
         } else if(ship.type == "Battleship" && hitOnOBat != 0){
            document.getElementById("Obattleship-hit").style.marginBottom = '10px'
               ship.ships_locations.forEach(el => {
                 let div = document.createElement("div")
                      div.setAttribute("id", "obat" + ship.ships_locations.indexOf(el))
                      div.setAttribute("class", "col-1")
                      div.innerHTML = el
                      Bt.appendChild(div)
                          })
         } else if(ship.type == "Submarine" && hitOnOSub != 0){
            document.getElementById("Osubmarine-hit").style.marginBottom = '10px'
                ship.ships_locations.forEach(el => {
                 let div = document.createElement("div")
                     div.setAttribute("id", "osub" + ship.ships_locations.indexOf(el))
                     div.setAttribute("class", "col-1")
                     div.innerHTML = el
                     Sb.appendChild(div)
                         })
         } else if(ship.type == "Patrol Boat" && hitOnOPT != 0){
            document.getElementById("Opatrol boat-hit").style.marginBottom = '10px'
             ship.ships_locations.forEach(el => {
                 let div = document.createElement("div")
                     div.setAttribute("id", "opat" + ship.ships_locations.indexOf(el))
                     div.setAttribute("class", "col-1")
                     div.innerHTML = el
                     Pt.appendChild(div)
                     })
         }  else if(ship.type == "Destroyer" && hitOnODes != 0){
            document.getElementById("Odestroyer-hit").style.marginBottom = '10px'
              ship.ships_locations.forEach(el => {
                 let div = document.createElement("div")
                     div.setAttribute("id", "odes" + ship.ships_locations.indexOf(el))
                     div.setAttribute("class", "col-1")
                     div.innerHTML = el
                     Dt.appendChild(div)
                     })
         }
     })
 }


function gameTurn(slvGames){
    let arr = []
    let turn = document.getElementById("game-turn")
        slvGames.salvoes.forEach(salvo => {
        arr.push(salvo.gp_salvoes.length)
    })
        turn.innerHTML = Math.max(...arr)
}

function markHits(slvGames){
    slvGames.histObj.hitMyShips.forEach(el => {
        let div = document.getElementById("h" + el.hit)
        div.style.backgroundColor = 'red'
    })
}

function oHits(slvGames){
    let sub = []
    let pat = []
    let car = []
    let bat = []
    let des = []
    slvGames.histObj.hitOShips.forEach(el => {
        if(el.ship == "Submarine"){
            sub.push(el.ship)
            if(sub.length > 0){
                    sub.forEach((el, i) => {
                    let div = document.getElementById("osub" + i)
                    div.style.backgroundColor = 'red'
                })
            }
        } else if(el.ship == "Patrol Boat"){
            pat.push(el.ship)
            if(pat.length > 0){
                pat.forEach((el, i) =>{
                    let div = document.getElementById("opat" + i)
                    div.style.backgroundColor = 'red'
                })
            }

        } else if(el.ship == "Carrier"){
            car.push(el.ship)
            if(car.length > 0){
                car.forEach((el, i) =>{
                    let div = document.getElementById("ocar" + i)
                    div.style.backgroundColor = 'red'
                })
            }
        }else if(el.ship == "Destroyer"){
            des.push(el.ship)
            if(des.length > 0){
                des.forEach((el, i)=>{
                    let div = document.getElementById("odes" + i)
                    div.style.backgroundColor = 'red'
                })
            }
        } else if(el.ship == "Battleship"){
            bat.push(el.ship)
            if(bat.length > 0){
                bat.forEach((el, i)=>{
                    let div = document.getElementById("obat" + i)
                    div.style.backgroundColor = 'red'
                })
            }
        }
    })
}

function testShip(){
// sets all arrays needed to build the random ship selection
   let arr = []
   let arr3 = []
   let arr4 = []
   let arr5 = []
   let arr6 = []
   let carrier = []
   let battleship = []
   let submarine = []
   let destroyer = []
   let pBoat = []
   let arr2 = Array.from(Array(10), (e, i) => String.fromCharCode(i + 65));

// determines if the ship is horizontal or vertical
   let option = Math.floor(Math.random() * 2);
   let option2 = Math.floor(Math.random() * 2);
   let option3 = Math.floor(Math.random() * 2);
   let option4 = Math.floor(Math.random() * 2);
   let option5 = Math.floor(Math.random() * 2);

// set a random number to calculate the difference
   let a = Math.floor(Math.random() * 10) + 1;
   let b = Math.floor(Math.random() * 10) + 1;
   let c = Math.floor(Math.random() * 10) + 1;
   let d = Math.floor(Math.random() * 10) + 1;
   let e = Math.floor(Math.random() * 10) + 1;

// sets the index of the letter array
   let index = Math.floor(Math.random() * 5);
   let index2 = Math.floor(Math.random() * 5);
   let index3 = Math.floor(Math.random() * 5);
   let index4 = Math.floor(Math.random() * 5);
   let index5 = Math.floor(Math.random() * 5);

 // sets the difference, to prevent numbers over or under the allowed
   let dif = 10 - a
   let dif2 = 10 - b
   let dif3 = 10 - c
   let dif4 = 10 - d
   let dif5 = 10 - e

// sets the letter for the vertical select
   let letter = arr2[index]
   let letter2 = arr2[index2]
   let letter3 = arr2[index3]
   let letter4 = arr2[index4]
   let letter5 = arr2[index5]

// selects the Carrier locations  array
    if(option == 0){
        for(var i = 0; i < 5; i++){
            if(dif > 6){
                arr.push(letter + a++)
        } else  {
        arr.push(letter + a--)
        }
    }
   if(arr.includes(letter + 0)){
        arr.pop(letter + 0)
        arr.push(letter + 5)
   }

    carrier = arr.sort(function(a, b){return a-b})
   } else {
        for(var i = 0; i < 5; i++){
            arr.push(arr2[index++] + a)
            carrier = arr.sort(function(a, b){return a-b})
         }
   }

// selects the Battleship locations  array
   if(option2 == 0){
      for(var j = 0; j< 4; j++){
          if(dif2 > 5){
               arr3.push(letter2 + b++)
          } else  {
           arr3.push(letter2 + b--)
          }
      }
      if(arr3.includes(letter2 + 0)){
       arr3.pop(letter2 + 0)
       arr3.push(letter2 + 4)
      }

      battleship = arr3.sort(function(a, b){return a-b})
    } else {
           for(var j = 0; j< 4; j++){
               arr3.push(arr2[index2++] + b)
               battleship = arr3.sort(function(a, b){return a-b})
           }
      }

// selects the Submarine locations  array
      if(option3 == 0){
            for(var x = 0; x < 3; x++){
                if(dif3 > 5){
                     arr4.push(letter3 + c++)
                } else  {
                 arr4.push(letter3 + c--)
                }
            }
            if(arr4.includes(letter3 + 0)){
             arr4.pop(letter3 + 0)
             arr4.push(letter3 + 3)
            }

                submarine = arr4.sort(function(a, b){return a-b})
      } else {
         for(var x = 0; x < 3; x++){
             arr4.push(arr2[index3++] + c)
             submarine = arr4.sort(function(a, b){return a-b})
          }
      }
// selects the Destroyer locations  array
      if(option4 == 0){
                  for(var y = 0;  y < 3; y++){
                      if(dif4 > 5){
                           arr5.push(letter4 + d++)
                      } else  {
                       arr5.push(letter4 + d--)
                      }
                  }
                  if(arr5.includes(letter4 + 0)){
                   arr5.pop(letter4 + 0)
                   arr5.push(letter + 3)
                  }

                      destroyer = arr5.sort(function(a, b){return a-b})
      } else {
           for(var y = 0; y < 3; y++){
               arr5.push(arr2[index4++] + d)
               destroyer = arr5.sort(function(a, b){return a-b})
            }
      }

// selects the Patrol Boat locations  array
      if(option5 == 0){
                        for(var z = 0;  z < 2; z++){
                            if(dif5 > 5){
                                 arr6.push(letter5 + e++)
                            } else  {
                             arr6.push(letter5 + e--)
                            }
                        }
                        if(arr6.includes(letter5 + 0)){
                         arr6.pop(letter5 + 0)
                         arr6.push(letter5 + 2)
                        }

                            pBoat = arr6.sort(function(a, b){return a-b})
            } else {
                 for(var z = 0; z < 2; z++){
                     arr6.push(arr2[index5++] + e)
                     pBoat = arr6.sort(function(a, b){return a-b})
                  }
            }

    function deleteDuplicates(a){
        for(var i = a.length - 1; i >= 0; i--){
            if(a.indexOf(a[i]) !== i){
                a.splice(i, 1);
            }
        }
        return a;
    }

    function extractArray() {
        var args = Array.prototype.slice.call(arguments), arr7 = [];

        for (var i = 0; i < args.length; i++) {
            arr7 = deleteDuplicates(arr7.concat(args[i]));
        }

        return arr7;
    }

    var arr7 = extractArray(carrier, destroyer, submarine, battleship, pBoat);


    if(arr7.length == 17){
            console.log(carrier)
            console.log(battleship)
            console.log(submarine)
            console.log(destroyer)
            console.log(pBoat)
       let data = [
                     { "type": "Carrier", "locations": carrier },
                     { "type": "Battleship", "locations": battleship },
                     { "type": "Destroyer", "locations" : submarine},
                     { "type": "Submarine", "locations": destroyer },
                     { "type": "Patrol Boat", "locations": pBoat }
                      ]

           let  url = '/api/games/players/'+ myParam + '/ships'
           console.log(data);

           fetch(url, {
               method: "POST",
               credentials: "include",
               headers:{
                   'Accept': "application/json",
                   'Content-Type': "application/json"
               },

                body : JSON.stringify(data)

                })
                .then(function(response){
                   return response.json();
                })
                .then(function(json){
//                   location.reload();
                });
    }
}
//testShip()
//randomAdd()


//
//function randomAdd(){
// var array = testShip()
// console.log(array)
//}


