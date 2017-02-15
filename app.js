var data = {
    items: [],
    filter: ''
}

for (let i = 0; i < 25; i++) {
    data.items.push({ id: i, text: Date.now(), name: 'Name' + i });
}

var vm = new Vue({
    el: '#demo',
    data: data,
    methods: {
        change: function () {

            for (let i = 0; i < this.items.length; i++) {

                this.items[i].text = Date.now()
            }
        }
    }
});