import React, { useState } from "react"
import "./DragIndicator.css"

interface DragIndicatorProps {
  isDraggable: boolean
  deviceName: string
}

const DragIndicator: React.FC<DragIndicatorProps> = ({
  isDraggable,
  deviceName,
}) => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isDraggable || !isVisible) return null

  return (
    <div className="drag-indicator" onClick={() => setIsVisible(false)}>
      <div className="drag-indicator-content">
        <span className="drag-icon">🚀</span>
        <p>
          <strong>{deviceName}</strong> можно перетаскивать!
        </p>
        <p className="drag-hint">
          Попробуйте перетащить маркер и посмотрите в консоль браузера
        </p>
        <button className="close-btn" onClick={() => setIsVisible(false)}>
          ✕
        </button>
      </div>
    </div>
  )
}

export default DragIndicator
