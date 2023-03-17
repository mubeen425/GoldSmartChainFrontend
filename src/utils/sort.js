const sortArray = (arr, elem, type, order) => {
  if (order == "ASC") {
    if (type === "string") {
      return arr.sort(function (a, b) {
        let x = a[elem].toLowerCase();
        let y = b[elem].toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
    } else if (type == "num") {
      return arr.sort(function (a, b) {
        return a[elem] - b[elem];
      });
    } else if (type == "date") {
      return arr.sort(function (a, b) {
        return new Date(a[elem]) - new Date(b[elem]);
      });
    }
  } else if (order == "DESC") {
    if (type === "string") {
      return arr
        .sort(function (a, b) {
          let x = a[elem].toLowerCase();
          let y = b[elem].toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        })
        .reverse();
    } else if (type == "num") {
      return arr
        .sort(function (a, b) {
          return a[elem] - b[elem];
        })
        .reverse();
    } else if (type == "date") {
      return arr
        .sort(function (a, b) {
          return new Date(a[elem]) - new Date(b[elem]);
        })
        .reverse();
    }
  }
};
export default sortArray;
