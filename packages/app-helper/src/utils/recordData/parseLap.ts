// @ts-nocheck

import * as turf from '@turf/turf'
import { segmentsIntersect, IntersectPoint } from './gpsutils'

export function parseLap(dataList: any[][], finishData: any): any {

  let prevPoint = null; //prev point
  let prev_idx = 0;     //prev segmentsIntersect point idx in _sessionData
  let lastdatetime = 0; //prev  segmentsIntersect time mills()
  let tmplap = [];      //lap info
  let maxspeed = 0;
  let prevItem;         //prev segmentsIntersect item  endpoint
  let prevprevItem;     //prev segmentsIntersect item  startpoint
  let prev_intersectpoint;          //prev segmentsIntersect point startpoint-->endpoint intersect finishling

  dataList.forEach((pos, idx) => {
    if (prevPoint) {
      let isChecked = segmentsIntersect(parseFloat(pos[1]), parseFloat(pos[2]), parseFloat(prevPoint[1]), parseFloat(prevPoint[2]), finishData.lat1, finishData.lng1, finishData.lat2, finishData.lng2);
      if (isChecked) {
        let intersectP = IntersectPoint({ lat: +prevPoint[1], lng: +prevPoint[2] }, { lat: +pos[1], lng: +pos[2] }, { lat: +finishData.lat1, lng: +finishData.lng1 }, { lat: +finishData.lat2, lng: +finishData.lng2 })
        if (lastdatetime != 0) {
          // console.log("prev_cp", prev_intersectpoint, intersectP)
          var distance_point0 = turf.distance([prevprevItem[1], prevprevItem[2]], [prev_intersectpoint[1], prev_intersectpoint[0]], { units: 'kilometers' });
          var distance_point1 = turf.distance([prevPoint[1], prevPoint[2]], [intersectP[1], intersectP[0]], { units: 'kilometers' });
          let off0 = (distance_point0 / +prevprevItem[7]) * 60 * 60 * 1000;
          let off1 = (distance_point1 / +prevPoint[7]) * 60 * 60 * 1000;
          // console.log("distance", distance_point0, (+prevPoint[0] - lastdatetime), Math.round(off0), Math.round(off1), (+prevPoint[0] - lastdatetime) + Math.round(off1) - Math.round(off0));
          tmplap.push({ prv: prev_idx - 1, idx: idx - 1, timer: (+prevPoint[0] - lastdatetime) - Math.round(off0) + Math.round(off1), maxspeed, intersectP });
          maxspeed = 0;
        }
        lastdatetime = +prevPoint[0];
        prev_idx = idx;
        prevItem = pos;
        prevprevItem = prevPoint;
        prev_intersectpoint = intersectP;
      }
    }
    prevPoint = pos;
    if (+pos[7] > maxspeed) {
      maxspeed = +pos[7]
    }

  })

  return tmplap;
}
