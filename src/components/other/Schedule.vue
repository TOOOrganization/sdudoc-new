<template>
  <q-page class="flex flex-center">

    <q-card flat class="absolute-full">
      <q-layout view="lhh LpR lff" container class="bg-grey-1">
        <q-header reveal class="bg-white text-grey-8">
          <q-toolbar class="full-width flex flex-center" style="padding: 0px">
            <div style="padding: 0px" class="flex flex-center q-mt-sm">

              <div style="padding: 0px; width: 1024px">
                <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary"
                        align="justify" narrow-indicator>
                  <q-tab name="mails" label="车次" />
                  <q-tab name="alarms" label="车站" />
                  <q-tab name="movies" label="站站" />
                </q-tabs>
                <q-separator />
              </div>

              <q-tab-panels v-model="tab" animated style="padding: 0px; min-width: 1050px" class="bg-transparent">
                <q-tab-panel name="mails" style="padding: 0px">
                  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md full-width">
                    <div class="row full-width flex flex-center">
                      <div class="row q-mb-auto q-mt-md" style="padding: 0px">
                        <q-select filled v-model="model" clearable use-input hide-selected fill-input input-debounce="0"
                                  class="q-mx-sm" label="始发站" :options="options"
                                  @filter="filterFn" @filter-abort="abortFilterFn" style="width: 200px">
                          <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                No results
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>

                        <q-btn flat dense round icon="cached" aria-label="Menu" class="q-my-auto" @click="leftDrawerOpen = !leftDrawerOpen"/>

                        <q-select filled v-model="model" clearable use-input hide-selected fill-input input-debounce="0"
                                  class="q-mx-sm" label="终到站" :options="options"
                                  @filter="filterFn" @filter-abort="abortFilterFn" style="width: 200px">
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
                        <q-checkbox v-model="teal" label="只看高铁/动车" size="xs"/>
                        <q-checkbox v-model="teal" label="只看学生票"  size="xs"/>
                      </div>

                      <div class="row q-mx-sm q-mb-lg q-mt-md q-pt-sm">
                        <q-btn color="primary" label="查询余票" size="md" style="width: 150px"/>
                      </div>
                    </div>
                  </q-form>
                </q-tab-panel>

                <q-tab-panel name="alarms" style="padding: 0px">
                  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md full-width">
                    <div class="row full-width flex flex-center">
                      <div class="row q-mb-auto q-mt-md" style="padding: 0px">
                        <q-select filled v-model="model" clearable use-input hide-selected fill-input input-debounce="0"
                                  class="q-mx-sm" label="始发站" :options="options"
                                  @filter="filterFn" @filter-abort="abortFilterFn" style="width: 200px">
                          <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                No results
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>

                        <q-btn flat dense round icon="cached" aria-label="Menu" class="q-my-auto" @click="leftDrawerOpen = !leftDrawerOpen"/>

                        <q-select filled v-model="model" clearable use-input hide-selected fill-input input-debounce="0"
                                  class="q-mx-sm" label="终到站" :options="options"
                                  @filter="filterFn" @filter-abort="abortFilterFn" style="width: 200px">
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
                        <q-checkbox v-model="teal" label="只看高铁/动车" size="xs"/>
                        <q-checkbox v-model="teal" label="只看学生票"  size="xs"/>
                      </div>

                      <div class="row q-mx-sm q-mb-lg q-mt-md q-pt-sm">
                        <q-btn color="primary" label="查询余票" size="md" style="width: 150px"/>
                      </div>
                    </div>
                  </q-form>
                </q-tab-panel>

                <q-tab-panel name="movies" style="padding: 0px">
                  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md full-width">
                    <div class="row full-width flex flex-center">
                      <div class="row q-mb-auto q-mt-md" style="padding: 0px">
                        <q-select filled v-model="model" clearable use-input hide-selected fill-input input-debounce="0"
                                  class="q-mx-sm" label="始发站" :options="options"
                                  @filter="filterFn" @filter-abort="abortFilterFn" style="width: 200px">
                          <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                No results
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>

                        <q-btn flat dense round icon="cached" aria-label="Menu" class="q-my-auto" @click="leftDrawerOpen = !leftDrawerOpen"/>

                        <q-select filled v-model="model" clearable use-input hide-selected fill-input input-debounce="0"
                                  class="q-mx-sm" label="终到站" :options="options"
                                  @filter="filterFn" @filter-abort="abortFilterFn" style="width: 200px">
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
                        <q-checkbox v-model="teal" label="只看高铁/动车" size="xs"/>
                        <q-checkbox v-model="teal" label="只看学生票"  size="xs"/>
                      </div>

                      <div class="row q-mx-sm q-mb-lg q-mt-md q-pt-sm">
                        <q-btn color="primary" label="查询余票" size="md" style="width: 150px"/>
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

            <q-card flat bordered class="my-card q-my-sm" v-for="n in 10" :key="n">
              <q-item class="q-pa-md">
                G40
              </q-item>
              <q-expansion-item icon="alarm" label="点击展开时刻表">
                <q-table dense flat hide-bottom :data="data" :columns="columns" row-key="name" :pagination.sync="pagination">
                  <template v-slot:top="props">
                    <div class="col-2 q-table__title">G40</div>

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

    <q-page-sticky position="top" class="bg-white text-grey-8 hidden">

    </q-page-sticky>

  </q-page>
