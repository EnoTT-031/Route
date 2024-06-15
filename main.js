const canvas = document.getElementById("map1");
const ctx = canvas.getContext("2d");

const arrPoint = {
  // Кабинеты
  a102: { x: 560, y: 628 },
  a103: { x: 560, y: 605 },
  a104: { x: 560, y: 581 },
  a105: { x: 591, y: 491 },
  a106: { x: 591, y: 451 },
  a107: { x: 591, y: 404 },
  a108: { x: 591, y: 358 },
  a110: { x: 591, y: 308 },
  a109: { x: 591, y: 251 },
  a110a: { x: 591, y: 190 },
  a112: { x: 640, y: 58 },
  a113: { x: 577, y: 44 },
  a114: { x: 550, y: 123 },
  a115: { x: 502, y: 123 },
  a115a: { x: 454, y: 123 },
  a117: { x: 407, y: 123 },
  a118: { x: 359, y: 123 },
  a119: { x: 335, y: 123 },
  a120: { x: 311, y: 123 },
  a121: { x: 237, y: 154 },
  a122: { x: 288, y: 154 },
  a123: { x: 359, y: 154 },
  a12: { x: 407, y: 154 },
  a125: { x: 454, y: 154 },
  a126: { x: 502, y: 154 },
  a127: { x: 520, y: 495 },
  a128: { x: 480, y: 495 },
  a129: { x: 457, y: 495 },
  a130: { x: 373, y: 495 },
  a130a: { x: 423, y: 495 },
  a131: { x: 423, y: 526 },
  a131a: { x: 373, y: 526 },
  a132a: { x: 316, y: 526 },
  a132: { x: 339, y: 526 },
  a133: { x: 328, y: 495 },
  a135: { x: 263, y: 495 },
  a136: { x: 178, y: 495 },
  a137: { x: 113, y: 530 },
  a138: { x: 72, y: 548 },
  a139: { x: 88, y: 574 },
  a140: { x: 88, y: 530 },
  // Коридоры - перекрестки
  //   k11: { x: , y:  },
  //   k12: { x: , y:  },
  //   k13: { x: , y:  },
  //   k14: { x: , y:  },
  k15: { x: 577, y: 730 },
  k16: { x: 577, y: 673 },
  k17: { x: 577, y: 643 },
  k18: { x: 577, y: 628 },
  k19: { x: 577, y: 605 },
  k110: { x: 577, y: 581 },
  k111: { x: 577, y: 543 },
  k112: { x: 577, y: 491 },
  k113: { x: 577, y: 451 },
  k114: { x: 577, y: 404 },
  k115: { x: 577, y: 358 },
  k116: { x: 577, y: 308 },
  k117: { x: 577, y: 251 },
  k118: { x: 577, y: 190 },
  k119: { x: 577, y: 138 },
  k120: { x: 577, y: 58 },
  k121: { x: 620, y: 58 },
  k122: { x: 520, y: 510 },
  k123: { x: 480, y: 510 },
  k124: { x: 457, y: 510 },
  k125: { x: 423, y: 510 },
  k126: { x: 373, y: 510 },
  k127: { x: 339, y: 510 },
  k128: { x: 328, y: 510 },
  k129: { x: 316, y: 510 },
  k130: { x: 263, y: 518 },
  k131: { x: 178, y: 518 },
  k132: { x: 141, y: 518 },
  k133: { x: 141, y: 548 },
  k134: { x: 113, y: 548 },
  k135: { x: 88, y: 548 },
  k136: { x: 550, y: 138 },
  k137: { x: 526, y: 138 },
  k138: { x: 502, y: 138 },
  k139: { x: 454, y: 138 },
  k140: { x: 407, y: 138 },
  k141: { x: 359, y: 138 },
  k142: { x: 335, y: 138 },
  k143: { x: 311, y: 138 },
  k144: { x: 288, y: 138 },
  k145: { x: 237, y: 138 },
  k146: { x: 555, y: 511 },
  //  Лестницы - перекрестки
  //   l11: { x: , y:  },
  l21: { x: 555, y: 543 },
  //   l31: { x: , y:  },
  // Объекты
  s: { x: 642, y: 643 },
  g: { x: 560, y: 673 },
  tm: { x: 526, y: 154 },
  tw: { x: 550, y: 154 },
};

