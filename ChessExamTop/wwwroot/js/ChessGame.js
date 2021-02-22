function drawChess(map) {
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
            }
            if(map[i][j] == 'black_figure'){
                td.setAttribute('color','black')
                td.className = 'black';
                td.innerHTML = '<svg height="100" width="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" /></svg>';
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
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.body.appendChild(table);
}
function step(map){
    selectedChecker = document.getElementsByClassName('black_selected');
    selectedChecker = selectedChecker[0];
    // alert(selectedChecker.className);
    x = selectedChecker.getAttribute('x');
    y = selectedChecker.getAttribute('y');

    right_top = document.getElementById('cell-'+(Number(x)+1)+'-'+(Number(y)-1));
    right_bottom = document.getElementById('cell-'+(Number(x)+1)+'-'+(Number(y)+1));
    left_top = document.getElementById('cell-'+(Number(x)-1)+'-'+(Number(y)-1));
    left_bottom = document.getElementById('cell-'+(Number(x)-1)+'-'+(Number(y)+1));
    if((right_top != null) && (right_top.getAttribute('color') != selectedChecker.getAttribute('color'))){
        right_top.className = 'go';
    }
    if((left_top != null) && (left_top.getAttribute('color') != selectedChecker.getAttribute('color'))){
        left_top.className = 'go';
    }
    if((right_bottom != null) && (right_bottom.getAttribute('color') != selectedChecker.getAttribute('color'))){
        right_bottom.className = 'go';
    }
    if((left_bottom != null) && (left_bottom.getAttribute('color') != selectedChecker.getAttribute('color'))){
        left_bottom.className = 'go';
    }
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
let map = initiateMap();
// let selectedChecker = [];
drawChess(map);