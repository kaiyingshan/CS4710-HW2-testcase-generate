let row = 0;
let column = 0;
const el_arr = [];

let has_start = false;
let has_finish = false;

let start_loc = [0, 0];
let finish_loc = [0, 0];

function create() {
    row = document.getElementById("row-input").value;
    column = document.getElementById("column-input").value;

    if(row === 0 || column === 0 || !row || !column) {
        alert("Invalid row or column");
        return;
    }
    const tb = document.createElement("table");
    for(let i = 0; i < row; i++) {
        el_arr.push([]);
        const tb_row = document.createElement("tr");
        for(let j = 0; j < column; j++) {
            const tb_col = document.createElement("td");
            const el = document.createElement("div");
            el.style.width = "30px";
            el.style.height = "30px";
            el.style.borderStyle = "solid";
            el.style.textAlign = "center";
            el.id = `b${i}-${j}`;
            el.onclick = () => {click(i, j)};
            tb_col.appendChild(el);
            tb_row.appendChild(tb_col);
            el_arr[i].push("O");
        }
        tb.appendChild(tb_row);
    }
    document.getElementById("blocks").appendChild(tb);
    document.getElementById("create").hidden = true;
    document.getElementById("main").hidden = false;
}

function changeBlockType(type, x, y) {
    let color = "white";
    if(type === "start") color = "green"; 
    if(type === "finish") color = "red"; 
    if(type === "barrier") color = "#333333"; 
    const el = document.getElementById(`b${x}-${y}`);
    el.style.backgroundColor = color;
    if(type === "start") {
        el.innerHTML = "S";
    } else if (type == "finish") {
        el.innerHTML = "F";
    } else {
        el.innerHTML = "";
    }
}

function click(x, y) {
    const radios = document.getElementsByName("choice");
    if(radios[0].checked) {
        if(has_start) {
            const original_x = start_loc[0], original_y = start_loc[1];
            el_arr[original_x][original_y] = "O";
            changeBlockType("air", original_x, original_y);
        }
        start_loc[0] = x;
        start_loc[1] = y;
        el_arr[x][y] = "S";
        changeBlockType("start", x, y);
        has_start = true;
    } else if (radios[1].checked) {
        if (has_finish) {
            const original_x = finish_loc[0],
            original_y = finish_loc[1];
            el_arr[original_x][original_y] = "O";
            changeBlockType("air", original_x, original_y);
        }
        finish_loc[0] = x;
        finish_loc[1] = y;
        el_arr[x][y] = "F";
        changeBlockType("finish", x, y);
        has_finish = true;
    } else if (radios[2].checked) {
        changeBlockType("air", x, y);
        el_arr[x][y] = "O";

        if(x == start_loc[0] && y == start_loc[1]) {
            has_start = false;
        } else if (x == finish_loc[0] && y == finish_loc[1]) {
            has_finish = false;
        }
    } else if (radios[3].checked) {
        changeBlockType("barrier", x, y);
        el_arr[x][y] = "X";

        if (x == start_loc[0] && y == start_loc[1]) {
        has_start = false;
        } else if (x == finish_loc[0] && y == finish_loc[1]) {
        has_finish = false;
        }
    }
}

function download() {
    if(!has_start || !has_finish) {
        alert("You do not have a start or finish location assigned.");
        return;
    }

    let text = "";
    for(let i = 0; i < row; i++) {
        for(let j = 0; j < column; j++) {
            text += el_arr[i][j] 
            text += (j === column - 1) ? "" : " ";
        }
        text += (i === row - 1) ? "" : "\n";
    }
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    const filename = document.getElementById("filename").value;
    element.setAttribute("download", `${filename}.txt`);
    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