// TODO: Поиск кратчайшего пути во взвешенном графе

function dijkstra(graph, start, end) {
  const distances = {};
  const visited = new Set();
  const path = {};

  for (const key in graph) {
    if (key !== start) {
      distances[key] = Infinity;
    } else {
      distances[start] = 0;
    }
  }

  while (!visited.has(end)) {
    let lowestDistance = Infinity;
    let node = null;

    for (const key in distances) {
      if (lowestDistance > distances[key] && !visited.has(key)) {
        lowestDistance = distances[key];
        node = key;
      }
    }

    const neighbors = graph[node];
    for (const key in neighbors) {
      const newDistance = distances[node] + neighbors[key];
      if (newDistance < distances[key]) {
        distances[key] = newDistance;
        path[key] = node;
      }
    }

    visited.add(node);
  }

  const shortPath = [];
  let current = end;
  while (current !== start) {
    shortPath.unshift(current);
    current = path[current];
  }
  shortPath.unshift(start);

  return shortPath;
  conslo.log(shortPath);
}

// Взвешенный граф (указаны расстояние между точками)

const graph = {
  // Кабинеты
  a102: { k18: 1 },
  a103: { k19: 1 },
  a104: { k110: 1 },
  a105: { K112: 1 },
  a106: { k113: 1 },
  a107: { k114: 1, x: 591, y: 404 },
  a108: { k115: 1 },
  a110: { k116: 1 },
  a109: { k117: 1 },
  a110a: { k118: 1 },
  a113: { k120: 1 },
  a112: { k121: 1 },
  a114: { k136: 1 },
  a115: { k139: 1 },
  a115a: { k138: 1 },
  a117: { k140: 1 },
  a118: { k141: 1 },
  a119: { k142: 1 },
  a120: { k143: 1 },
  a121: { k145: 1 },
  a122: { k144: 1 },
  a123: { k141: 1 },
  a124: { k140: 1 },
  a125: { k139: 1 },
  a126: { k138: 1 },
  a127: { k122: 1 },
  a128: { k123: 1 },
  a129: { k124: 1 },
  a130: { k126: 1 },
  a130a: { k125: 1 },
  a131: { k125: 1 },
  a131a: { k126: 1 },
  a132a: { k129: 1 },
  a132: { k127: 1 },
  a133: { k128: 1 },
  a135: { k130: 1 },
  a136: { k131: 1 },
  a137: { k134: 1 },
  a138: { k135: 1 },
  a139: { k135: 1 },
  a140: { k135: 1 },
  // Коридоры - перекрестки
  k11: {},
  k12: {},
  k13: {},
  k14: {},
  k15: { l11: 1, k16: 1 },
  k16: { g: 1, k15: 1, k17: 1 },
  k17: { s: 1, k16: 1, k18: 1 },
  k18: { a102: 1, k17: 1, k19: 1 },
  k19: { a103: 1, k18: 1, k110: 1 },
  k110: { a104: 1, k19: 1, k111: 1 },
  k111: { l21: 1, k110: 1, k112: 1 },
  k112: { a105: 1, k111: 1, k113: 1 },
  k113: { a106: 1, k112: 1, k114: 1 },
  k114: { a107: 1, k113: 1, k115: 1 },
  k115: { a108: 1, k116: 1, k114: 1 },
  k116: { a110: 1, k115: 1, k117: 1 },
  k117: { a109: 1, k116: 1, k118: 1 },
  k118: { a110a: 1, k117: 1, k119: 1 },
  k119: { k118: 1, k120: 1, k136: 1 },
  k120: { a113: 1, k119: 1, k121: 1 },
  k121: { a112: 1, k120: 1 },
  k122: { a127: 1, k146: 1, k123: 1 },
  k123: { a128: 1, k122: 1, k124: 1 },
  k124: { a129: 1, k123: 1, k125: 1 },
  k125: { a130a: 1, k131: 1, k124: 1, k126: 1 },
  k126: { a130: 1, a131a: 1, k125: 1, k127: 1 },
  k127: { a132: 1, k126: 1, k128: 1 },
  k128: { a133: 1, k127: 1, k129: 1 },
  k129: { a132a: 1, k128: 1, k130: 1 },
  k130: { a135: 1, k129: 1, k131: 1 },
  k131: { a136: 1, k130: 1, k132: 1 },
  k132: { k131: 1, k133: 1 },
  k133: { k132: 1, k134: 1 },
  k134: { l31: 1, a137: 1, k133: 1, k135: 1 },
  k135: { a138: 1, a139: 1, a140: 1, k134: 1 },
  k136: { a114: 1, tw: 1, k119: 1, k137: 1 },
  k137: { tm: 1, k136: 1, k138: 1 },
  k138: { a126: 1, a115a: 1, k137: 1, k139: 1 },
  k139: { a115: 1, a125: 1, k138: 1, k140: 1 },
  k140: { a117: 1, a124: 1, k139: 1, k141: 1 },
  k141: { a118: 1, a123: 1, k140: 1, k142: 1 },
  k142: { a119: 1, k141: 1, k143: 1 },
  k143: { a120: 1, k142: 1, k144: 1 },
  k144: { a122: 1, k143: 1, k145: 1 },
  k145: { a121: 1, k144: 1 },
  k146: { l21: 1, k122: 1 },
  //  Лестницы - перекрестки
  l11: { k15: 1 },
  l21: { k111: 1, k146: 1 },
  l31: { k134: 1 },
  // Объекты
  s: { 7: 1 }, // столовая
  g: { 6: 1 }, // гардероб
  tm: { k137: 1 },
  tw: { k136: 1 },
};

