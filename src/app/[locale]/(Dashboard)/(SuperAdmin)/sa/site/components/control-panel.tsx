import * as React from 'react';
import type { LngLat } from 'react-map-gl';

const eventNames = ['onDragStart', 'onDrag', 'onDragEnd'];

function round5(value: number) {
  return (Math.round(value * 1e5) / 1e5).toFixed(5);
}

function ControlPanel(props: { events?: Record<string, LngLat> }) {
  return (
    <div className='control-panel'>
      {/* <h3>Draggable Marker</h3> */}
      {/* <p>Try dragging the marker to another location.</p> */}
      <div></div>
      <div className='source-link'>
        <div className='d-flex al-center'>
          <div className='circle1'></div>
          <p style={{ marginLeft: '5px' }}>Đốm nâu</p>
        </div>
        <div className='d-flex al-center'>
          <div className='circle2'></div>
          <p style={{ marginLeft: '5px' }}>Đạo ôn</p>
        </div>
        <div className='d-flex al-center'>
          <div className='circle3'></div>
          <p style={{ marginLeft: '5px' }}>Bạc lá</p>
        </div>
        <div className='d-flex al-center'>
          <div className='circle4'></div>
          <p style={{ marginLeft: '5px' }}>Vàng lá</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
