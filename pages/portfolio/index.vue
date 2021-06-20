<template>
  <div id="news-list-page" class="container">
    <main>
      <div id="main_content">
        <div class="main_content">
          <div id="news-content-list">
            <div class="news_content_inner text-center">
              <h2 class="card-title">Portfolio</h2>
              <ul>
                  <li class="c-card-extend" v-for="portfolio in portfolios" :key="portfolio.id">
                    <a v-bind:href="portfolio.link" target="_blank">
                      <figure><img :src="portfolio.image.url"></figure>
                      <p class="c-post-content">
                        <span class="c-post-info-date">{{portfolio.date | moment('LTS')}}</span>
                        <span class="c-post-info-title">{{portfolio.title}}</span>
                      </p>
                    </a>                    
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
      title: 'ポートフォリオ一覧 | フロントエンド うえむーのプロトタイプサイト | NU-Prototype',
      meta: [
        { hid: 'description', name: 'description', content: 'フロントエンド うえむーのプロトタイプサイトのポートフォリオ一覧ページです。' }
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
        `https://nu-base-template.microcms.io/api/v1/portfolio`,
        {
          headers: { 'X-API-KEY': process.env.API_KEY }
        }
      )
      console.log(data);
      return {
        portfolios: data.contents
      }
    }
  }
</script>