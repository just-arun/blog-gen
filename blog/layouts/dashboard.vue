<template>
  <div id="components-layout-demo-custom-trigger" class="dashboard-layout">
    <a-layout-sider max-width="300px" class="side-bar hide-on-mobile sticky-top-left" theme="light" :trigger="null" collapsible v-model="collapsed">
      <div class="logo" />
      <a-menu class="cus-menu-height" mode="inline" :defaultSelectedKeys="[curentLink]">
        <a-menu-item v-for="(item) in navLinks" :key="item.link">
          <nuxt-link :to="item.link">
            <a-icon v-if="item.icon" :type="item.icon" />
            <a-icon v-if="!item.icon" :component="item.component" />
            <span>{{item.text}}</span>
          </nuxt-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <div class="main-container">
      <div style="background: #fff; padding: 0">
        <a-icon
          class="trigger hide-on-mobile"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
      </div>
      <div
        :style="{ margin: '0px 16px', padding: '8px 24px', background: '#fff', minHeight: '280px' }"
      > 
        <nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import Dashboard from '@/assets/icons/blog.svg'
export default {
  components: {
    Dashboard
  },
  data() {
    return {
      collapsed: true,
      curentLink: "",
      navLinks: [
        {
          text: "Dashboard",
					link: "/dashboard",
					icon: 'dashboard'
        },
        {
          text: "Posts",
          link: "/dashboard/posts",
					component: 'Dashboard'
        },
        {
          text: "profile",
          link: "/dashboard/profile",
					icon: 'user'
        }
      ]
    };
  },
  methods: {
    initFun() {
      this.curentLink = this.$route.path;
    }
  },
  created() {
    this.initFun();
  }
};
</script>
<style lang="scss">
@import "style/dashboard.scss";
</style>
