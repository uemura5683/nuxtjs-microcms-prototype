<template>
  <div id="top-page">
    <main> 
        <div id="main_banner">
          <section class="carousel" aria-label="Gallery">
            <ol class="carousel__viewport">
              <li v-if="top.main_image1" id="carousel__slide1" tabindex="0" class="carousel__slide">
                <span class="carousel__snapper">
                  <a v-if="top.main_image1_link" v-bind:href="top.main_image1_link" target="_blank">
                    <img :src="top.main_image1.url" :alt="top.main_image1_alt" />
                  </a>
                  <a href="#carousel__slide3" class="carousel__prev"></a><a href="#carousel__slide2" class="carousel__next"></a>
                </span>
              </li>
              <li v-if="top.main_image2" id="carousel__slide2" tabindex="0" class="carousel__slide">
                <span class="carousel__snapper">
                  <a v-if="top.main_image2_link" v-bind:href="top.main_image2_link" target="_blank">
                    <img :src="top.main_image2.url" :alt="top.main_image2_alt" />
                  </a>
                  <a href="#carousel__slide1" class="carousel__prev"></a><a href="#carousel__slide3" class="carousel__next"></a>
              </span>
              </li>
              <li v-if="top.main_image3" id="carousel__slide3" tabindex="0" class="carousel__slide">
                <span class="carousel__snapper">
                  <a v-if="top.main_image3_link" v-bind:href="top.main_image3_link" target="_blank">
                    <img :src="top.main_image3.url" :alt="top.main_image3_alt" />
                  </a>
                  <a href="#carousel__slide2" class="carousel__prev"></a><a href="#carousel__slide1" class="carousel__next"></a>
              </span>
              </li>
            </ol>
          </section>
        </div>
        <div id="main_content">
          <div class="l-side">
            <l-menu />
          </div>
          <div class="main_content l-main">
            <div id="news">
              <div class="top_content_inner">
                <div class="top_content_inner text-center">
                    <h2 class="card-title"><span>Blog</span></h2>
                    <ul class="c-card-wrap">
                      <li class="c-card-extend" v-for="blog in top.blog" :key="blog.id">
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
                    <h2 class="card-title"><span>Portfolio</span></h2>
                    <ul class="c-card-wrap">
                      <li class="c-card-extend" v-for="portfolio in top.portfolio" :key="portfolio.id">
                        <figure>
                          <a
                            v-bind:href="portfolio.link"
                            target="_blank"
                            :style="{ 'background-image': 'url(' + portfolio.image.url + ')' }"
                            :alt="portfolio.title"
                          ></a>
                        </figure>
                        <p class="c-post-content">
                          <span class="c-post-info-date">{{portfolio.date | moment('LTS')}}</span>
                          <span class="c-post-info-title">{{portfolio.title}}</span>
                        </p>
                      </li>
                    </ul>
                </div>
              </div>
            </div>
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
import axios from 'axios';
import LMenu from '~/components/layouts/menu';
import moment from "moment";
export default {
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
      `https://nu-base-template.microcms.io/api/v1/top`,
      {
        headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY }
      }
    )
    return {
      top: data
    }
  }
}
</script>
<style lang="scss">
$white: #ffffff;
#top-page {
  &:after {
    content: '';
  }
  .carousel {
    position: relative;
    padding-top: 40%;
    perspective: 100px;
    *::-webkit-scrollbar {
      width: 0;
    }
    *::-webkit-scrollbar-track {
      background: transparent;
    }
    *::-webkit-scrollbar-thumb {
      background: transparent;
      border: none;
    }
    .carousel__viewport {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      overflow-x: scroll;
      overflow-y: hidden;
      counter-reset: item;
      scroll-behavior: smooth;
      scroll-snap-type: x mandatory;
      margin: 0 0 10px;
      .carousel__slide {
        position: relative;
        flex: 0 0 100%;
        width: 100%;
        &:before {
          content: counter(item);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%,-40%,70px);
          color: $white;
          font-size: 2em;
        }
        .carousel__snapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          scroll-snap-align: center;
        }
      }
    }
  }

  @media (hover: hover) {
    .carousel__snapper {
      animation-name: tonext, snap;
      animation-timing-function: ease;
      animation-duration: 4s;
      animation-iteration-count: infinite;
      &:last-child {
        .carousel__snapper {
          animation-name: tostart, snap;
        }
      }
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .carousel__snapper {
      animation-name: none;
    }
  }

  .carousel:hover .carousel__snapper,
  .carousel:focus-within .carousel__snapper {
    animation-name: none;
  }
  .carousel::before, .carousel::after,
  .carousel__prev, .carousel__next {
    position: absolute;
    top: 0;
    margin-top: 0;
    width: 4rem;
    height: 100%;
    border-radius: 0%;
    font-size: 0;
    outline: 0;
  }
  .carousel::before, .carousel__prev {
    left: 0;
  }
  .carousel::after, .carousel__next {
    right: 0;
  }
  .carousel::before, .carousel::after {
    content: '';
    z-index: 1;
    background-repeat: no-repeat;
    background-position: center center;
    color: #fff;
    font-size: 2.5rem;
    line-height: 4rem;
    text-align: center;
    pointer-events: none;
    background-color: transparent;
    background-size: 3rem;
    opacity: .7;
  }
  .carousel::before {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20buffered-rendering%3D%22static%22%20width%3D%2268px%22%20height%3D%2254px%22%20viewBox%3D%220%200%20823%20650%22%3E%3Cpath%20d%3D%22M336.5%202.6c-13.7-.2-27-.2-29.5%200-2.5%20.2-10.1%201.1-17%202-6.9%20.8-17.9%202.6-24.5%204-6.6%201.3-16.9%203.8-23%205.5-6%201.7-17.1%205.4-24.5%208.1-7.4%202.8-19.3%207.8-26.5%2011.2-7.1%203.4-17.5%208.8-23%2012.1-5.5%203.2-13.8%208.4-18.5%2011.5-4.7%203.2-13.7%209.7-20%2014.6-6.3%204.9-19.2%2016.5-28.5%2025.9-9.4%209.3-21%2022.2-25.9%2028.5-4.9%206.3-12.3%2016.7-16.5%2023-4.1%206.3-10.3%2016.7-13.8%2023-3.4%206.3-8.8%2017.4-11.9%2024.5-3.1%207.2-8%2020.2-10.9%2029-2.9%208.8-6.5%2021.2-7.9%2027.5-1.4%206.3-3.6%2017.6-4.8%2025l-2.2%2013.5%200%2034.5%200%2034.5%202.2%2013.5c1.2%207.4%203.4%2018.7%204.8%2025%201.4%206.3%205%2018.7%207.9%2027.5%202.9%208.8%207.8%2021.9%2010.9%2029%203.1%207.2%208.5%2018.2%2011.9%2024.5%203.4%206.2%209.6%2016.6%2013.8%2023%204.2%206.3%2011.6%2016.7%2016.5%2023%204.9%206.3%2016.3%2019%2025.4%2028.1%209.1%209.1%2020.8%2019.9%2026%2024.1%205.2%204.1%2014.5%2010.9%2020.5%2015%206.1%204.1%2015.1%209.9%2020%2012.8%205%202.9%2013.7%207.6%2019.5%2010.5%205.8%202.9%2016.1%207.5%2023%2010.3%206.9%202.7%2017.7%206.6%2024%208.6%206.3%201.9%2016.3%204.7%2022.3%206.1%205.9%201.4%2016.2%203.4%2023%204.5%206.7%201%2017.4%202.4%2023.7%203%206.3%20.5%2018.9%201%2028%201%209.1%200%2021.7-.5%2028-1%206.3-.6%2017.4-2%2024.5-3.2%207.2-1.1%2018.2-3.3%2024.5-4.8%206.3-1.6%2016.7-4.5%2023-6.5%206.3-2.1%2016.2-5.6%2022-8%205.8-2.3%2016.4-7.2%2023.5-10.7%207.2-3.6%2017.3-9.1%2022.5-12.3%205.2-3.1%2013.1-8.2%2017.5-11.3%204.4-3%2012.1-8.8%2017-12.7%205-3.9%2013.3-11.1%2018.5-16%205.2-4.9%2013.3-13%2017.9-17.9%204.7-5%2012.1-13.6%2016.4-19.1%204.4-5.5%2011.6-15.6%2016.2-22.5%204.5-6.9%2010.7-17%2013.7-22.5%203-5.5%207.5-14.5%2010-20%202.6-5.5%206-13.4%207.6-17.5%201.6-4.1%204.6-12.7%206.7-19%202-6.3%205-16.9%206.5-23.5%201.6-6.6%203.6-16%204.4-21%20.8-4.9%202-13.5%202.5-19%20.6-5.5%201.3-13%201.6-16.7l0.5-6.8%2083%200%2083%200%200-12%200-12-83%200-83%200-.5-6.7c-.3-3.8-1.2-12.9-2.1-20.3-.8-7.4-2.6-19.1-4-26-1.4-6.9-4.1-17.7-5.9-24-1.8-6.3-5.5-17.3-8.1-24.5-2.6-7.1-8.7-20.9-13.5-30.5-4.9-9.6-11.8-22.2-15.4-28-3.7-5.8-11.2-16.6-16.8-24-5.6-7.4-16.5-20-24.2-27.9-7.7-7.9-18-17.8-23-22.1-4.9-4.2-14.4-11.7-21-16.5-6.6-4.8-17.2-11.8-23.5-15.6-6.3-3.7-18.5-10.1-27-14.3-8.5-4.1-21.2-9.5-28.2-12-7.1-2.5-17.6-6-23.5-7.6-6-1.7-16.2-4.1-22.8-5.5-6.6-1.3-17.2-3.1-23.5-4-7.1-1-21.1-1.7-36.5-1.9ZM328.5%2026.2c5.5-.1%2016.3%20.3%2024%20.8%207.7%20.6%2019.6%202%2026.5%203.1%206.9%201%2018.6%203.5%2026%205.3%207.4%201.9%2019.1%205.5%2026%207.9%206.9%202.4%2017.2%206.5%2023%209.1%205.8%202.5%2015.5%207.3%2021.5%2010.7%206.1%203.3%2016.6%209.8%2023.5%2014.4%206.9%204.6%2018.1%2013%2025%2018.8%206.9%205.7%2017.3%2015.4%2023.3%2021.6%205.9%206.1%2014.4%2015.7%2018.8%2021.4%204.5%205.6%2010.8%2014%2013.9%2018.7%203.1%204.7%208.3%2013%2011.5%2018.5%203.3%205.5%208.2%2015%2011.1%2021%202.8%206.1%206.8%2015.2%208.8%2020.3%202%205%205.2%2014.5%207.2%2021%201.9%206.4%204.6%2016.8%206%2023%201.3%206.1%203.1%2015.7%203.9%2021.2%20.8%205.5%201.8%2014.7%202.3%2020.5l0.7%2010.5-161.5%200-161.5%200%2041.8-41.7%2041.7-41.8-8.4-8.5-8.5-8.5-50.8%2050.2c-27.9%2027.6-53.5%2052.9-56.8%2056.2l-6%206.1%2033%2033.1c18.2%2018.2%2043.7%2043.5%2056.8%2056.2l23.8%2023.2%208.5-8.5%208.4-8.5-41.7-41.8-41.8-41.7%20161.3%200%20161.2%200%200%205.3c0%202.8-.5%209.3-1%2014.2-.6%205-1.7%2013.3-2.6%2018.5-.8%205.2-3.1%2015.6-4.9%2023-1.9%207.4-5.3%2018.9-7.6%2025.5-2.3%206.6-6.3%2016.7-8.8%2022.5-2.6%205.8-7.2%2015.2-10.3%2021-3.1%205.8-9.2%2015.9-13.5%2022.5-4.4%206.6-11.7%2016.7-16.3%2022.5-4.6%205.8-14.7%2016.8-22.4%2024.6-7.8%207.7-18.8%2017.8-24.6%2022.4-5.8%204.6-16.6%2012.4-24%2017.3-7.4%204.8-21.1%2012.6-30.5%2017.2-9.3%204.6-21.3%209.9-26.5%2011.9-5.2%201.9-14.9%205.1-21.5%207.1-6.6%202-17.4%204.7-24%206-6.6%201.3-17.3%203.1-23.7%204-6.5%20.8-18.9%201.8-27.5%202.1-9.2%20.4-22.1%20.2-30.8-.5-8.2-.6-20.6-2-27.5-3.1-6.9-1.2-17.2-3.2-23-4.6-5.8-1.4-16.3-4.5-23.5-6.9-7.1-2.3-18.8-6.8-26-9.9-7.1-3.1-17.9-8.4-24-11.7-6-3.4-15.9-9.4-22-13.4-6-4.1-15.9-11.3-22-16.2-6-4.8-16.9-14.6-24-21.8-7.2-7.1-16.8-17.7-21.5-23.5-4.6-5.8-12.4-16.6-17.2-24-4.9-7.4-12.2-20-16.3-28-4-8-8.8-18.1-10.5-22.5-1.8-4.4-4.8-12.5-6.7-18-1.9-5.5-5-16.3-6.9-24-1.9-7.7-4.4-20.3-5.6-28-1.9-12-2.2-18.2-2.2-43-.1-22.8%20.3-31.6%201.7-41%201-6.6%202.9-17.2%204.3-23.5%201.5-6.3%204.2-16.7%206.1-23%201.9-6.3%205.5-16.7%208-23%202.5-6.3%208-18.2%2012.1-26.5%204.2-8.2%2011.7-21.1%2016.7-28.5%204.9-7.4%2012.8-18.2%2017.5-24%204.6-5.8%2014.1-16.1%2021-23%206.9-6.9%2017.2-16.3%2023-20.9%205.8-4.6%2015.7-11.9%2022-16.1%206.3-4.2%2016-10.2%2021.5-13.2%205.5-3.1%2015-7.9%2021-10.6%206.1-2.7%2016.1-6.8%2022.3-9.1%206.1-2.2%2017.2-5.7%2024.5-7.6%207.2-1.8%2017.9-4.3%2023.7-5.4%205.8-1%2015.5-2.4%2021.5-3%206.1-.6%2013-1.3%2015.5-1.4%202.5-.2%209-.4%2014.5-.5Z%22%20style%3D%22fill%3Argb(102%2C102%2C102)%3B%22%2F%3E%3C%2Fsvg%3E");
  }
  .carousel::after {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20buffered-rendering%3D%22static%22%20width%3D%2268px%22%20height%3D%2254px%22%20viewBox%3D%220%200%20823%20650%22%3E%3Cpath%20d%3D%22M498%20.5c-27.5-.3-39%200-46.5%201.1-5.5%20.7-14.7%202.3-20.5%203.4-5.8%201.2-16.3%203.7-23.5%205.7-7.1%201.9-19.1%205.7-26.5%208.5-7.4%202.7-20.7%208.5-29.5%2012.8-8.8%204.3-21.6%2011.4-28.5%2015.7-6.9%204.3-16.8%2011-22%2014.9-5.2%203.8-14.2%2011.1-20%2016.1-5.8%205-15%2013.7-20.5%2019.4-5.5%205.7-13.6%2014.9-18%2020.4-4.5%205.5-10.8%2013.8-14.1%2018.5-3.4%204.7-8.7%2012.8-11.9%2018-3.2%205.2-8.9%2015.6-12.6%2023-3.8%207.4-8.9%2018.7-11.4%2025-2.6%206.3-6.3%2017.1-8.5%2024-2.1%206.9-5%2017.9-6.5%2024.5-1.5%206.6-3.5%2017.9-4.6%2025-1%207.2-2.2%2017.8-2.6%2023.8l-.8%2010.7-83.2%200-83.3%200%200%2012%200%2012%2083.3%200%2083.2%200%20.8%2010.7c0.4%206%201.6%2016.7%202.6%2023.8%201.1%207.2%203.1%2018.4%204.6%2025%201.5%206.6%204.4%2017.6%206.5%2024.5%202.2%206.9%205.9%2017.7%208.5%2024%202.5%206.3%207.6%2017.6%2011.4%2025%203.7%207.4%209.4%2017.8%2012.6%2023%203.2%205.2%208.5%2013.3%2011.9%2018%203.3%204.7%209.6%2013%2014.1%2018.5%204.4%205.5%2012.5%2014.7%2018%2020.4%205.5%205.7%2014.7%2014.4%2020.5%2019.4%205.8%205%2014.8%2012.3%2020%2016.1%205.2%203.9%2015.1%2010.6%2022%2014.9%206.9%204.3%2019.7%2011.4%2028.5%2015.7%208.8%204.3%2022.1%2010.1%2029.5%2012.8%207.4%202.8%2019.4%206.6%2026.5%208.6%207.2%201.9%2017.7%204.5%2023.5%205.6%205.8%201.1%2015.5%202.7%2021.5%203.5%206.1%20.9%2020.7%201.8%2032.5%202.2%2013.7%20.4%2026.5%20.1%2035.5-.6%207.7-.7%2020.5-2.3%2028.5-3.7%208-1.3%2020.4-4%2027.5-5.9%207.2-1.8%2018.4-5.3%2025-7.5%206.6-2.3%2017.9-6.8%2025-9.9%207.2-3.2%2018.9-9.1%2026-13.1%207.2-4%2017.7-10.4%2023.5-14.3%205.8-3.9%2015.2-10.9%2021-15.6%205.8-4.6%2014.7-12.3%2019.8-17%205.2-4.7%2013.7-13.5%2019-19.5%205.4-6%2012.4-14.3%2015.6-18.5%203.2-4.2%209.8-13.5%2014.5-20.6%204.7-7.2%2011.4-18.2%2014.8-24.5%203.4-6.3%208.6-17.1%2011.6-24%203-6.9%207.5-18.6%2010-26%202.5-7.4%205.9-19.1%207.6-26%201.6-6.9%203.9-18.1%205-25%201.1-6.9%202.5-17.9%203.1-24.5%20.5-6.6%201-19%201-27.5%200-8.5-.5-20.9-1-27.5-.6-6.6-2-17.6-3.1-24.5-1.1-6.9-3.4-18.1-5-25-1.7-6.9-5.1-18.6-7.6-26-2.5-7.4-7-19.1-10-26-3-6.9-8.2-17.7-11.6-24-3.4-6.3-10.1-17.3-14.8-24.5-4.7-7.1-11.3-16.4-14.5-20.6-3.2-4.2-10.2-12.5-15.6-18.5-5.3-6-13.8-14.8-19-19.5-5.1-4.7-14-12.4-19.8-17-5.8-4.7-15.2-11.7-21-15.6-5.8-3.9-16.3-10.3-23.5-14.3-7.1-4-18.8-9.9-26-13.1-7.1-3.1-18.4-7.6-25-9.9-6.6-2.2-17.8-5.7-25-7.5-7.1-1.9-19.5-4.7-27.5-6.1l-14.5-2.6-36.5-.3ZM500.5%2023.6c10.5%20.2%2024.4%201%2031%201.9%206.6%20.9%2017.4%202.7%2024%204%206.6%201.3%2017.4%204%2024%206%206.6%202%2016.3%205.2%2021.5%207.2%205.2%201.9%2016.7%207%2025.5%2011.3%208.8%204.3%2020.5%2010.6%2026%2014.1%205.5%203.4%2016.1%2010.7%2023.5%2016.3%209.2%206.8%2019%2015.5%2030.6%2027.1%2011.7%2011.7%2020.3%2021.4%2027.5%2031%205.8%207.7%2013.4%2019%2017.1%2025%203.6%206.1%209%2016%2012.1%2022%203%206.1%207%2014.8%209%2019.5%201.9%204.7%205.1%2013.2%207%2019%201.9%205.8%204.7%2015%206%2020.5%201.4%205.5%203.2%2013.6%204.1%2018%20.9%204.4%202.3%2013.6%203.3%2020.5%201.1%208.7%201.6%2019.6%201.6%2036%200%2016.4-.5%2027.3-1.6%2036-1%206.9-2.4%2016.1-3.3%2020.5-.9%204.4-2.7%2012.5-4.1%2018-1.3%205.5-4.1%2014.7-6%2020.5-1.9%205.8-5.1%2014.3-7%2019-2%204.7-6%2013.5-9%2019.5-3.1%206.1-8.5%2016-12.1%2022-3.7%206.1-11.3%2017.3-17.1%2025-7.2%209.6-15.8%2019.3-27.5%2031-11.6%2011.6-21.4%2020.3-30.6%2027.1-7.4%205.6-18%2012.9-23.5%2016.3-5.5%203.5-17.2%209.8-26%2014.1-8.8%204.3-20.3%209.4-25.5%2011.3-5.2%202-14.9%205.2-21.5%207.2-6.6%202-17.4%204.7-24%206-6.6%201.3-17.6%203.2-24.5%204.1-8.9%201.3-19.4%201.7-36.5%201.8-17.1%200-27.8-.5-37-1.8-7.1-.9-18.4-2.8-25-4.2-6.6-1.4-17.2-4.1-23.5-5.9-6.3-1.8-16.9-5.4-23.5-8-6.6-2.6-18.1-7.7-25.5-11.4-7.4-3.7-18.1-9.6-23.8-13.2-5.7-3.5-15.5-10.2-21.7-14.9-6.2-4.7-15.9-12.5-21.5-17.5-5.6-4.9-14.7-13.9-20.2-20-5.5-6-13.7-15.9-18.3-22-4.6-6-11.1-15.5-14.6-21-3.5-5.5-9.3-15.8-13-23-3.7-7.1-9.2-19.3-12.2-27-3.1-7.7-7.1-19.6-9.1-26.5-2-6.9-4.4-16.8-5.5-22-1.1-5.2-2.6-14.7-3.5-21-.8-6.3-1.7-15.2-2-19.7l-.6-8.3%20161.8%200%20161.7%200-41.8%2041.7-41.7%2041.8%208.5%208.5%208.5%208.5%2056.3-56.2%2056.2-56.3-56.2-56.2-56.3-56.3-8.5%208.5-8.5%208.5%2041.7%2041.8%2041.8%2041.7-161.7%200-161.8%200%20.6-8.2c0.3-4.6%201.2-13.5%202-19.8%20.9-6.3%202.4-15.8%203.5-21%201.1-5.2%203.5-15.1%205.5-22%202-6.9%206-18.8%209.1-26.5%203-7.7%208.5-19.8%2012.2-27%203.7-7.1%209.5-17.5%2013-23%203.5-5.5%2010-14.9%2014.6-21%204.6-6%2012.8-15.9%2018.3-22%205.5-6%2014.6-15%2020.2-20%205.6-4.9%2015.3-12.8%2021.5-17.5%206.2-4.7%2016-11.4%2021.7-14.9%205.7-3.6%2016.4-9.5%2023.8-13.2%207.4-3.7%2018.9-8.8%2025.5-11.4%206.6-2.6%2017.4-6.3%2024-8.2%206.6-1.9%2018.5-4.7%2026.5-6.3%208-1.6%2019.5-3.4%2025.5-3.9%206.1-.6%2013-1.3%2015.5-1.5%202.5-.2%2013.1-.2%2023.5%200Z%22%20style%3D%22fill%3Argb(102%2C102%2C102)%3B%22%2F%3E%3C%2Fsvg%3E");
  }

  @media screen and (max-width: 767px) {
    .carousel::before, .carousel::after {
        content: '';
        z-index: 1;
        background-color: transparent;
        background-size: 1.0rem 1.0rem;
        background-repeat: no-repeat;
        background-position: center center;
        color: #fff;
        font-size: 2.5rem;
        line-height: 4rem;
        text-align: center;
        pointer-events: none;
    }
    .carousel::before, .carousel__prev {
        left: 0;
    }
    .carousel::after, .carousel__next {
        right: 0;
    }
    .carousel::before, .carousel::after, .carousel__prev, .carousel__next {
        width: 2rem;
    }
  }
}

