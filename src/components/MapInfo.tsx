import React from "react"
import "./MapInfo.css"

const MapInfo: React.FC = () => {
  return (
    <div className="map-info">
      <h3>🗺️ Инструкция</h3>
      <ul>
        <li>
          <strong>Клик</strong> на маркер - показать информацию
        </li>
        <li>
          <strong>Двойной клик</strong> - центрировать карту
        </li>
        <li>
          <strong>Перетащи</strong> фиолетовый маркер
        </li>
        <li>
          <strong>Наведи</strong> курсор для показа названия
        </li>
      </ul>
      <div className="legend">
        <h4>Легенда:</h4>
        <div className="legend-item">
          <span className="legend-marker basic-on"></span>
          <span>Basic (вкл)</span>
        </div>
        <div className="legend-item">
          <span className="legend-marker basic-off"></span>
          <span>Basic (выкл)</span>
        </div>
        <div className="legend-item">
          <span className="legend-marker advanced-on"></span>
          <span>Advanced (вкл)</span>
        </div>
        <div className="legend-item">
          <span className="legend-marker advanced-off"></span>
          <span>Advanced (выкл)</span>
        </div>
        <div className="legend-item">
          <span className="legend-marker special-on"></span>
          <span>Special (вкл)</span>
        </div>
        <div className="legend-item">
          <span className="legend-marker special-off"></span>
          <span>Special (выкл)</span>
        </div>
      </div>
    </div>
  )
}

export default MapInfo
