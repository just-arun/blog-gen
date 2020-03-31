<template>
  <div class="post-wrapper">
    <div class="post-container">
      <h1>{{postData.title}}</h1>
      <div>{{postData.createdAt}}</div>
      <pre v-highlightjs><code class="javascript">const s = new Date().toString()</code></pre>
      <div class="content" v-html="postData.body"></div>
    </div>
  </div>
</template>

<script>
import { GetRenderedPost } from "@/api/requests/post";
export default {
  async asyncData({ store, params }) {
    const data = await GetRenderedPost(params.slug);
    return { postData: data };
  },
  head() {
    return {
      title: `Tech Guide | ${this.postData.title}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.postData.description
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.postData.keywords
        }
      ]
    };
  }
};
</script>
<style lang="scss">
@import "./post-style.scss";
</style>