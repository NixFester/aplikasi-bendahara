function numberWithCommas(x) {
    return "Rp. " + x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function groupByMonth(data) {
    return data.reduce((acc, doc) => {
      const date = new Date(doc.waktu.seconds * 1000);
      const monthYear = date.toLocaleString('id-ID', { month: 'long', year: 'numeric' });
  
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(doc);
      return acc;
    }, {});
}

function sortBy(arr, f) {
    let newArr = arr.map((o, i) => [].concat(f.call(o, o, i), o));
  
    newArr.sort(function (a, b) {
      for (let i = 0, len = a.length; i < len; ++i) {
        if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1;
      }
      return 0;
    });
  
    return newArr.map(item => item[item.length - 1]);
}

export {numberWithCommas, groupByMonth,sortBy}