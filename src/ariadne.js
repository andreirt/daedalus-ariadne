class Ariadne
{
  constructor(maze, edge, canvas, wallColor, bgColor) {
    this.maze = maze;
    this.edge = edge;
    this.startMaze = 0;
    this.endMaze = 0;
    this.finished = false;
    this.wallColor = wallColor;
    this.bgColor = bgColor;
    this.context = canvas.getContext('2d');
  }
  
  start() {
    this.startMaze = 0;
    while (true) {
      this.endMaze = Math.floor(fxrand() * (this.maze.length - 1)) + 1;
      if (this.endMaze < Math.round(this.maze.length / 2))
        this.endMaze += Math.round(this.maze.length / 2);

      // check if it is a wall
      if ((this.maze.cells[this.endMaze] == 1) || (this.maze.cells[this.endMaze] == 2) || (this.maze.cells[this.endMaze] == 4) || (this.maze.cells[this.endMaze] == 8))
        break;
      else
        continue;
    }
  }
  
  nextStep() {
    let x, y, i;
    
    for (i = 1; i < this.endMaze; i++) {
      
      if ((this.maze.cells[i] == 1) || (this.maze.cells[i] == 2) || (this.maze.cells[i] == 4) || (this.maze.cells[i] == 8)) {
        x = i % this.maze.width;
        y = Math.floor(i / this.maze.width);
        
        if (this.maze.cells[i] == 1)
          this.maze.cells[ this.maze.getOffset(x, y - 1) ] &= 11;
        else if (this.maze.cells[i] == 2)
          this.maze.cells[ this.maze.getOffset(x + 1, y) ] &= 7;
        else if (this.maze.cells[i] == 4)
          this.maze.cells[ this.maze.getOffset(x, y + 1) ] &= 14;
        else if (this.maze.cells[i] == 8)
          this.maze.cells[ this.maze.getOffset(x - 1, y) ] &= 13;
          
        this.maze.cells[i] = 0;         
            
        this.eraseCell(x * 2, y * 2);
        this.eraseCell((x * 2) + 1, y * 2);
        this.eraseCell(x * 2, (y * 2) + 1);
        this.eraseCell((x * 2) + 1, (y * 2) + 1);
        
        return true;
      }
    }
    
    for (i = (this.endMaze + 1); i < this.maze.length; i++) {
      if ((this.maze.cells[i] == 1) || (this.maze.cells[i] == 2) || (this.maze.cells[i] == 4) || (this.maze.cells[i] == 8)) {
        x = i % this.maze.width;
        y = Math.floor(i / this.maze.width);
      
        if (this.maze.cells[i] == 1)
          this.maze.cells[ this.maze.getOffset(x, y - 1) ] &= 11;
        else if (this.maze.cells[i] == 2)
          this.maze.cells[ this.maze.getOffset(x + 1, y) ] &= 7;
        else if (this.maze.cells[i] == 4)
          this.maze.cells[ this.maze.getOffset(x, y + 1) ] &= 14;
        else if (this.maze.cells[i] == 8)
          this.maze.cells[ this.maze.getOffset(x - 1, y) ] &= 13;
        
        this.maze.cells[i] = 0;
            
        this.eraseCell(x * 2, y * 2);
        this.eraseCell((x * 2) + 1, y * 2);
        this.eraseCell(x * 2, (y * 2) + 1);
        this.eraseCell((x * 2) + 1, (y * 2) + 1);
	        
        return true;
      }
    }

    this.finished = true;
    return false;
  }
  
  eraseCell(x, y)
  {
    this.paintCell(x, y, this.bgColor);
  }
  
  paintCell(x, y, cellColor )
  {
    this.context.fillStyle = cellColor;
    this.context.fillRect( (((this.maze.width * 2) + 1) + x) * this.edge, y * this.edge, this.edge, this.edge);
  }
}

export default Ariadne;