import React, { useRef, useEffect, useState } from "react";
import Square from "./Shapes/Square";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [squarePosition, setSquarePosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d")!;

    const sq = new Square();

    const drawSquare = () => {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      sq.createSquare(ctx, "blue", squarePosition.x, squarePosition.y, 50, 50);
      sq.createSquare(ctx, "red", squarePosition.x + 40, squarePosition.y + 40, 50, 50);
    };

    drawSquare();
  }, [squarePosition]);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (
      x >= squarePosition.x &&
      x <= squarePosition.x + 50 &&
      y >= squarePosition.y &&
      y <= squarePosition.y + 50
    ) {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      const canvas = canvasRef.current!;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left - 25;
      const y = event.clientY - rect.top - 25;
      setSquarePosition({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <>
      <div
        style={{
          border: "1px solid",
          borderRadius: "5px",
          maxWidth: "500px",
          maxHeight: "500px",
        }}
      >
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        ></canvas>
      </div>
    </>
  );
};

export default Canvas;
