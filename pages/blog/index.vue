<template>
  <div id="news-list-page" class="container mt-4 p-0">
    <main>
      <div id="main_content">
        <div id="news-content-list" class="text-center">
            <h2 class="card-title">Blog</h2>
            <ul>
                <li class="c-card-extend" v-for="blog in blogs" :key="blog.id">
                    <figure>
                      <nuxt-link
                        :to="`/blog/${blog.id}`"
                        :style="{ 'background-image': 'url(' + blog.image.url + ')' }"
                        :alt="blog.title">>
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
<style lang="scss">
#news-list-page {
  #news-content-list {
    text-align: center;
    margin: 0 auto;
    ul {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
@media screen and (max-width: 767px) {
  #news-list-page {
    #news-content-list {
      width: 100%;
    }
  }
}
</style>