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