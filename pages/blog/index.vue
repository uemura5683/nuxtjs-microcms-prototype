<template>
  <div id="news-list-page">
    <main>
      <div id="main_content">
        <div id="news-content-list" class="text-center">
            <h2 class="card-title"><span>Blog</span></h2>
            <ul class="c-card-wrap">
                <li class="c-card-extend" v-for="blog in blogs" :key="blog.id">
                    <figure>
                      <nuxt-link
                        :to="`/blog/${blog.id}`"
                        :style="{ 'background-image': 'url(' + blog.image.url + ')' }"
                        :alt="blog.title">
                      </nuxt-link>
                    </figure>
                    <p class="c-post-content">
                      <span class="c-post-info-date">{{blog.date | moment('LTS')}}</span>
                      <span class="c-post-info-title">{{blog.title}}</span>
                    </p>
                </li>
            </ul>
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
      return {
        blogs: data.contents
      }
    }
  }
</script>