</template>

<script>
const stringOptions = [
  '北京', '北京西', 'Twitter', 'Apple', 'Oracle'
].reduce((acc, opt) => {
  for (let i = 1; i <= 5; i++) {
    acc.push(opt + ' ' + i)
  }
  return acc
}, [])

export default {
  name: "Schedule",
  data () {
    return {
      name: null,
      age: null,
      accept: false,
      model: null,
      stringOptions,
      options: stringOptions,
      date: '09月23日',
      teal: false,
      tab: 'mails',
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
      data: [
        {station: '千岛湖', time_a: "17:37", time_b: "17:37", stop: "始发站", time: "-"},
        {station: '建德', time_a: "17:48", time_b: "17:50", stop: "2分", time: "11分"},
        {station: '桐庐', time_a: "18:04", time_b: "18:06", stop: "2分", time: "27分"},
        {station: '富阳', time_a: "18:20", time_b: "18:22", stop: "2分", time: "43分"},
        {station: '杭州东', time_a: "18:45", time_b: "19:00", stop: "15分", time: "1时8分"},
        {station: '南京南', time_a: "20:04", time_b: "20:06", stop: "2分", time: "2时27分"},
        {station: '北京南', time_a: "23:23", time_b: "23:23", stop: "终点站", time: "5时46分"},
      ]
    }
  },
  methods: {
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },
    onReset() {
      this.name = null
      this.age = null
      this.accept = false
    },
    filterFn(val, update, abort) {
      // call abort() at any time if you can't retrieve data somehow

      setTimeout(() => {
        update(
          () => {
            if (val === '') {
              this.options = stringOptions
            } else {
              const needle = val.toLowerCase()
              this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
            }
          },

          // next function is available in Quasar v1.7.4+;
          // "ref" is the Vue reference to the QSelect
          ref => {
            if (val !== '' && ref.options.length > 0) {
              ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
              ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
            }
          }
        )
      }, 300)
    },

    filterFnAutoselect(val, update, abort) {
      // call abort() at any time if you can't retrieve data somehow

      setTimeout(() => {
        update(
          () => {
            if (val === '') {
              this.options = stringOptions
            } else {
              const needle = val.toLowerCase()
              this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
            }
          },

          // next function is available in Quasar v1.7.4+;
          // "ref" is the Vue reference to the QSelect
          ref => {
            if (val !== '' && ref.options.length > 0 && ref.optionIndex === -1) {
              ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
              ref.toggleOption(ref.options[ref.optionIndex], true) // toggle the focused option
            }
          }
        )
      }, 300)
    },

    abortFilterFn() {
      // console.log('delayed filter aborted')
    }
  }
}
</script>

<style scoped>
.my-card{
  width: 100%;
  max-width: 1024px;
}
</style>
