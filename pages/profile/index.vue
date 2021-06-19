<template>
  <div id="profile-page" class="container">
    <main> 
      <div id="main_content">
        <div class="main_content col-md-10 p-0">
            <div id="name_img">
              <div id="title">{{ items.title }}</div>
              <div id="img"><img :src="items.image.url"></div>
            </div>
            <div id="description" v-html="items.description"></div>
            <div id="carrer" v-html="items.carrer"></div>
            <div id="programing">
                <h3>{{items.skill.title}}</h3>
                <div class='skill_detail' v-html="items.skill.skill"></div>
            </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    head: {
      title: 'プロフィール | フロントエンド うえむーのプロトタイプサイト | NU-Prototype',
      meta: [
        { hid: 'description', name: 'description', content: 'フロントエンド うえむーのプロトタイプサイトのプロフィールページです。' }
      ]
    },
    data() {
      return {
        data: {}
      };
    },
    async asyncData({ params }) {
      const { data } = await axios.get(
        `https://nu-base-template.microcms.io/api/v1/profile`,
        {
          headers: { 'X-API-KEY': process.env.API_KEY }
        }
      );
      console.log(data);
      return {
        items: data
      }
    }
}
</script>