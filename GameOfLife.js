class GameOfLife {

    CELL_SIZE = 20;
    DEAD_COLOR = `#181818`;
    ALIVE_COLOR = `#fff`;

    constructor() {
        this.cells_in_column = Math.floor(canvas.width / this.CELL_SIZE);
        this.cells_in_rows = Math.floor(canvas.height / this.CELL_SIZE);
        this.active_array = [];
        this.inactive_array = [];
    }

    //methods
    gameSetUp(){
        this.initArray();
        this.randomPatternForCells();
        this.fillColorOfCells();
        window.setInterval(() => {
            this.runGame();
        }, 500)
    };

    // create 2 2d arrays with zeros (active/inactive)
    initArray(){

        for (let i = 0; i < this.cells_in_rows; i++) {
            this.active_array[i] = [];
            for (let j = 0; j < this.cells_in_column; j++) {
                this.active_array[i][j] = 0;
            }
        }
        this.inactive_array = this.active_array;

    }
    
    //fill active array randomly with ones and zeros 
    randomPatternForCells(){
        for (let i = 0; i < this.cells_in_rows; i++) {
            for (let j = 0; j < this.cells_in_column; j++) {
                this.active_array[i][j] = (Math.random() > 0.5) ? 1 : 0;
            }
        }
    }

    //set color for cells
    fillColorOfCells () {

        for (let i = 0; i < this.cells_in_rows; i++) {
            for (let j = 0; j < this.cells_in_column; j++) {
                let color;
                if (this.active_array[i][j] == 1)
                    color = this.ALIVE_COLOR;
                else
                    color = this.DEAD_COLOR;
                ctx.fillStyle = color;
                ctx.fillRect(j * this.CELL_SIZE, i * this.CELL_SIZE, this.CELL_SIZE, this.CELL_SIZE);
            }
        }

    }

    //count neigbours

    countNeighbours(row, col) {
        let total_neighbours = 0;
        total_neighbours += this.setCellValueHelper(row - 1, col - 1);
        total_neighbours += this.setCellValueHelper(row - 1, col);
        total_neighbours += this.setCellValueHelper(row - 1, col + 1);
        total_neighbours += this.setCellValueHelper(row, col - 1);
        total_neighbours += this.setCellValueHelper(row, col + 1);
        total_neighbours += this.setCellValueHelper(row + 1, col - 1);
        total_neighbours += this.setCellValueHelper(row + 1, col);
        total_neighbours += this.setCellValueHelper(row + 1, col + 1);
        return total_neighbours;
    }

    //update generation

    updateCellValue (row, col) {

        const total = this.countNeighbours(row, col);
        // cell with more than 4 or less then 3 neighbours dies. 1 => 0; 0 => 0
        if (total > 4 || total < 3) {
            return 0;
        }
        // dead cell with 3 neighbours becomes alive. 0 => 1
        else if (this.active_array[row][col] === 0 && total === 3) {
            return 1;
        }
        // or returning its status back. 0 => 0; 1 => 1
        else {
            return this.active_array[row][col];
        }

    }

    updateLifeCycle() {

        for (let i = 0; i < this.cells_in_rows; i++) {
            for (let j = 0; j < this.cells_in_column; j++) {
                let new_state = this.updateCellValue(i, j);
                this.inactive_array[i][j] = new_state;
            }
        }
        this.active_array = this.inactive_array

    }

    setCellValueHelper (row, col) {
        try {
            return this.active_array[row][col];
        }
        catch {
            return 0;
        }
    } 

    runGame() {
        this.updateLifeCycle();
        this.fillColorOfCells();
    }

    // clear canvas
    stopGame() {
        for (let i = 0; i < this.cells_in_rows; i++) {
            for (let j = 0; j < this.cells_in_column; j++) {
                this.active_array[i][j] = 0;
            }
        }
    }

}
