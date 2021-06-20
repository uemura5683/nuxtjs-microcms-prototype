<template>
  <div id="news-list-page" class="container mt-4 p-0">
    <main>
      <div id="main_content" class="container d-block d-md-flex mt-4 p-0">
        <div class="main_content col-md-10 p-0">
          <div id="news-content-list">
            <div class="news_content_inner text-center">
              <h2 class="card-title">Blog</h2>
              <ul>
                  <li class="c-card-extend" v-for="blog in blogs" :key="blog.id">
                    <nuxt-link :to="`/blog/${blog.id}`">
                      <figure><img :src="blog.image.url"></figure>
                      <p class="c-post-content">
                        <span class="c-post-info-date">{{blog.date | moment('LTS')}}</span>
                        <span class="c-post-info-title">{{blog.title}}</span>
                      </p>
                    </nuxt-link>                    
                  </li>
              </ul>
            </div>
          </div>
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
      title: 'ビジネスブログ一覧 | フロントエンド うえむーのブログサイト | NU-Blog(エヌ・ユーブログ)',
      meta: [
        { hid: 'description', name: 'description', content: 'フロントエンドエンジニアのうえむーのブログサイトのビジネスブログ一覧ページです。' }
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
        `https://nu-base-template.microcms.io/api/v1/blog`,
        {
          headers: { 'X-API-KEY': process.env.API_KEY }
        }
      )
      console.log(data);
      return {
        blogs: data.contents
      }
    }
  }
</script>