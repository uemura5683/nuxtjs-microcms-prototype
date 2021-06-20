<template>
  <div id="top-page">
    <main> 
        <div id="main_banner"></div>
        <div id="main_content" class="container d-block d-md-flex mt-4 p-0">
          <div class="main_content col-md-10 p-0">
            <div id="news"></div>
          </div>
        </div>
        <div id="animaton_bg">
          <div class="animation__first">
            <img src="/logo.png">
            <p>フロントエンド うえむーのプロトタイプサイトです。</p>
          </div>
        </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  async asyncData({ params }) {
    const { data } = await axios.get(
      `https://nu-base-template.microcms.io/api/v1/top`,
      {
        headers: { 'X-API-KEY': process.env.API_KEY }
      }
    )
    return data
  }
}
</script>