<template>
  <div>
    <div class="page-container-heder">
        <nuxt-link to="/dashboard/posts/"><a-button shape="circle" icon="arrow-left" /></nuxt-link>
      <a-popconfirm placement="rightTop" okText="Save & Exit" cancelText="Cancel" @confirm="goBack">
        <template slot="title">
          <p>are you sure to leave the post without saving</p>
        </template>
      </a-popconfirm>
      <div class="spacer"></div>
    </div>
    <CreatePost
      type="create"
      @submit="submitHandle"
    />
  </div>
</template>
<script>
import CreatePost from "@/components/posts/create-post/create-post";
import httpCall from '@/mixins/httpRequest';
export default {
  layout: "dashboard",
  components: {
    CreatePost
  },
  mixins: [httpCall],
  data() {
    return {
      buttonWidth: 70,
      text: "Are you sure to delete this task?",
      key: ["asdfadsf", "adsfadsfadsf"]
    };
  },
  methods: {
    goBack() {
      this.$router.push("/dashboard/posts/");
    },
    savePost() {
      this.$message.success("This is a success message");
    },
    submitHandle(data) {
      console.log({data});
      this.HttpServerRequest('POST', "/post-update", data)
      .then(res => {
        console.log(res);
        this.$router.push("/dashboard/posts/")
      })
      .catch(err => {
        console.log({err});
      })
    }
  }
};
</script>
<style scoped lang="scss">
.page-container-heder {
  display: flex;
  padding: 10px;
  position: sticky;
  top: 0px;
  .spacer {
    flex: 1;
  }
}
#components-a-popconfirm-demo-placement .ant-btn {
  width: 70px;
  text-align: center;
  padding: 0;
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>