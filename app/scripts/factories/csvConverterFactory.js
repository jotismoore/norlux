'use strict';

function jsonDataArray(r) {
  for (var n = r[0], o = [], a = 1, t = r.length; t > a; a++) {
    for (var e = r[a], l = {}, f = 0; f < e.length; f++) l[n[f]] = e[f];
    o.push(l)
  }
  return o
}

function CSVToArray(e, r) {
  r = r || ",";
  for (var n = new RegExp("(\\" + r + '|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\' + r + "\\r\\n]*))", "gi"), a = [
    []
  ], g = null; g = n.exec(e);) {
    var l = g[1];
    if (l.length && l != r && a.push([]), g[2]) var p = g[2].replace(new RegExp('""', "g"), '"');
    else var p = g[3];
    a[a.length - 1].push(p)
  }
  return jsonDataArray(a);
}

angular.module('norluxAngularApp')
  .factory('Products', ['$http', function($http){
    var Url   = "csv/products.csv";
    var Products = $http.get(Url).then(function(response){
      return CSVToArray(response.data);
    });
    return Products;
  }]);

// angular.module('norluxAngularApp')
//   .factory('Products', ['$http', function($http){
//     var Products = $http.get("php/products.php")
//       .then(function(data){
//         return data;
//       });
//     return jsonDataArray(Products);
//   }]);

angular.module('norluxAngularApp')
  .factory('Stores', ['$http', function($http){
    var Url   = "csv/stores.csv";
    var Stores = $http.get(Url).then(function(response){
      return CSVToArray(response.data);
    });
    return Stores;
  }]);
