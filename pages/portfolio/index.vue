<template>
  <div id="news-list-page">
    <main>
      <div id="main_content">
        <div class="l-side">
          <l-menu />
        </div>
        <div id="news-content-list" class="l-main">
            <h2 class="card-title"><span>Portfolio</span></h2>
            <ul class="c-card-wrap">
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
  import LMenu from '~/components/layouts/menu';
  import moment from "moment";
  export default {
    head: {
      title: 'ポートフォリオ一覧 | フロントエンド うえむーのプロトタイプサイト | NU-Prototype',
      meta: [
        { hid: 'description', name: 'description', content: 'フロントエンド うえむーのプロトタイプサイトのポートフォリオ一覧ページです。' }
      ]
    },
    components: {
      LMenu
    },
    filters: {
        moment: function (date) {
            return moment(date).format('YYYY/MM/DD');
        }
    },
    data() {
      return {
        posts: []
      }
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