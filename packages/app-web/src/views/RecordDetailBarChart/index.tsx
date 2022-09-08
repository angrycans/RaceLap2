import { type FC, useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { useParams } from 'react-router-dom';
import { utils } from '@race-lap/app-helper';
import { apis } from '@race-lap/app-helper/dist/web';
import { readLocalFile } from '@/utils';
import './index.module.less';

const RecordDetailBarChart: FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { id } = useParams<Record<'id', string>>();
  useEffect(() => {
    if (!id) return;
    const instance = echarts.init(mapContainerRef.current!);
    ;(async () => {
      instance.showLoading();
      const recordListRes = await apis.record.getList({ id: +id })
      const record = recordListRes.data?.[0];
      if (record) {
        const {data: pathInfo } = await apis.path.getInfo();
        if (pathInfo) {
          const filePath = `${pathInfo.recordRoot}/${record.fileId}`;
          const recordContentText = await readLocalFile(filePath);
          const { cycles } = utils.record.parseData(recordContentText);
          const originStime = cycles[0].timer;
          const dataList = cycles.map(cycle => ({
            delta: cycle.timer - originStime,
            deltaText: utils.timeStampFormat(cycle.timer - originStime, 'hh:mm:ss.SS', {
              autoClearZero: true,
            }),
            sTime: cycle.timer,
            sTimeText: utils.timeStampFormat(cycle.timer, 'hh:mm:ss.SS', {
              autoClearZero: true,
            })
          }));
          instance.setOption({
            grid: {
              left: 8,
              right: 8,
              top: 20,
              bottom: 28,
            },
            xAxis: {
              data: dataList.map((item, idx) => ({
                value: idx,
                textStyle: {
                  color: item.delta > 0 ? '#FF9500' : '#000'
                }
              })),
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                fontWeight: 500,
                lineHeight: 16,
                color: '#000',
              }
            },
            yAxis: {
              axisLabel: {
                show: false
              },
            },
            color: '#E5E5EA',
            series: [
              {
                stack: 'a',
                type: 'bar',
                data: dataList.map(item => ({
                  value: item.sTime,
                  label: {
                    show: !!item.delta,
                    formatter: () => `${item.delta > 0 ? '+' : '-'}${item.deltaText}`,
                    color: item.delta > 0 ? '#FF3B30' : '#34C759',
                  }
                })),
                emphasis: {
                  disabled: true,
                },
                label: {
                  show: true,
                  fontWeight: 500,
                  lineHeight: 16,
                  color: '#FF3B30',
                  formatter({ dataIndex }: { dataIndex: number }) {
                    return utils.timeStampFormat(dataIndex * 1000, 'hh:mm:ss.SS', { autoClearZero: true });
                  }
                },
                itemStyle: {
                  borderRadius: [4, 4, 4, 4]
                }
              },
              {
                stack: 'a',
                type: 'bar',
                data: dataList.map(item => ({
                  value: 0,
                  label: {
                    formatter: () => item.sTimeText,
                    color: item.delta > 0 ? '#FF9500' : '#000'
                  }
                })),
                emphasis: {
                  disabled: true,
                },
                label: {
                  show: true,
                  position: 'top',
                  fontWeight: 500,
                  lineHeight: 16,
                  color: '#000',
                  // formatter({ value }: { value: number }) {
                  //   return utils.timeStampFormat(value, 'hh:mm:ss.SS', { autoClearZero: true });
                  // }
                },
              },
            ]
          });
        }
      }
      instance.hideLoading();
    })();
    return () => instance.dispose();
  }, [id]);

  return (
    <div styleName="page-wrapper">
      <div styleName="chart-container" ref={mapContainerRef} />
    </div>
  );
};

export default RecordDetailBarChart;