console.log("cfq");

function routePlan() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var valueStart = document.getElementById("from").value;
  var valueEnd = document.getElementById("to").value;

  if (valueStart.length == 0 && valueEnd.length == 0) {
    console.log("notification-error-both");
  } else if (valueStart.length == 0) {
    console.log("notification-error-start");
  } else if (valueEnd.length == 0) {
    console.log("notification-error-end");
  } else if (valueStart == valueEnd) {
    console.log("notification-error-equal");
  } else if (
    graph.hasOwnProperty(valueStart) == false ||
    graph.hasOwnProperty(valueEnd) == false
  ) {
    console.log("notification-error-not-found");
  } else {
    const result = dijkstra(graph, valueStart, valueEnd);

    console.log("notification-done");
    console.log("Route =", result);

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";

    key = result[0];
    ctx.moveTo(arrPoint[key].x, arrPoint[key].y);

    for (let i = 1; i < result.length; i++) {
      key = result[i];
      ctx.lineTo(arrPoint[key].x, arrPoint[key].y);
    }

    ctx.stroke();
  }
}

// TODO: Отрисовка маршрута
const formInput = () => {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";

  ctx.moveTo(pointFrom, pointTo);

  for (let i = 1; i < pointFrom; i++) {
    ctx.lineTo(i * 10, i * 20);
  }

  ctx.stroke();
};

// !СМЕНА ЭТАЖЕЙ

// const floorChange = (floor) => {
//   let floor1 = document.getElementById("canvas1");
//   let floor2 = document.getElementById("canvas2");
//   let floor3 = document.getElementById("canvas3");
//   let floor4 = document.getElementById("canvas4");

//   if (floor == 1) {
//     console.log(floor);
//     floor1.style.display = "block";
//     floor2.style.display = "none";
//     floor3.style.display = "none";
//     floor4.style.display = "none";
//     console.log(1);
//   } else if (floor == 2) {
//     floor1.style.display = "none";
//     floor2.style.display = "block";
//     floor3.style.display = "none";
//     floor4.style.display = "none";
//     console.log(2);
//   } else if (floor == 3) {
//     floor1.style.display = "none";
//     floor2.style.display = "none";
//     floor3.style.display = "block";
//     floor4.style.display = "none";
//     console.log(3);
//   } else if (floor == 4) {
//     floor1.style.display = "none";
//     floor2.style.display = "none";
//     floor3.style.display = "none";
//     floor4.style.display = "block";
//     console.log(4);
//   }
// };
