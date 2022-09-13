import { type FC, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import { utils } from '@race-lap/app-helper';
import { apis } from '@race-lap/app-helper/dist/web';
import { readLocalFile } from '@/utils';
import './index.module.less';

const RecordDetailReviewAnalysis: FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { id, } = useParams<Record<'id' | 'type', string>>();
  useEffect(() => {
    if (!id) return;
    ;(async () => {
      const recordListRes = await apis.record.getList({ id: +id })
      const record = recordListRes.data?.[0];
      if (record) {
        const {data: pathInfo } = await apis.path.getInfo();
        if (pathInfo) {
          const filePath = `${pathInfo.recordRoot}/${record.fileId}`;
          const recordContentText = await readLocalFile(filePath);
          const { data } = utils.record.parseData(recordContentText);
          console.log('data -->', data)
          const map = new mapboxgl.Map({
            container: mapContainerRef.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-74.5, 40],
            zoom: 9,
          });
          map.on('style.load', () => {
            map.setFog({}); // Set the default atmosphere style
          });
        }
      }
    })();
  }, [id]);

  return (
    <div styleName="page-wrapper">
      <div styleName="map-wrapper" ref={mapContainerRef} />
    </div>
  );
};

export default RecordDetailReviewAnalysis;
