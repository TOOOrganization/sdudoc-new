<template>
  <div>
    <v-navigation-drawer permanent id="navigation">
      <v-card
        class="mx-auto"
        width="300"
      >
        <v-list>
          <v-list-group
            prepend-icon="mdi-account-circle"
            :value="true"
            disabled
          >
            <template v-slot:activator>
              <v-list-item-title>用户</v-list-item-title>
            </template>

            <v-list-group
              no-action
              sub-group
              :value="true"
              disabled
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>账号</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="([title, icon], i) in user"
                :key="i"
                link
                @click="keydown(title)"
              >
                <v-list-item-title v-text="title"></v-list-item-title>

                <v-list-item-icon>
                  <v-icon v-text="icon"></v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-group>

            <v-list-group
              no-action
              sub-group
              :value="true"
              disabled
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>钱包</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="([title, icon], i) in money"
                :key="i"
                link
                @click="keydown(title)"
              >
                <v-list-item-title v-text="title"></v-list-item-title>

                <v-list-item-icon>
                  <v-icon v-text="icon"></v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-group>
          </v-list-group>


          <v-list-group
            prepend-icon="mdi-account-circle"
            :value="true"
            disabled
          >
            <template v-slot:activator>
              <v-list-item-title>账号资料</v-list-item-title>
            </template>

            <v-list-group
              no-action
              sub-group
              :value="true"
              disabled
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>文献</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="([title, icon], i) in document"
                :key="i"
                link
                @click="keydown(title)"
              >
                <v-list-item-title v-text="title"></v-list-item-title>

                <v-list-item-icon>
                  <v-icon v-text="icon"></v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-group>

          </v-list-group>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script>
import store from '../../store/index'
export default {
  name: "navigation",
  data: () => ({
    user: [
      ['账号信息', 'mdi-account-multiple-outline'],
      ['修改密码', 'mdi-cog-outline'],
    ],
    money: [
      ['余额', 'mdi-cash-usd-outline'],
      ['充值', 'mdi-plus-outline'],
    ],
    document: [
      ['已购买', ' mdi-bell-check'],
      ['待购买', ' mdi-bell-alert'],
    ],
    count: 1
  }),
  methods: {
    keydown(title){
      store.state.list_title = title
    }
  }
}
</script>

<style scoped>
#navigation{
  margin-top: 60px;
}
</style>
