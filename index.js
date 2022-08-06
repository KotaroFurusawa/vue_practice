const URL_API = "https://api.zipaddress.net/";

const vm = new Vue({
    el: '#demo',
    data: {
        inputZip: '',
        defaultZip: '1000000',
        results: ''
    },
    /*
    filters: {
        filterZip: function (d) {
            let buf = (d + '0000000').slice(0, 7);
            return isNaN(buf) ? '半角数字で入力してください' : buf.toString()
        }
    }
    */
    //↑これはフィルターで、あくまでも表示用にデータを整える役割
    computed: {
        computedZip: function () {
            return !isNaN(this.inputZip) && this.inputZip.length == 7 ? this.inputZip : this.defaultZip
        }
    },
    //↑データそのものを使って複雑な計算を行ない、新しいデータを作る
    methods: {
        getAddress: function (z) {
            let params = { params: { zipcode: z } };
            axios
                .get(URL_API, params)
                .then(res => {
                    this.results = res.data.code == 200 ? res.data.data.fullAddress : res.data.message;
                });
            //.catch()で通信エラー時の処理、.finally()で成功・失敗時共通の最終処理を書く
        }
    }
    //↑APIを叩くときにはmethodsオプションを使う
});