@media screen and (min-width: 768px) {
  #main_banner {
    width: 100%;
    margin: 0 auto;
    padding-left: 0px;
    padding-right: 0px;
  }
}

/*top content*/
.top_content_inner {
  margin: 0 0 2rem;
  text-align: center;
}
@media screen and (max-width: 767px) {
  .top_content_inner {
    margin: 0 0 1rem;
  }
}

/* animation */
#animaton_bg {
  -webkit-animation:.5s linear infinite fadein-keyframes 4s;
          animation:.5s linear infinite fadein-keyframes 4s;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards;
  -webkit-animation-iteration-count: 1;
          animation-iteration-count: 1;
  position: fixed;
  background-color: white;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10000;
  opacity: 1;
  &.access {
    display: none;
    -webkit-animation:none;
    animation:none;
  }
  .animation__first {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translateY(-50%) translateX(-50%);
            transform: translateY(-50%) translateX(-50%);
    text-align: center;
    img {
      width: 180px;
    }
    p {
      line-height: 2.4rem;
      font-size: 1.6rem;
      width: 100%;
      padding: 2rem 0 0;
    }
  }
  .animation__first {
    -webkit-animation:4s linear infinite fadein-keyframes_inner 0s;
    animation:4s linear infinite fadein-keyframes_inner 0s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    -webkit-animation-iteration-count: 1;
    animation-iteration-count: 1;
    opacity: 0;
    width: 80%;
  }
}

@media screen and (max-width: 767px) {
  #animaton_bg {
    .animation__first {
      p {
        font-size: 1.0rem;
        line-height: 1.6;
      }
    }
  }
}

@keyframes fadein-keyframes { 
  0% { opacity: 1; } 
  100% { background-color:transparent; z-index: -1;}
}
@keyframes fadein-keyframes_inner { 
  0% { opacity: 0; } 
  50% { opacity: 1; } 
  100% { opacity: 0; z-index: -1;}
}
</style>