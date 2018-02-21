const map = (map_id, data) => {
  /* global ymaps */
  // ==============  ==============
  const base_lat = '37.64';
  const base_long = '55.76';
  const behaviour = ['typeSelector', 'searchControl', 'fullscreenControl', 'geolocationControl', 'trafficControl', 'rulerControl'];

  let myMap; /* eslint no-unused-vars: 1 */
  // ===================================

  myMap = new ymaps.Map(map_id, { /* eslint prefer-const: 1 */
    center: [base_lat, base_long],
    zoom: 11,
  },
  {
    suppressMapOpenBlock: true,
  }
  );
  // ============== CONFIG ==============
  for (let b = 0; b < behaviour.length; b++) {
    myMap.controls.remove(behaviour[b]);
  }
  myMap.container.fitToViewport('always');
  // ===============================================
  const points = [];
  const collection = new ymaps.GeoObjectCollection();
  // ===============================================
  const BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
    '<div class="baloon_box">' +
        '<b>$[properties.name]</b><br />' +
        '<p>$[properties.address_name]</p>' +
        '<p> Подробнее: ' +
        '<a href="$[properties.url]" target="_blank">$[properties.url]</a></p>' +
    '</div>'
  );
  // ===============================================
  for (let i = 0; i < data.length; i++) {
    const {
      lat,
      lon,
    } = data[i].point;
    let url = '';
    if (
      data[i].contact_groups &&
      data[i].contact_groups[0] &&
      data[i].contact_groups[0].contacts[1] &&
      data[i].contact_groups[0].contacts[1].url
    ) {
      url = data[i].contact_groups[0].contacts[1].url;
    }

    points.push([lon, lat]);
    collection.add(new ymaps.Placemark(
      points[i],
      {
        name: data[i].name,
        address_name: data[i].address_name,
        url,
      },
      {
        balloonContentLayout: BalloonContentLayout,
      },
    ));
  }
  // ============= SIZE CHANGE LISTENER ================
  myMap.geoObjects.add(collection);
  myMap.setBounds(myMap.geoObjects.getBounds());
  myMap.events.add('sizechange', () => {
    myMap.setBounds(myMap.geoObjects.getBounds());
  });
  // ===============================================
};

export default map;
