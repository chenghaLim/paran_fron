// naver.d.ts
declare global {
    interface Window {
      naver: any;
    }
  
    namespace naver {
      namespace maps {
        class Map {
          constructor(element: string | HTMLElement, options: any);
          getBounds(): any;
        }
  
        class LatLng {
          constructor(lat: number, lng: number);
        }
  
        class Marker {
          constructor(options: any);
          getPosition(): LatLng;
          setMap(map: Map | null): void;
          getMap(): Map | null;
        }
  
        class InfoWindow {
          constructor(options: any);
          open(map: Map, marker: Marker): void;
          close(): void;
        }
  
        class Point {
          constructor(x: number, y: number);
        }
  
        class TransCoord {
          static fromTM128ToLatLng(tm128: Point): LatLng;
        }
  
        class Event {
          static addListener(instance: any, eventName: string, handler: () => void): void;
        }
      }
    }
  }
  
  export {};
  