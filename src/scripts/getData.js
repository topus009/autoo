const request = function (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.onload = () => {
      if (this.status === 200) {
        resolve(JSON.parse(this.response));
      } else {
        const error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network Error'));
    };

    xhr.send();
  });
};


const getData = (q) => {
  const query = decodeURI(q);
  const url_2gis = `https://catalog.api.2gis.ru/3.0/items?viewpoint1=37.35008231542968%2C55.91881434876497&viewpoint2=37.889785684570306%2C55.58765878965614&page=1&page_size=12&q=${query}&region_id=32&type=street%2Cadm_div.city%2Cforeign_city%2Ccrossroad%2Croute%2Cbranch%2Cadm_div.settlement%2Cstation%2Cgate%2Cbuilding%2Cadm_div.district%2Croad%2Cadm_div.division%2Cadm_div.living_area%2Cattraction%2Cadm_div.place%2Cadm_div%2Cparking&fields=request_type%2Citems.adm_div%2Citems.attribute_groups%2Citems.contact_groups%2Citems.flags%2Citems.address%2Citems.rubrics%2Citems.name_ex%2Citems.point%2Citems.geometry.centroid%2Citems.region_id%2Citems.external_content%2Citems.org%2Citems.group%2Citems.schedule%2Citems.ads.options%2Citems.stat%2Citems.reviews%2Citems.purpose%2Csearch_type%2Ccontext_rubrics%2Csearch_attributes%2Cwidgets%2Cfilters&key=ruoedw9225`;
  return request(url_2gis);
};

export default getData;

