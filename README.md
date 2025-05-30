# React Leaflet Device Map

[gh-pages](https://kuzz0k.github.io/DeviceMap/)

Интерактивное приложение на React с использованием React Leaflet для отображения устройств на карте.

## 🚀 Функциональность

✅ **Все требования выполнены:**

- **Интерактивная карта** с использованием OpenStreetMap
- **Разные иконки для разных моделей устройств**:
  - `basic` - зеленый/красный круг с буквой "B"
  - `advanced` - синий/оранжевый круг с буквой "A"  
  - `special` - фиолетовый/серый круг с буквой "S"
- **Popup с информацией об устройстве** при клике на маркер (имя, модель, статус)
- **Дочерние устройства** отображаются как маленькие маркеры рядом с родительским
- **Двойной клик** на маркер центрирует карту и увеличивает зум
- **Перетаскиваемый маркер** (5-й девайс) с выводом новых координат в консоль
- **Тултипы** при наведении на маркеры
- **Интерактивные подсказки** и легенда
- **Анимированный индикатор** для демонстрации функции перетаскивания

## 🛠 Стек технологий

- React 18+
- TypeScript
- React Leaflet
- Leaflet
- Vite

## 📦 Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev
```

## 🗺️ Использование

1. Откройте http://localhost:5173 в браузере
2. Вы увидите карту Москвы с различными устройствами
3. **Клик на маркер** - откроется popup с информацией об устройстве
4. **Двойной клик на маркер** - карта сфокусируется на устройстве
5. **Перетащите фиолетовый маркер** "Draggable Sensor" - новые координаты выведутся в консоль браузера


## 🎯 Особенности реализации

- Цветовая схема маркеров зависит от модели и статуса устройства
- Статус "on" - более яркие цвета, "off" - приглушенные
- Дочерние устройства отображаются как маркеры меньшего размера
- Responsive дизайн для разных размеров экрана
- Анимации и плавные переходы для улучшения UX

## 🔧 Настройка

Для изменения данных об устройствах отредактируйте файл `src/data/devices.json`.

## 📝 Интерфейс IDevice

```typescript
export interface IDevice {
  id: string;
  name: string;
  lat: number;
  lon: number;
  model: "basic" | "advanced" | "special";
  status: "on" | "off";
  children?: IDevice[];
}
```
