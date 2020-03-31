<template>
  <div>
    <div class="head-part">
      <h1>posts</h1>
      <div style="flex: 1;"></div>
      <nuxt-link to="/dashboard/posts/create">
        <a-button>Create Post</a-button>
      </nuxt-link>
    </div>
    <section class="post-section">
      <div class="custom-card" v-for="(item, i) in posts" :key="i">
        <div class="img-container">
          <img
            src="https://www.microsoft.com/security/blog/wp-content/uploads/2020/03/Ann-Johnson-post-BANNER-1152x600.png"
            alt
          />
        </div>
        <h2>{{item.title}}</h2>
        <div class="meta-data">
          <div class="date">{{dateFormate(item.createdAt)}}</div>
          <div style="flex: 1"></div>
          <div>
            <a-icon type="like" />
            <nuxt-link :to="`/post/${item.slug}`">
              <a-icon type="eye" />
            </nuxt-link>
            <a-icon type="edit" />
          </div>
        </div>
        <p>{{item.description}}</p>
        <div>
          <a-tag v-for="(tmm,j ) in item.keywords" :key="j">{{tmm}}</a-tag>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import httpRequest from "@/mixins/httpRequest";
import { GetAllUserPosts } from "@/api/requests/post";
import moment from "moment";

export default {
  async asyncData() {
    const posts = await GetAllUserPosts();
    console.log({ posts });
    return { posts };
  },
  layout: "dashboard",
  mixins: [httpRequest],
  methods: {
    updatePost() {
      this.HttpServerRequest("PUT", "/post-update", { title: "sdfdsf" })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    dateFormate(date) {
      return moment(date).format("MMM DD, YYYY");
    }
  },
  created() {}
};
</script>
<style scoped lang="scss">
.head-part {
  display: flex;
  width: 100%;
  align-items: center;
}
.meta-data {
  .date {
    font-size: 10px;
  }
  color: rgba(109, 109, 109, 0.5);
  display: flex;
}
.post-section {
  display: flex;
  flex-wrap: wrap;
  .custom-card {
    padding: 10px;
    background: #fff;
    margin: 8px;
    box-shadow: 1px 1px 10px 0 rgba(128, 128, 128, 0.445);
    // cursor: pointer;
    transition: 0.3s;
    border-radius: 10px;
    max-width: 350px;
    box-sizing: border-box;
    .img-container {
      position: relative;
      width: 100%;
      transition: 0.3s;
      overflow: hidden;
      border-radius: 10px;
      img {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        transition: 0.6s;
        transform: scale(1.2);
      }
    }
    &:hover {
      box-shadow: 1px 1px 3px 0 rgba(128, 128, 128, 0.445);
      border-radius: 5px;
      img {
        transform: scale(1);
      }
    }
    p {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: grey;
    }
  }
}
</style>