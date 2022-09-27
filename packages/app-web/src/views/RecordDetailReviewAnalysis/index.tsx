import { type FC, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { chunk } from 'lodash';
import mapboxgl from 'mapbox-gl';
import { Slider } from 'antd-mobile';
import { Icon } from '@/components';
import { generateSpeedColorGradient, generateBrakingColorGradient, getCenter, getLineGeoJSON, type ColorGradientInfo } from './utils';
import { useInitMap, useGetData, usePreventDefault } from './hooks';
import './index.module.less';

const colorGradientGeneratorMap: Record<string, (list: [number, ...string[]][]) => ColorGradientInfo> = {
  '0': generateSpeedColorGradient,
  '1': generateSpeedColorGradient,
  '2': generateBrakingColorGradient,
  '3': generateBrakingColorGradient,
}

const SOURCE_LINE_ID = 'source-line';
const LAYER_LINE_ID = 'layer-line';
const SOURCE_RACETRACK_ID = 'source-racetrack';
const LAYER_RACETRACK_ID = 'layer-racetrack';

const RecordDetailReviewAnalysis: FC = () => {
  const mapSliderWrapperRef = usePreventDefault('touchmove');
  const { mapRef, mapContainerRef, loadPromise } = useInitMap();
  const { id, type, cycleNo } = useParams<Record<'id' | 'type' | 'cycleNo', string>>();
  const { data, racetrack } = useGetData(id, cycleNo);
  useEffect(() => {
    if (!data || !type || !racetrack) return;
    let currentMarkers: mapboxgl.Marker[] | null = null;
    ;(async () => {
      const locations = data.map(item => item.slice(1,3).reverse()) as [number, number][];
      await loadPromise;
      mapRef.current?.setCenter(getCenter(locations));
      mapRef.current?.setZoom(16);
      const { colorGradientData, markers } = colorGradientGeneratorMap[type](data);
      mapRef.current!.addSource(SOURCE_LINE_ID, {
        type: 'geojson',
        lineMetrics: true,
        data: getLineGeoJSON(locations)
      });
      mapRef.current!.addSource(SOURCE_RACETRACK_ID, {
        type: 'geojson',
        lineMetrics: true,
        data: getLineGeoJSON(chunk(racetrack, 2).map(location => location.reverse()))
      });

      mapRef.current!.addLayer({
        type: 'line',
        source: SOURCE_RACETRACK_ID,
        id: LAYER_RACETRACK_ID,
        paint: {
          'line-color': '#ff0000',
          'line-width': 2,
        },
      });
      // the layer must be of type 'line'
      mapRef.current!.addLayer({
        type: 'line',
        source: SOURCE_LINE_ID,
        id: LAYER_LINE_ID,
        paint: {
          // 'line-color': 'red',
          'line-width': 2,
          // 'line-gradient' must be specified using an expression
          // with the special 'line-progress' property
          'line-gradient': [
            'interpolate',
            ['linear'],
            ['line-progress'],
            ...colorGradientData
          ]
        },
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        }
      }, LAYER_RACETRACK_ID);

      if (['1', '3'].includes(type)) {
        markers.forEach(marker => {
          marker.addTo(mapRef.current!);
        });
        currentMarkers = markers;
      }
    })();

    return () => {
      mapRef.current!.removeLayer(LAYER_LINE_ID);
      mapRef.current!.removeLayer(LAYER_RACETRACK_ID);
      mapRef.current!.removeSource(SOURCE_LINE_ID);
      mapRef.current!.removeSource(SOURCE_RACETRACK_ID);
      currentMarkers?.forEach(marker => {
        marker.remove();
      });
    }
  }, [type, data, racetrack]);

  return (
    <div styleName="page-wrapper">
      <div styleName="map-wrapper" ref={mapContainerRef} />
      <div styleName="map-slider-wrapper" ref={mapSliderWrapperRef}>
        <Icon name='play-circle-fill' fontSize={24} color='#fff' />
        <Icon name='pause-circle-fill' fontSize={24} color='#fff' />
        <Slider
          styleName="map-slider"
          defaultValue={40}
          onAfterChange={(value) => {
            console.log('value --->', value)
          }}
          icon=" "
        />
      </div>
    </div>
  );
};

export default RecordDetailReviewAnalysis;
