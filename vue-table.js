Vue.component('dynamic-table', {

  // props: ['dataItems', 'filter'],

  props: {
    dataItems: Array,
    filter: String
  },
  template: '#dynamic-table',
  methods: {
    clickCell: function (row, column) {
      console.log(row + " " + column);
      if (this.oldValues[row] !== undefined) {

        if (this.oldValues[row][column] !== undefined) {
          row[column] = this.oldValues[row][column];
          delete this.oldValues[row][column];
          return ;

        }
      } 
      else{
        this.oldValues[row] ={};
      }
     this.oldValues[row][column] =   row[column] ;
     row[column] = "clicked";

    

      //row[column] = this.oldValues[row][column];
     // 


    },
    sortBy: function (column) {
      var self = this;

      if (this.sortOrder[column] === undefined) {
        this.sortOrder[column] = -1;
      }
      this.sortColumn = column;
      this.sortOrder[column] = this.sortOrder[column] * -1;
      this.dataItems.sort(function (a, b) {

        a = a[column];
        b = b[column];
        return (a === b ? 0 : a > b ? 1 : -1) * self.sortOrder[column];
      });
    }
  },
  data: function () {

    var firstRow = this.dataItems[0];
    var columns = [];
    var sortOrder = {};
    if (firstRow !== undefined) {
      for (column in firstRow) {

        columns.push(column);
      }
    }


    return { sortOrder: {}, columns: columns, sortColumn: '', oldValues: {} };
  }
  ,
  computed: {

    filtered: function () {
      var self = this;
      if (self.filter === '') {
        return this.dataItems;
      } else {
        return this.dataItems.filter(function (item) {

          for (prop in item) {
            if (item.hasOwnProperty(prop)) {
              var propValue = item[prop];
              var result = propValue.toString().indexOf(self.filter)
              if (result >= 0) return true;
            }

          }
          return false;
        });
      }
    }
  }

})