import { MAIN_CONTAINER_WIDGET_ID } from "constants/WidgetConstants";
import React, { useMemo } from "react";
import styled from "styled-components";
import { theme } from "constants/DefaultTheme";
import { useCanvasDragging } from "utils/hooks/useCanvasDragging";

const StyledSelectionCanvas = styled.canvas<{ paddingBottom: number }>`
  position: absolute;
  top: 0px;
  left: 0px;
  height: calc(100% + ${(props) => props.paddingBottom}px);
  width: 100%;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  overflow-y: auto;
`;

export interface SelectedArenaDimensions {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface CanvasDraggingArenaProps {
  noPad?: boolean;
  snapColumnSpace: number;
  snapRows: number;
  snapRowSpace: number;
  widgetId: string;
}

export function CanvasDraggingArena({
  noPad,
  snapColumnSpace,
  snapRows,
  snapRowSpace,
  widgetId,
}: CanvasDraggingArenaProps) {
  const needsPadding = useMemo(() => {
    return widgetId === MAIN_CONTAINER_WIDGET_ID;
  }, [widgetId]);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { showCanvas } = useCanvasDragging(canvasRef, {
    noPad,
    snapColumnSpace,
    snapRows,
    snapRowSpace,
    widgetId,
  });
  return showCanvas ? (
    <StyledSelectionCanvas
      data-testid={`canvas-dragging-${widgetId}`}
      id={`canvas-dragging-${widgetId}`}
      paddingBottom={needsPadding ? theme.canvasBottomPadding : 0}
      ref={canvasRef}
    />
  ) : null;
}
CanvasDraggingArena.displayName = "CanvasDraggingArena";