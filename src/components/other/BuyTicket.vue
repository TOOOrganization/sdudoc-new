<template>
  <q-page class="flex flex-center">

    <q-card class="my-card">
      <q-card-section>
        123123123
      </q-card-section>
    </q-card>

    <q-page-sticky position="top" class="bg-white text-grey-8">
      <q-toolbar class="full-width" style="padding: 0px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md full-width">
          <div class="row full-width q-mt-lg flex flex-center" style="min-width: 1200px">
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
      </q-toolbar>
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
  name: "BuyTicket",
  data () {
    return {
      name: null,
      age: null,
      accept: false,
      model: null,
      stringOptions,
      options: stringOptions,
      date: '09月23日',
      teal: false
    }
  },
  methods: {
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      }
      else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },
    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    },
    filterFn (val, update, abort) {
      // call abort() at any time if you can't retrieve data somehow

      setTimeout(() => {
        update(
          () => {
            if (val === '') {
              this.options = stringOptions
            }
            else {
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

    filterFnAutoselect (val, update, abort) {
      // call abort() at any time if you can't retrieve data somehow

      setTimeout(() => {
        update(
          () => {
            if (val === '') {
              this.options = stringOptions
            }
            else {
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
}
</style>
