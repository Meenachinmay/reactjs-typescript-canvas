class Square {
  createSquare(context: CanvasRenderingContext2D, color: string, x:number, y: number, 
    width: number, height: number) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
  }
}

export default Square;
