import React, { useRef, useCallback } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet"
import L from "leaflet"
import type { IDevice } from "../types/device"
import devicesData from "../data/devices.json"
import MapInfo from "./MapInfo"
import DragIndicator from "./DragIndicator"
import "./DeviceMap.css"
import "leaflet/dist/leaflet.css"

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

const createCustomIcon = (
  model: string,
  status: string,
  isChild: boolean = false
) => {
  const size = isChild ? 20 : 30
  const colors = {
    basic: status === "on" ? "#4CAF50" : "#f44336",
    advanced: status === "on" ? "#2196F3" : "#FF9800",
    special: status === "on" ? "#9C27B0" : "#607D8B",
  }

  const color = colors[model as keyof typeof colors]

  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: ${isChild ? "8px" : "12px"};
      ">
        ${model === "basic" ? "B" : model === "advanced" ? "A" : "S"}
      </div>
    `,
    className: "custom-marker",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

interface DeviceMarkerProps {
  device: IDevice
  isDraggable?: boolean
  isChild?: boolean
}

const DeviceMarker: React.FC<DeviceMarkerProps> = ({
  device,
  isDraggable = false,
  isChild = false,
}) => {
  const map = useMap()
  const markerRef = useRef<L.Marker>(null)

  const handleDoubleClick = useCallback(() => {
    map.setView([device.lat, device.lon], 15)
  }, [map, device.lat, device.lon])

  const handleDragEnd = useCallback(() => {
    const marker = markerRef.current
    if (marker) {
      const position = marker.getLatLng()
      console.log(`Device ${device.name} moved to:`, {
        lat: position.lat,
        lon: position.lng,
      })
    }
  }, [device.name])

  return (
    <>
      {" "}
      <Marker
        ref={markerRef}
        position={[device.lat, device.lon]}
        icon={createCustomIcon(device.model, device.status, isChild)}
        draggable={isDraggable}
        eventHandlers={{
          dblclick: handleDoubleClick,
          dragend: handleDragEnd,
        }}
      >
        <Tooltip permanent={false} direction="top" offset={[0, -10]}>
          {device.name}
        </Tooltip>
        <Popup className="custom-popup">
          <div className="popup-content">
            <div className="popup-title">{device.name}</div>
            <div className="popup-field">
              <strong>ID:</strong> {device.id}
            </div>
            <div className="popup-field">
              <strong>Model:</strong> {device.model}
            </div>
            <div className="popup-field">
              <strong>Location:</strong> {device.lat.toFixed(6)},{" "}
              {device.lon.toFixed(6)}
            </div>
            {isDraggable && (
              <div className="popup-field">
                <strong>Draggable:</strong> Yes
              </div>
            )}
            <div className={`popup-status status-${device.status}`}>
              {device.status.toUpperCase()}
            </div>
          </div>
        </Popup>
      </Marker>
      {device.children &&
        device.children.map((child) => (
          <DeviceMarker key={child.id} device={child} isChild={true} />
        ))}
    </>
  )
}

const DeviceMap: React.FC = () => {
  const devices: IDevice[] = devicesData as IDevice[]
  const center: [number, number] = [55.751244, 37.618423]
  const draggableDevice = devices[4]

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <MapInfo />
      <DragIndicator
        isDraggable={true}
        deviceName={draggableDevice?.name || "Draggable Device"}
      />
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {devices.map((device, index) => (
          <DeviceMarker
            key={device.id}
            device={device}
            isDraggable={index === 4}
          />
        ))}
      </MapContainer>
    </div>
  )
}

export default DeviceMap
