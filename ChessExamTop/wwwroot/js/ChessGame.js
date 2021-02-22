function drawChess() {
    myNode = document.getElementsByClassName('main-block');
    myNode = myNode[0];
    if(myNode != null) {
        while (myNode.lastElementChild) {
            myNode.removeChild(myNode.lastElementChild);
        }
    }
    let table = document.querySelector(".main-block");
    for (let i = 1; i < 9; i++) {
        let tr = document.createElement('tr');
        for (let j = 1; j < 9; j++) {
            let td = document.createElement('td');
            td.setAttribute('id', 'cell-' + j+ '-' + i);
            td.setAttribute('x', j);
            td.setAttribute('y', i);
            if(map[i][j] == 'white'){
                td.className = 'white';
            }
            if(map[i][j] == 'black'){
                td.className = 'black';
            }
            if(map[i][j] == 'white_figure'){
                td.setAttribute('color','white')
                td.className = 'black';
                td.innerHTML = '<svg height="100" width="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="white" /></svg>';
                if(turn == 'white'){
                    td.addEventListener('click', function(){
                        let selected = document.getElementsByClassName('black_selected');
                        selected = selected[0];
                        if(selected != null){
                            selected.className = 'black';   
                        }
                        let go = document.getElementsByClassName('go');
                        length = go.length;
                        for(let t = length - 1; t >= 0; --t){
                            go[t].className = 'black';
                        }
                        this.className = 'black_selected';
                        step(map);
                    });
                }
            }
            if(map[i][j] == 'black_figure'){
                td.setAttribute('color','black')
                td.className = 'black';
                td.innerHTML = '<svg height="100" width="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" /></svg>';
                if(turn == 'black'){
                    td.addEventListener('click', function(){
                        let selected = document.getElementsByClassName('black_selected');
                        selected = selected[0];
                        if(selected != null){
                            selected.className = 'black';   
                        }
                        let go = document.getElementsByClassName('go');
                        length = go.length;
                        for(let t = length - 1; t >= 0; --t){
                            go[t].className = 'black';
                        }
                        this.className = 'black_selected';
                        step(map);
                    });
                }
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.body.appendChild(table);
}
function makeStep(x,y,x_step,y_step,x_max,y_max,selectedChecker,bottom){
    enemy_color = selectedChecker.getAttribute('color') != 'black' ? 'black' : 'white';
    one = document.getElementById('cell-'+x_step+'-'+y_step);
    one_shot = document.getElementById('cell-'+x_max+'-'+y_max);
    if((one != null) && (one.getAttribute('color') != selectedChecker.getAttribute('color'))){
        if((enemy_color == one.getAttribute('color'))&& (one_shot != null)  &&(one.getAttribute('color') != selectedChecker.getAttribute('color'))){
            let r_color = one_shot.getAttribute('color');
            if(r_color == null){
                one_shot.className = 'kill';
                one_shot.addEventListener('click',function(){
                    map[y_max][x_max] = map[y][x];
                    map[y_step][x_step] = 'black';
                    map[y][x] = 'black';
                    turn = turn != 'black' ? 'black' : 'white';
                    drawChess()
            });
            }
        } else {
            let top = turn == 'black' ? y > y_step : y < y_step;
            if((one.getAttribute('color') != enemy_color)&& (top)){
                one.className = 'go';
                one.addEventListener('click',function(){
                    map[y_step][x_step] = map[y][x];
                    map[y][x] = 'black';
                    turn = turn != 'black' ? 'black' : 'white';
                    drawChess();
                });
            }
        }
    }
}
function step(map){
    selectedChecker = document.getElementsByClassName('black_selected');
    selectedChecker = selectedChecker[0];
    x = selectedChecker.getAttribute('x');
    y = selectedChecker.getAttribute('y');
    makeStep(Number(x), Number(y),Number(x)+1, Number(y)-1, Number(x)+2, Number(y)-2,selectedChecker,0);
    makeStep(Number(x), Number(y),Number(x)+1, Number(y)+1, Number(x)+2, Number(y)+2,selectedChecker,1);
    makeStep(Number(x), Number(y),Number(x)-1, Number(y)-1, Number(x)-2, Number(y)-2,selectedChecker,0);
    makeStep(Number(x), Number(y),Number(x)-1, Number(y)+1, Number(x)-2, Number(y)+2,selectedChecker,1);
}
function initiateMap(){
    let map = [];
    for(let i = 1; i < 9; ++i)
    {
        map[i] = [];
        for (let j = 1; j < 9; j++) {
            if (i % 2 == j % 2) {
                map[i][j] = 'white';
            } else {
                if((i == 1)|| (i == 2) || (i == 3)){
                    map[i][j] = 'white_figure';
                }else{
                    if ((i == 6) || (i == 7) || (i == 8)){
                        map[i][j] = 'black_figure';
                    }else{
                        map[i][j] = 'black';
                    }
                }
            }
        }
    }
    return map;
}
let turn = 'white';
let map = initiateMap();
// let selectedChecker = [];
drawChess(map);