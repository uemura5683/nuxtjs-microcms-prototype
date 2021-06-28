<template>
  <div id="news-detail-page">
    <main> 
      <div id="main_content">
        <div class="l-side">
          <l-menu />
        </div>
        <div class="news-detail-inner l-main">
          <figure :style="{ 'background-image': 'url(' + blogs.image.url + ')' }"></figure>
          <h2 class="c-post-info-title">{{ blogs.title }}</h2>
          <p class="c-post-content">{{blogs.date | moment('LTS')}}</p>
          <div class="dom-content" v-html="blogs.body"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import axios from 'axios';
  import LMenu from '~/components/layouts/menu';
  import moment from "moment";
  export default {
    head: {
      title: 'ビジネスブログ詳細 | フロントエンド うえむーのプロトタイプサイト | NU-Prototype',
      meta: [
        { hid: 'description', name: 'description', content: 'フロントエンド うえむーのプロトタイプサイトのビジネスブログ詳細ページです。' }
      ]
    },
    components: {
      LMenu
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
      return {
        blogs: data
      }
    }
  }
</script>

<style lang="scss">
  #news-detail-page {
    margin: 0 0 1rem;
    padding: 0 15px;
    .news-detail-inner {
      margin: 2rem auto 0;
      border: 1px solid #e5e5e5;
      padding: 2rem;
      box-sizing: border-box;
      .c-post-info-title,
      .c-post-content {
        font-size: 2.4rem;
        line-height: 1.6;
        margin: 0 0 1rem 20px;
        float: left;
        width: calc(50% - 20px);
      }
      .c-post-content {
        font-size: 1.8rem;
      }
      figure {
        padding: 25% 0 0;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        width: 50%;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
        margin: 0 0 1rem;
        float: left;
      }
      .dom-content {
        width: calc(100% - 4rem);
        border: 1px solid #e5e5e5;
        padding: 2rem;
        clear: both;
      }
    }
  }
  @media screen and (max-width: 767px) {
    #news-detail-page {
      .news-detail-inner {
        margin: 1rem auto 0;
        padding: 1rem;
        .c-post-info-title,
        .c-post-content {
          width: 100%;
          margin: 0 0 1rem;
          font-size: 1.4rem;
        }
        figure {
          width: 100%;
          padding: 70% 0 0;
        }
        .dom-content {
          padding: 1rem;
          width: calc(100% - 2rem);
        }
      }
    }
  }
</style>