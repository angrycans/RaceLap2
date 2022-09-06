import { type FC, useRef } from 'react';
import { useMount } from 'ahooks';
import { Input } from 'antd-mobile';
import { LocationFill } from 'antd-mobile-icons'
// import mapboxgl from 'mapbox-gl';
// import createBrowserClient from '@mapbox/mapbox-sdk/lib/browser/browser-client';
// import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import { getAMap } from '@/utils';
import './index.module.less';

const NewRacetrack: FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useMount(async () => {
    const AMap = await getAMap();
    const geolocation = new AMap.Geolocation({
      enableHighAccuracy: true,//是否使用高精度定位，默认:true
      timeout: 10000,          //超过10秒后停止定位，默认：无穷大
      maximumAge: 0,           //定位结果缓存0毫秒，默认：0
      convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
      showButton: true,        //显示定位按钮，默认：true
      buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
      buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
      showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
      panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
      zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    });

    const map = new AMap.Map(mapContainerRef.current!, {
      zoom: 11,
      // center: [longitude, latitude],
      viewMode: '3D'
    });

    map.addControl(geolocation)
    geolocation.getCurrentPosition(function(status, result) {
      console.log(status, result)
    });
  })

  return (
    <div styleName="page-wrapper">
      <div styleName="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default NewRacetrack;
