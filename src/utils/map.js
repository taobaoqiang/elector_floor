
export class _AddIcon {
    constructor({
        width = 38,
        height = 49,
        uri = ""
    }) {
        this.uri = uri,
            this.width = width,
            this.height = height
    }
    createIcorn() {
        // 创建一个 icon
        console.log(this.uri)
        return new AMap.Icon({
            size: new AMap.Size(this.width, this.height),
            image: this.uri,
            imageSize: new AMap.Size(this.width, this.height),
          
          
        });
    }
}
/***
 * 
 * @argument  {
 * lng : Number , //经度
 * lat : Number   // 纬度
 * }
 * 
 * 
 *  */
export class _Maker {
    constructor ({lng,lat,icon}) {
        this.lng =lng;
        this.lat = lat;
        this.icon = icon
    }
     maker () {
            // 将 icon 传入 marker
            return new AMap.Marker({
                position: new AMap.LngLat(this.lng, this.lat),
                icon: this.icon,
                offset: new AMap.Pixel(-13, -30)
            });
    }

}
//海量点样式

export const _MapStyle = [
    {
        url: require('../static/icon/icon_map01.png'),
        anchor: new AMap.Pixel(38,49),
        size: new AMap.Size(38,49)
    },
    {
        url: require('../static/icon/icon_map02.png'),
        anchor: new AMap.Pixel(38,49),
        size: new AMap.Size(38,49)
    },
    {
        url: require('../static/icon/icon_map03.png'),
        anchor: new AMap.Pixel(38,49),
        size: new AMap.Size(38,49)
    },
    {
        url: require('../static/icon/icon_map04.png'),
        anchor: new AMap.Pixel(38,49),
        size: new AMap.Size(38,49)
    },
    {
        url: require('../static/icon/icon_map05.png'),
        anchor: new AMap.Pixel(38,49),
        size: new AMap.Size(38,49)
    },
]

// 创建海量点

export class _MoreMass {
    constructor ({data,map,style}){
        this.data = data
        this.map = map
        this.style = style
    } 
    create () {
        let mass = this.mass();
        let marker = this.maker()
       mass.setMap(this.map)
       mass.on('mouseover', function (e) {

        marker.setPosition(e.data.lnglat);
        marker.setLabel({content: e.data.name})
    });
        
    }
    mass() {
   

        return  new AMap.MassMarks(this.data, {
            opacity: 0.8,
            zIndex: 111,
            cursor: 'pointer',
            style: this.style
        });
    }
    maker() {
        return new AMap.Marker({content: ' ', map: this.map});
    }
} 
