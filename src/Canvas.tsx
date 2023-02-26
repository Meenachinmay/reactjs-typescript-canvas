import React, { useRef, useEffect, useState } from "react";

interface Square {
  x: number;
  y: number;
  width: number;
  height: number;
  dragging: boolean;
  color: string;
}

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [squares, setSquares] = useState<Square[]>([]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const mouseDownHandler = (event: MouseEvent) => {
        const { offsetX, offsetY } = event;
        const square = squares.find(
          (square) =>
            offsetX >= square.x &&
            offsetX <= square.x + square.width &&
            offsetY >= square.y &&
            offsetY <= square.y + square.height
        );
        if (square) {
          square.dragging = true;
        }
      };

      const mouseMoveHandler = (event: MouseEvent) => {
        const { offsetX, offsetY } = event;
        const draggingSquare = squares.find((square) => square.dragging);
        if (draggingSquare) {
          draggingSquare.x = offsetX - draggingSquare.width / 2;
          draggingSquare.y = offsetY - draggingSquare.height / 2;
          draw();
        }
      };

      const mouseUpHandler = () => {
        squares.forEach((square) => (square.dragging = false));
      };

      const draw = () => {
        ctx!.clearRect(0, 0, canvas.width, canvas.height);
        squares.forEach((square) => {    
          ctx!.fillRect(square.x, square.y, square.width, square.height);
        });
      };

      canvas.addEventListener("mousedown", mouseDownHandler);
      canvas.addEventListener("mousemove", mouseMoveHandler);
      canvas.addEventListener("mouseup", mouseUpHandler);

      setSquares([
        { x: 50, y: 50, width: 50, height: 50, dragging: false, color: "red" },
        { x: 150, y: 50, width: 50, height: 50, dragging: false, color: "blue" },
        { x: 250, y: 50, width: 50, height: 50, dragging: false, color: "green" },
        { x: 350, y: 50, width: 50, height: 50, dragging: false, color: "black" },
        { x: 450, y: 50, width: 50, height: 50, dragging: false, color: "orange" },
      ]);

      draw();
    }
  }, []);

  return <canvas ref={canvasRef} width={500} height={500} />;
};

export default Canvas;
