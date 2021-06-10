<template>
  <q-page class="flex flex-center">
    <q-card class="my-card">
      <q-card-section v-if="first">
        <q-form @submit="onSubmit" @reset="onReset">
          <div class="row" style="padding: 0px">

            <q-select filled v-model="station_start" clearable use-input hide-selected fill-input input-debounce="0"
                      :rules="[ val => val !== null && val.length > 0 || '请选择始发站']" type="text"
                      label="始发站" :options="station_opts" @filter="filterFn" @filter-abort="abortFilterFn" style="width: 200px">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-space></q-space>
            <div class="q-pt-sm q-mt-xs">
              <q-btn flat dense round icon="cached" aria-label="Menu" class="q-my-auto" @click="onExchange"/>
            </div>
            <q-space></q-space>

            <q-select filled v-model="station_end" clearable use-input hide-selected fill-input input-debounce="0"
                      :rules="[ val => val !== null && val.length > 0 || '请选择终到站']" type="text"
                      label="终到站" :options="station_opts" @filter="filterFn" @filter-abort="abortFilterFn" style="width: 200px">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>

          <div class="row q-mb-md" style="padding: 0px">
            <q-input filled v-model="date" fill-input label="出发日期" class="q-mr-auto" style="width:330px"
                     :rules="[ val => /^(0[1-9]|1[0-2])月(0[1-9]|[1-2][0-9]|3[0-1])日$/g.test(val) || '请输入正确的日期，例如：10月01日']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="date" minimal mask="MM[月]DD[日]" @input="() => $refs.qDateProxy.hide()" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <div class="q-mx-sm" style="padding: 0px; width: 120px">
              <q-checkbox v-model="onlyHighSpeed" label="只看高铁/动车" size="xs"/>
              <q-checkbox v-model="onlyStudent" label="只看学生票"  size="xs"/>
            </div>
          </div>

          <q-btn color="primary" type="submit" class="full-width" label="查询余票" size="lg"/>

        </q-form>
      </q-card-section>
    </q-card>

    <q-card flat class="absolute-full" v-if="!first">
      <q-layout view="lhh LpR lff" container class="bg-grey-1">
        <q-header reveal class="bg-white text-grey-8">
          <q-toolbar class="full-width" style="padding: 0px">
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md full-width">
              <div class="row full-width q-mt-lg flex flex-center" style="min-width: 1200px">
                <div class="row q-mb-auto q-mt-md" style="padding: 0px">

                  <q-select filled v-model="station_start" clearable use-input hide-selected fill-input input-debounce="0"
                            :rules="[ val => val !== null && val.length > 0 || '请选择始发站']" type="text" class="q-mx-sm"
                            label="始发站" :options="station_opts" @filter="filterFn" @filter-abort="abortFilterFn" style="width: 200px">
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>

                  <div class="q-pt-sm q-mt-xs">
                    <q-btn flat dense round icon="cached" aria-label="Menu" class="q-my-auto" @click="onExchange"/>
                  </div>

                  <q-select filled v-model="station_end" clearable use-input hide-selected fill-input input-debounce="0"
                            :rules="[ val => val !== null && val.length > 0 || '请选择终到站']" type="text" class="q-mx-sm"
                            label="终到站" :options="station_opts" @filter="filterFn" @filter-abort="abortFilterFn" style="width: 200px">
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>

                <q-input filled v-model="date" fill-input label="出发日期" class="q-mt-md q-ml-sm" style="width: 250px"
                         :rules="[ val => /^(0[1-9]|1[0-2])月(0[1-9]|[1-2][0-9]|3[0-1])日$/g.test(val) || '请输入正确的日期，例如：10月01日']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="date" minimal mask="MM[月]DD[日]" @input="() => $refs.qDateProxy.hide()" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

                <div class="q-mx-sm" style="padding: 0px; width: 120px">
                  <q-checkbox v-model="onlyHighSpeed" label="只看高铁/动车" size="xs"/>
                  <q-checkbox v-model="onlyStudent" label="只看学生票"  size="xs"/>
                </div>

                <div class="row q-mx-sm q-mb-lg q-mt-md q-pt-sm">
                  <q-btn color="primary" type="submit" label="查询余票" size="md" style="width: 150px"/>
                </div>

              </div>
            </q-form>
          </q-toolbar>
        </q-header>

        <q-page-container>
          <q-page class="q-pa-none q-py-sm flex flex-center">

            <q-card flat bordered class="train-card q-my-sm" v-for="t_data in data" :key="t_data.tid">
              <div class="row q-pa-none">
                <q-item class="q-pa-md">{{ t_data.tid }}</q-item>
                <q-item class="q-pa-md">{{ t_data.start }} - {{ t_data.end }}</q-item>
                <q-item class="q-pa-md">{{ t_data.s1 }}{{ t_data.time_a }}开</q-item>
                <q-item class="q-pa-md">{{ t_data.s2 }}{{ t_data.time_b }}到</q-item>
                <q-item class="q-pa-md">{{ Math.floor(t_data.time / 60) }}小时{{ t_data.time % 60 }}分钟</q-item>
                <q-item class="q-pa-md">商务：{{ t_data.ticket[0] }} 张</q-item>
                <q-item class="q-pa-md">一等：{{ t_data.ticket[1] }} 张</q-item>
                <q-item class="q-pa-md">二等：{{ t_data.ticket[2] }} 张</q-item>
                <q-space></q-space>
                <q-btn flat dense icon="add_shopping_cart" label="购买车票" class="q-my-auto q-mr-md"
                       @click="index = data.indexOf(t_data);show_dialog=true;onResetSe();"/>
              </div>
              <q-separator />
              <q-expansion-item icon="alarm" label="点击展开时刻表">
                <q-table dense flat hide-bottom :data="t_data.schedule" :columns="columns" row-key="name" :pagination.sync="pagination">
                  <template v-slot:top="props">
                    <div class="q-table__title row q-pa-none">
                      <q-item>{{ t_data.tid }}</q-item>
                      <q-item>{{ t_data.start }} - {{ t_data.end }}</q-item>
                    </div>
                    <q-space />
                    <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="props.toggleFullscreen" class="q-ml-md"/>
                  </template>
                </q-table>
              </q-expansion-item>
            </q-card>
          </q-page>

          <q-page-scroller position="bottom">
            <q-btn fab icon="keyboard_arrow_up" color="red" />
          </q-page-scroller>

        </q-page-container>

      </q-layout>
    </q-card>

    <q-dialog v-model="show_dialog">
      <q-card class="my-card">
        <q-card-section>
          <q-form @submit="onTicketSubmit" @reset="onResetSe">

            <q-select filled v-model="passenger" label="选择乘客" :options="passenger_opts"
                      :rules="[ val => val !== null && val.length > 0 || '请选择乘客']" type="text"
                       @filter="filterSe" @filter-abort="abortFilterFn">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-select filled v-model="seat" label="座位类型" :options="seat_opts"
                      :rules="[ val => val !== null && val.length > 0 || '请选择座位类型']" type="text"
                      @filter="filterNv" @filter-abort="abortFilterFn">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <div class="row" v-if="seat">
              <q-item>选座服务：</q-item>
              <q-option-group v-model="place" :options="place_opts[seat == null ? -1 : seat_opts.indexOf(seat)]" color="primary" inline class="q-mb-md"/>
              <q-space/>
              <div>
                <q-btn flat round dense icon="clear" @click="place='N'" class="q-my-auto q-mr-md"/>
              </div>
            </div>

            <q-select filled v-model="ticket" label="车票类型" :options="ticket_opts"
                      :rules="[ val => val !== null && val.length > 0 || '请选择乘客类型']" type="text"
                      @filter="filterSe" @filter-abort="abortFilterFn">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-btn color="primary" type="submit" class="full-width" :label="GetPrice()" size="lg"/>

          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  name: "BuyTicketSearch",
  data () {
    return {
      first: true,

      station_start: null,
      station_end: null,
      date: null,
      onlyHighSpeed: false,
      onlyStudent: false,

      station_opts: null,
      station_opts_tmp: null,

      pagination: {
        page: 1,
        rowsPerPage: "all",
        rowsNumber: 7
      },
      columns: [
        { name: 'time_b', label: '发时', field: 'time_b', align: "center"},
        { name: 'station', label: '停靠车站', field: 'station', align: "center"},
        { name: 'stop', label: '停留', field: 'stop', align: "center"},
        { name: 'time_a', label: '到时', field: 'time_a', align: "center"},
        { name: 'time', label: '历时', field: 'time', align: "center"},
      ],
      data: [],

      show_dialog: false,

      index: -1,
      passenger: null,
      seat: null,
      place: 'N',
      ticket: null,

      passenger_data: null,
      passenger_opts: null,
      seat_opts: ['商务座', '一等座', '二等座'],
      place_opts: [
        [
          {label: 'A', value: 'A'},
          {label: 'C', value: 'C'},
          {label: 'F', value: 'F'},
        ],[
          {label: 'A', value: 'A'},
          {label: 'C', value: 'C'},
          {label: 'D', value: 'D'},
          {label: 'F', value: 'F'},
        ],[
          {label: 'A', value: 'A'},
          {label: 'B', value: 'B'},
          {label: 'C', value: 'C'},
          {label: 'D', value: 'D'},
          {label: 'F', value: 'F'},
        ]
      ],
      ticket_opts: ['成人票', '儿童票', '学生票']
    }
  },
  mounted() {
    axios({
      // 默认请求方式为get
      method: 'get',
      url: '/login/token',
      // 传递参数
      params: {},
      // 设置请求头信息
      headers: {
        'content-type': "application/json"
      },
      responseType: 'json'
    }).then(response => {
      // 请求成功
      let res = response.data;
      console.log(res)
      switch (res.status){
        case 200:
          break;
        case 500:
          this.$q.notify({
            color : 'white',
            textColor : 'red-5',
            message : '登录失效，请先登录。',
            icon: 'warning',
            position : 'top'
          });
          this.$router.push('/login')
          break;
        default:
          this.$q.notify({
            color : 'white',
            textColor : 'red-5',
            message : '系统错误，请稍后尝试。',
            icon: 'warning',
            position : 'top'
          });
          this.$router.go(-1)
      }
    }).catch(error => {
      // 请求失败，
      console.log(error);
      this.$q.notify({
        color : 'white',
        textColor : 'red-5',
        message : '系统错误，请稍后尝试。',
        icon: 'warning',
        position : 'top'
      });
      this.$router.go(-1)
    });
  },
  methods: {
    GetPrice(){
      if(this.seat === null || this.ticket === null)
        return '请输入车票信息';
      let ticket_price= [0.5, 0.25, 0.4];
      let student_price = [0.5, 0.5, 0.4];
      let seat_price =[0.91, 0.49, 0.31];
      let seat_type = this.seat_opts.indexOf(this.seat);
      let type = this.ticket_opts.indexOf(this.ticket);
      let percent = seat_price[seat_type] * (type == 2 ? student_price[seat_type] : ticket_price[type]);
      return '支付' + Math.floor((this.index < 0 ? 0 : this.data[this.index].price) * percent) + '元'
    },
    onSubmit () {
      axios({
        // 默认请求方式为get
        method: 'get',
        url: '/schedule/buy',
        // 传递参数
        params: {
          station1: this.station_start,
          station2: this.station_end,
          date: this.date
        },
        // 设置请求头信息
        headers: {
          'content-type': "application/json"
        },
        responseType: 'json'
      }).then(response => {
        // 请求成功
        let res = response.data;
        console.log(res)
        switch (res.status){
          case 200:
            this.index = -1;
            this.data = res.data;
            this.first = false;
            break;
          default:
            this.$q.notify({
              color : 'white',
              textColor : 'red-5',
              message : '系统错误，请稍后尝试。',
              icon: 'warning',
              position : 'top'
            });
        }
      }).catch(error => {
        // 请求失败，
        console.log(error);
        this.$q.notify({
          color : 'white',
          textColor : 'red-5',
          message : '系统错误，请稍后尝试。',
          icon: 'warning',
          position : 'top'
        });
      });
    },
    onTicketSubmit () {
      let seat_type = this.seat_opts.indexOf(this.seat);
      let params = {
        tid: this.data[this.index].tid,
        date: this.data[this.index].date,
        pid: parseInt(this.passenger.substring(this.passenger.indexOf("#") + 1, this.passenger.length)),
        seat_type: seat_type,
        seat_select: [['N','A','C','F'],['N','A','C','D','F'],['N','A','B','C','D','F']][seat_type].indexOf(this.place),
        type: this.ticket_opts.indexOf(this.ticket),
        sid1: this.data[this.index].sid1,
        sid2: this.data[this.index].sid2
      }
      console.log(params);
      axios({
        // 默认请求方式为get
        method: 'get',
        url: '/ticket/buy',
        // 传递参数
        params: params,
        // 设置请求头信息
        headers: {
          'content-type': "application/json"
        },
        responseType: 'json'
      }).then(response => {
        // 请求成功
        let res = response.data;
        console.log(res)
        switch (res.status){
          case 200:
            this.$q.notify({
              color : 'white',
              textColor : 'black',
              message : '购买成功！',
              icon: 'add_shopping_cart',
              position : 'top'
            });
            this.show_dialog = false;
            break;
          case 501:
            this.$q.notify({
              color : 'white',
              textColor : 'red-5',
              message : '您选择的席别已售空。',
              icon: 'warning',
              position : 'top'
            });
            break;
          default:
            this.$q.notify({
              color : 'white',
              textColor : 'red-5',
              message : '系统错误，请稍后尝试。',
              icon: 'warning',
              position : 'top'
            });
        }
      }).catch(error => {
        // 请求失败，
        console.log(error);
        this.$q.notify({
          color : 'white',
          textColor : 'red-5',
          message : '系统错误，请稍后尝试。',
          icon: 'warning',
          position : 'top'
        });
      });
    },
    onReset () {
      this.station_start = null;
      this.station_end = null;
      this.date = null;
      this.onlyHighSpeed = false;
      this.onlyStudent = false;
    },
    onResetSe () {
      this.passenger = null;
      this.seat = null;
      this.place = 'N';
      this.ticket = null;
    },
    onExchange(){
      let temp = this.station_start;
      this.station_start = this.station_end;
      this.station_end = temp;
    },
    filterFn (val, update, abort) {
      if (this.station_opts_tmp !== null) {
        update(() => {
          const needle = val.toLowerCase()
          this.station_opts = this.station_opts_tmp.filter(v => v.toLowerCase().indexOf(needle) > -1)
        }, ref => {
          if (val !== '' && ref.options.length > 0 && ref.optionIndex === -1) {
            ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
            ref.toggleOption(ref.options[ref.optionIndex], true) // toggle the focused option
          }
        });
        return;
      }
      axios({
        // 默认请求方式为get
        method: 'get',
        url: 'station/list',
        // 传递参数
        params: {},
        // 设置请求头信息
        headers: {
          'content-type': "application/json"
        },
        responseType: 'json'
      }).then(response => {
        // 请求成功
        let res = response.data;
        console.log(res)
        switch (res.status){
          case 200:
            update(() => {
              this.station_opts_tmp = res.data;
              const needle = val.toLowerCase();
              this.station_opts = this.station_opts_tmp.filter(v => v.toLowerCase().indexOf(needle) > -1);
            });
            break;
          default:
            abort();
            this.$q.notify({
              color : 'white',
              textColor : 'red-5',
              message : '系统错误，请稍后尝试。',
              icon: 'warning',
              position : 'top'
            });
            break;
        }
      }).catch(error => {
        // 请求失败，
        abort();
        console.log(error);
      });
    },
    filterSe (val, update, abort) {
      if (this.passenger_opts !== null) {
        update(() => {

        }, ref => {
          if (val !== '' && ref.options.length > 0 && ref.optionIndex === -1) {
            ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
            ref.toggleOption(ref.options[ref.optionIndex], true) // toggle the focused option
          }
        });
        return;
      }
      axios({
        // 默认请求方式为get
        method: 'get',
        url: 'passenger/get',
        // 传递参数
        params: {},
        // 设置请求头信息
        headers: {
          'content-type': "application/json"
        },
        responseType: 'json'
      }).then(response => {
        // 请求成功
        let res = response.data;
        console.log(res)
        switch (res.status){
          case 200:
            update(() => {
              this.passenger_data = res.data;
              let temp = [];
              for(let passenger in res.data){
                temp.push(res.data[passenger].name + " #" + res.data[passenger].pid)
              }
              this.passenger_opts = temp;
            });
            break;
          default:
            abort();
            this.$q.notify({
              color : 'white',
              textColor : 'red-5',
              message : '系统错误，请稍后尝试。',
              icon: 'warning',
              position : 'top'
            });
            break;
        }
      }).catch(error => {
        // 请求失败，
        abort();
        console.log(error);
      });
    },
    filterNv (val, update, abort) {
      this.place = 'N';
      update(() => {

      }, ref => {
        if (val !== '' && ref.options.length > 0 && ref.optionIndex === -1) {
          ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
          ref.toggleOption(ref.options[ref.optionIndex], true) // toggle the focused option
        }
      });
      return;
    },
    abortFilterFn () {
      // console.log('delayed filter aborted')
    }
  }
}
</script>

<style scoped>
.my-card{
  width: 100%;
  max-width: 500px;
  height: auto;
  margin-top: -100px;
}
.train-card{
  width: 100%;
  max-width: 1024px;
}
</style>
