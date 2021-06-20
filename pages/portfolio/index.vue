<template>
  <div id="news-list-page" class="container">
    <main>
      <div id="main_content">
        <div id="news-content-list" class="text-center">
            <h2 class="card-title">Portfolio</h2>
            <ul>
                <li class="c-card-extend" v-for="portfolio in portfolios" :key="portfolio.id">
                    <figure>
                      <a
                        v-bind:href="portfolio.link"
                        target="_blank"
                        :style="{ 'background-image': 'url(' + portfolio.image.url + ')' }"
                        :alt="portfolio.title">
                      </a>
                    </figure>
                    <p class="c-post-content">
                      <span class="c-post-info-date">{{portfolio.date | moment('LTS')}}</span>
                      <span class="c-post-info-title">{{portfolio.title}}</span>
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
      return {
        portfolios: data.contents
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