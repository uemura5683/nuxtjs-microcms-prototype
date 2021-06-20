<template>
  <div id="news-detail-page" class="container">
    <main> 
      <div id="main_content" class="container">
        <div class="news-detail-inner">
          <h2 class="c-post-info-title">{{ blogs.title }}</h2>
          <p class="c-post-content">{{blogs.date | moment('LTS')}}</p>
          <figure :style="{ 'background-image': 'url(' + blogs.image.url + ')' }"></figure>
          <div class="dom-content" v-html="blogs.body"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import axios from 'axios';
  import moment from "moment";
  export default {
    head: {
      title: 'ビジネスブログ詳細 | フロントエンド うえむーのプロトタイプサイト | NU-Prototype',
      meta: [
        { hid: 'description', name: 'description', content: 'フロントエンド うえむーのプロトタイプサイトのビジネスブログ詳細ページです。' }
      ]
    },
    filters: {
        moment: function (date) {
            return moment(date).format('YYYY/MM/DD HH:mm');
        }
    },
    data: {
      posts: []
    },
    async asyncData({ params }) {
      const { data } = await axios.get(
        `https://nu-base-template.microcms.io/api/v1/blog/${params.id}`,
        {
          headers: { 'X-API-KEY': process.env.API_KEY }
        }
      )
      console.log(data);
      return {
        blogs: data
      }
    }
  }
</script>

<style lang="scss">
  #news-detail-page {
    margin: 0 0 1rem;
    .news-detail-inner {
      flex: 0 0 83.333333%;
      max-width: 83.333333%;
      margin: 0 auto;
      border: 1px solid #e5e5e5;
      padding: 2rem;
      .c-post-info-title {
        font-size: 2.4rem;
        margin: 0 0 1rem;
        float: left;
      }
      .c-post-content {
        clear: both;
        float: left;
      }
      figure {
        padding: 25% 0 0;
        background-repeat: no-repeat;
        width: 50%;
        border: 1px solid black;
        background-size: cover;
        margin: 0 0 1rem;
        float: right;
      }
      .dom-content {
        width: calc(100% - 4rem);
        border: 1px solid #666666;
        padding: 2rem;
        clear: both;
      }
    }
  }
</style>