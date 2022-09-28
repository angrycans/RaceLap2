import { TouchEventHandler, useEffect, useMemo, useRef, useState, } from 'react';
import mapboxgl from 'mapbox-gl';
import { apis } from '@race-lap/app-helper/dist/web';
import { utils } from '@race-lap/app-helper';
import { type RecordDataInfo } from '@race-lap/app-helper/dist/utils/record';
import { eventBus, readLocalFile } from '@/utils';

const MAP_LOAD_EVENT_NAME = 'EVENT_NAME:MAP_LOAD';

const loadPromise = new Promise<void>(resolve => {
  const eventHandle = () => {
    eventBus.off(MAP_LOAD_EVENT_NAME, eventHandle);
    resolve();
  }
  eventBus.on(MAP_LOAD_EVENT_NAME, eventHandle);
});

/**
 * 初始化地图
 */
export function useInitMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/light-v10',
      attributionControl: false,
    });

    mapRef.current.once('load', () => eventBus.emit(MAP_LOAD_EVENT_NAME));
  }, []);

  return {
    mapContainerRef,
    mapRef,
    loadPromise
  }
}

/**
 * 根据 id 获取 data
 * @param id
 * @param mapRef
 */
export function useGetData(id?: string, cycleNo?: string) {
  const [dataInfo, setDataInfo] = useState<RecordDataInfo | null>(null);

  useEffect(() => {
    if (!id) return;
    ; (async () => {
      const recordListRes = await apis.record.getList({ id: +id })
      const record = recordListRes.data?.[0];
      if (record) {
        const { data: pathInfo } = await apis.path.getInfo();
        if (pathInfo) {
          const filePath = `${pathInfo.recordRoot}/${record.fileId}`;
          const recordContentText = await readLocalFile(filePath);
          setDataInfo(utils.record.parseData(recordContentText));
        }
      }
    })();
  }, [id]);

  return useMemo(() => {
    const currentCycle = dataInfo?.cycles?.[+cycleNo! - 1];
    return {
      data: dataInfo && currentCycle && dataInfo.data.slice(currentCycle.prv, currentCycle.idx + 1),
      racetrack: dataInfo?.racetracks?.[dataInfo?.racetracks.length - 1]
    }
  }, [dataInfo, cycleNo])
}

/**
 * 阻止指定节点的默认事件行为
 * @param eventName 事件名称
 */
export function usePreventDefault<EventName extends keyof HTMLElementEventMap>(eventName: EventName) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) throw new Error(`Mssing Element Node !`);
    const eventHandle = (ev: HTMLElementEventMap[EventName]) => {
      ev.preventDefault();
    }

    elementRef.current.addEventListener(eventName, eventHandle, { passive: false });

    return () => {
      elementRef.current?.removeEventListener(eventName, eventHandle);
    }
  }, [eventName]);

  // 很神奇 HTMLElement HTMLDivElement 竟然不兼容
  return elementRef as  React.RefObject<any>;
}
