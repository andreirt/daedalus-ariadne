class Daedalus
{
    constructor(maze, x, y, edge, canvas, wallColor, bgColor) {
        this.maze = maze;
        this.x = x;
        this.y = y;
        this.edge = edge;
        this.step = 1;
        this.finished = false
        this.wallColor = wallColor;
        this.bgColor = bgColor;
        this.context = canvas.getContext('2d');

        this.paintCell( 1, 1, this.wallColor );
    }
  
    drawStep() {
    
        let cell = this.maze.order[ this.step ];
        let x = cell % this.maze.width;
        let y = Math.floor(cell / this.maze.width);
        
        if ((this.maze.completeCells[ this.maze.getOffset(x, y) ] & 1) != 0) {
            this.paintCell( x * 2, y * 2, this.bgColor );
            this.paintCell( (x * 2) + 1, y * 2, this.wallColor );
        }
        else {
            this.paintCell( x * 2, y * 2, this.bgColor );
            this.paintCell( (x * 2) + 1, y * 2, this.bgColor );
        }
        
        if ((this.maze.completeCells[ this.maze.getOffset(x, y) ] & 8) != 0) {
            this.paintCell( x * 2, (y * 2) + 1, this.wallColor);
            this.paintCell( (x * 2) + 1, (y * 2) + 1, this.wallColor);
        }
        else {
            this.paintCell( x*2, (y*2) + 1, this.bgColor);
            this.paintCell( (x*2)+1, (y*2)+1, this.wallColor);
        }
        
        ++this.step;
        
        this.finished = !(this.step < (this.maze.order.length));
    }
  
    draw() {
        for (let i = 0; i < this.maze.height; i++) {
            for (let j = 0; j < this.maze.width; j++) {
                if ((this.maze.completeCells[ this.maze.getOffset(j, i) ] & 1) != 0) {
                    this.paintCell( (j*2)+1, i*2, this.wallColor);
                }
        
                if ((this.maze.completeCells[ this.maze.getOffset(j, i) ] & 8) != 0) {
                    this.paintCell(j*2,     (i*2)+1, this.wallColor);
                    this.paintCell((j*2)+1, (i*2)+1, this.wallColor);
                }
                else {
                    this.paintCell((j*2)+1, (i*2)+1, this.wallColor);
                }
            }
        }
    }
  
    paintCell( x, y, cellColor )
    {
        this.context.fillStyle = cellColor;
        this.context.fillRect((x * this.edge) + this.x, (y * this.edge) + this.y, this.edge, this.edge);
    }
}

export default Daedalus;