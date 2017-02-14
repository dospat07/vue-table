Vue.component('vue-table', {

  // props: ['dataItems', 'filter'],

  props: {
    dataItems: Array,
    filter: String,
    pageSize:{
      type: String,
      default: Number.MAX_VALUE.toString()
    },
  },
  template: '#vue-table',
  methods: {
    clickCell: function (row, column) {
      console.log(row + " " + column);
     
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
    },
    nextPage:function(){
    
      this.page =  this.pageCount>=(this.page+1)?this.page+1:this.page=1;
    },

    prevPage:function(){
     
      this.page =  this.page<2?this.pageCount:this.page-1;
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

    var page = 1;
    return { sortOrder: {}, columns: columns, sortColumn: '',page:page };
  }
  ,
  computed: {

    pageCount:function(){
     
      return    Math.ceil(this.dataItems.length/this.pageSize);
    },
    filtered: function () {
      var self = this;
      if (self.filter === '') {
        return this.dataItems.slice((this.page-1)*this.pageSize,(this.page)*this.pageSize);
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