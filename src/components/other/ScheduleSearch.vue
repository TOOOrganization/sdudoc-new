<template>
  <q-page class="flex flex-center">

    <q-card class="my-card" v-if="first">
      <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
        <q-tab name="train" label="车次" />
        <q-tab name="station" label="车站" />
        <q-tab name="station2" label="站站" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="train">
          <q-form @submit="onSubmit" @reset="onReset">
            <q-input filled v-model="train" clearable fill-input label="车次" type="text"
                      :rules="[ val => val !== null && val.length > 0 || '请输入车次']"/>

            <q-input filled v-model="date" fill-input label="出发日期" class="q-mr-auto"
                     :rules="[ val => /^(0[1-9]|1[0-2])月(0[1-9]|[1-2][0-9]|3[0-1])日$/g.test(val) || '请输入正确的日期，例如：10月01日']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="date" minimal mask="MM[月]DD[日]" @input="() => $refs.qDateProxy.hide()" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <div class="q-mt-md">
              <q-btn color="primary" type="submit" class="full-width" label="查询时刻表" size="lg"/>
            </div>

          </q-form>
        </q-tab-panel>

        <q-tab-panel name="station">
          <q-form @submit="onSubmit" @reset="onReset">
            <q-select filled v-model="station_start" clearable use-input hide-selected fill-input input-debounce="0"
                      :rules="[ val => val !== null && val.length > 0 || '请选择车站']" type="text"
                      label="车站" :options="station_opts" @filter="filterFn" @filter-abort="abortFilterFn">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

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

            <q-btn color="primary" type="submit" class="full-width" label="查询时刻表" size="lg"/>

          </q-form>
        </q-tab-panel>

        <q-tab-panel name="station2">
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

            <q-btn color="primary" type="submit" class="full-width" label="查询时刻表" size="lg"/>

          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <q-card flat class="absolute-full" v-if="!first">
      <q-layout view="lhh LpR lff" container class="bg-grey-1">
        <q-header reveal class="bg-white text-grey-8">
          <q-toolbar class="full-width flex flex-center" style="padding: 0px">
            <div style="padding: 0px" class="flex flex-center q-mt-sm">

              <div style="padding: 0px; width: 1024px">
                <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
                  <q-tab name="train" label="车次" />
                  <q-tab name="station" label="车站" />
                  <q-tab name="station2" label="站站" />
                </q-tabs>
                <q-separator />
              </div>

              <q-tab-panels v-model="tab" animated style="padding: 0px; min-width: 1050px" class="bg-transparent">
                <q-tab-panel name="train" style="padding: 0px">
                  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md full-width">
                    <div class="row full-width flex flex-center q-pb-xs">
                      <div class="row q-mb-auto q-mt-md" style="padding: 0px">
                        <q-input filled v-model="train" clearable fill-input label="车次" type="text" class="q-mx-sm"
                                 :rules="[ val => val !== null && val.length > 0 || '请输入车次']" style="width:450px"/>
                      </div>

                      <q-input filled v-model="date" fill-input label="出发日期" class="q-mt-md q-mx-sm" style="width: 370px"
                               :rules="[ val => /^(0[1-9]|1[0-2])月(0[1-9]|[1-2][0-9]|3[0-1])日$/g.test(val) || '请输入正确的日期，例如：10月01日']">
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                              <q-date v-model="date" minimal mask="MM[月]DD[日]" @input="() => $refs.qDateProxy.hide()" />
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>

                      <div class="row q-mx-sm q-mb-lg q-mt-md q-pt-sm">
                        <q-btn color="primary" type="submit" label="查询时刻表" size="md" style="width: 150px"/>
                      </div>

                    </div>
                  </q-form>
                </q-tab-panel>

                <q-tab-panel name="station" style="padding: 0px">
                  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md full-width">
                    <div class="row full-width flex flex-center q-pb-xs">
                      <div class="row q-mb-auto q-mt-md" style="padding: 0px">
                        <q-select filled v-model="station_start" clearable use-input hide-selected fill-input input-debounce="0"
                                  :rules="[ val => val !== null && val.length > 0 || '请选择始发站']" type="text" class="q-mx-sm"
                                  label="车站" :options="station_opts" @filter="filterFn" @filter-abort="abortFilterFn" style="width: 450px">
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
                        <q-btn color="primary" type="submit" label="查询时刻表" size="md" style="width: 150px"/>
                      </div>

                    </div>
                  </q-form>
                </q-tab-panel>

                <q-tab-panel name="station2" style="padding: 0px">
                  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md full-width">
                    <div class="row full-width flex flex-center q-pb-xs">
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
                        <q-btn color="primary" type="submit" label="查询时刻表" size="md" style="width: 150px"/>
                      </div>

                    </div>
                  </q-form>
                </q-tab-panel>
              </q-tab-panels>

            </div>
          </q-toolbar>
        </q-header>

        <q-page-container>
          <q-page class="q-pa-none q-py-sm flex flex-center">

            <q-card flat bordered class="train-card q-my-sm" v-for="t_data in data" :key="t_data.tid">
              <div class="row q-pa-none">
                <q-item class="q-pa-md">{{ t_data.tid }}</q-item>
                <q-item class="q-pa-md">{{ t_data.start }} - {{ t_data.end }}</q-item>
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

  </q-page>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials = true;

export default {
  name: "ScheduleSearch",
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

      train: null,

      tab: 'train',

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
      data: []
    }
  },
  methods: {
    onSubmit () {
      let url = null, params = null;
      switch (this.tab){
        case "train":
          url = '/schedule/tid'
          params = { tid: this.train }
          break;
        case "station":
          url = '/schedule/station'
          params = { station: this.station_start }
          break;
        case "station2":
          url = '/schedule/station2'
          params = { station1: this.station_start, station2: this.station_end }
          break;
        default:
      }
      axios({
        // 默认请求方式为get
        method: 'get',
        url: url,
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
    onReset () {
      this.station_start = null;
      this.station_end = null;
      this.date = null;
      this.onlyHighSpeed = false;
      this.onlyStudent = false;
      this.train = null;
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
