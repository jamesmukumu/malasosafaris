<template>
  <div>
    <Header />

    <section>
      <UCarousel
        v-slot="{ item }"
        loop
        :autoplay="{ delay: 4000 }"
        wheel-gestures
        fade
        :items="homeImages"
        :ui="{
          container: 'w-full !mx-0 !px-0',
          item: 'basis-full !ps-0 !pe-0',
          track: '!gap-0',
          prev: 'left-4',
          next: 'right-4',
        }"
      >
        <div class="relative w-full">
          <!-- Image -->
          <img :src="item.url" alt="pj-safaris" class="w-full h-[500px] object-cover" />

          <!-- Centered Button -->
          <div class="absolute inset-0 flex items-center justify-center">
            <NuxtLink
              to="/"
              class="bg-pr text-white px-6 py-3 rounded-lg shadow-lg hover:bg-pr transition"
            >
              Book A Safari
            </NuxtLink>
          </div>
        </div>
      </UCarousel>
    </section>



     <section class="bg-white py-12">
      <div
        class="container mx-auto px-6 flex flex-col md:flex-row items-center"
      >
        <div class="md:w-1/2 md:pr-12">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-800 leading-snug">
            PJ Safaris
          </h1>
          <p class="mt-4 text-lg text-gray-600">
       PJ Safaris is a leading tours and travel company in Kenya, specializing in unforgettable safari experiences across the country’s most iconic destinations. From the world-famous Maasai Mara to Amboseli, Tsavo, and Kenya’s stunning coastal regions, we create expertly planned tours that showcase the beauty of Africa’s wildlife, landscapes, and culture.

With a team of experienced travel professionals, PJ Safaris offers personalized itineraries, reliable service, and seamless travel planning for individuals, families, and groups. Whether you're looking for a luxury safari, a wildlife adventure, or a relaxing holiday, PJ Safaris is committed to delivering authentic Kenyan safari experiences and memories that last a lifetime.
          </p>
          <NuxtLink
            to="/"
            type="button"
            class="inline-block mt-6 px-6 py-3 bg-pr hover:bg-pr text-white font-semibold rounded-lg shadow transition"
          >
            Contact Us
          </NuxtLink>
        </div>
        <div class="mt-8 md:mt-0 md:w-1/2 flex justify-center">
          <img
            src="https://res.cloudinary.com/dasrniwpk/image/upload/v1764569574/packages/gl7jr0qvgtpdpxwxtipk.webp"
            alt="Lions-Maasai-Mara"
            class="w-full"
          />
        </div>
      </div>
    </section>





    <section class="m-4">
      <h2
        class="heading-font text-4xl md:text-5xl text-center font-bold text-black mb-4"
      >
        Top Attractions In Africa
      </h2>
      <div class="w-24 h-1 bg-pr mx-auto mb-2"></div>
      <div class="mx-auto w-full px-4 py-12">
        <div
          class="grid place-content-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <NuxtLink
          to="/package/category"
            class="flex flex-col overflow-hidden cursor-pointer rounded-md shadow-lg group"
          >
            <img
              src="/images/home/Warriors-Academy-Saruni-Samburu.jpg"
              alt="Samburu-Saruni"
              class="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="p-4 flex flex-col flex-1">
              <h3 class="text-lg font-semibold">Mt Kenya & Kilimanjaro</h3>
              <p class="mt-2 text-sm text-gray-600 flex-1">
                Conquer Africa’s tallest mountains with our Expert Guides.
              </p>
              <span
              
                class="mt-3 inline-flex items-center text-pr"
              >
                More Info →
              </span>
            </div>
          </NuxtLink>

          <NuxtLink
          to="/package/category"
            class="flex flex-col overflow-hidden cursor-pointer rounded-md shadow-lg group"
          >
            <img
              alt="maasai-mara"
              src="/images/home/Lion-maasai-mara (4).jpg"
             
              class="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="p-4 flex flex-col flex-1">
              <h3 class="text-lg font-semibold">Masai Mara Migration</h3>
              <p class="mt-2 text-sm text-gray-600 flex-1">
                Witness the Magical Annual Wildebeest Migration.
              </p>
              <span
                href="/package/category"
                class="mt-3 inline-flex items-center text-pr"
              >
                More Info →
              </span>
            </div>
          </NuxtLink>

          <NuxtLink
          to="/package/category"
            class="flex flex-col overflow-hidden cursor-pointer rounded-md shadow-lg group"
          >
            <img
              alt="maasai-mara"
               src="/images/home/Coastal-Paradise.jpg"
              class="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="p-4 flex flex-col flex-1">
              <h3 class="text-lg font-semibold">Coastal Sandy Beaches</h3>
              <p class="mt-2 text-sm text-gray-600 flex-1">
                Explore Kenya`s` Sandy White Coastal Beaches .
              </p>
              <span
             
                class="mt-3 inline-flex items-center text-pr"
              >
                More Info →
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>





    
    <h2
      class="heading-font text-4xl md:text-5xl text-center font-bold text-black mb-4"
    >
      Top Safaris For You
    </h2>
    <div class="w-24 h-1 bg-pr mx-auto mb-2"></div>
    <div v-if="pending" class="text-center mt-10">Loading packages...</div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center mt-10 text-red-500">
      Something went wrong loading packages.
    </div>

    <!-- Packages -->
    <div v-else>
      <PackagesCard :packages="packages" />
    </div>
    <!--  -->

    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-20">
          <h2
            class="text-4xl md:text-5xl font-light text-gray-900 tracking-wide"
          >
            Camps in Maasai Mara
          </h2>

          <p class="mt-6 text-lg leading-relaxed text-gray-600">
            A myriad of accommodation options is available in Maasai Mara. From
            adventurous mobile tented camps following the Great Migration to
            family-oriented lodge style accommodations and anything in between,
            you can be sure to find the perfect spot just for you.
          </p>

          <div class="w-32 h-[1px] bg-yellow-700/60 mt-8 mx-auto"></div>
        </div>

        <div class="flex flex-wrap gap-6 items-stretch">
          <NuxtLink
            to="/hotel/Zebra-Plains-Mara-Camp"
            class="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition flex-1 min-w-[280px]"
          >
            <div class="aspect-[4/3] overflow-hidden">
              <img
                src="/images/home/zebra.jpg"
                class="w-full h-full object-cover hover:scale-105 transition duration-700"
                alt="zebra-plains-camp"
              />
            </div>
            <div class="p-6 flex flex-col flex-grow">
              <h3 class="text-2xl font-light text-gray-900 mb-3">
                Zebra Plains Mara Camp
              </h3>
              <p class="text-gray-600 flex-grow">
                Zebra Plains Mara Camp is located inside the Maasai Mara
                National Reserve in Kenya, within a prime wildlife viewing area.
              </p>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/hotel/Saruni-Mara-BaseCamp"
            class="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition flex-1 min-w-[280px]"
          >
            <div class="aspect-[4/3] overflow-hidden">
              <img
                src="/images/home/Saruni Mara.jpg"
                class="w-full h-full object-cover hover:scale-105 transition duration-700"
                alt="Saruni-Mara"
              />
            </div>
            <div class="p-6 flex flex-col flex-grow">
              <h3 class="text-2xl font-light text-gray-900 mb-3">
                Saruni Mara
              </h3>
              <p class="text-gray-600 flex-grow">
                Saruni Mara is a boutique lodge offering an exclusive and
                luxurious safari experience.
              </p>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/hotel/Angama-Mara-Lodge"
            class="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition flex-1 min-w-[280px]"
          >
            <div class="aspect-[4/3] overflow-hidden">
              <img
                src="/images/home/angama-mara (2).png"
                class="w-full h-full object-cover hover:scale-105 transition duration-700"
                alt="angama-mara"
              />
            </div>
            <div class="p-6 flex flex-col flex-grow">
              <h3 class="text-2xl font-light text-gray-900 mb-3">
                Angama Mara
              </h3>
              <p class="text-gray-600 flex-grow">
                Perched high above the Great Rift Valley, Angama Mara offers
                breathtaking views over the Masai Mara plains.
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

   

    <section class="bg-[#f6f8fb] text-gray-800 px-6 py-12 md:px-16 lg:px-24">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        <div class="md:w-1/2 flex flex-col justify-center">
          <h1 class="text-4xl md:text-5xl font-bold text-[#bf4226] mb-4">
            Welcome to PJ Safaris
          </h1>
          <h2 class="text-xl md:text-2xl font-semibold text-gray-600">
            An Adventure Travel Company You Can Trust
          </h2>
        </div>

        <div class="md:w-1/2 space-y-6 text-lg md:text-xl leading-relaxed">
          <p>
            Over half a decade under the African sun, etched in memories,
            whispered in the wind, and forever imprinted on countless souls, PJ
            Safaris isn’t just a travel company; it’s a portal to Kenya’s
            vibrant symphony, a canvas where your wild travel dreams meet the
            earth’s untamed pulse.
          </p>
          <p>
            We are the storytellers, weavers of authentic experiences, and
            custodians of this awe-inspiring land.
          </p>
          <p>
            More than just a travel company, PJ Safaris is a family of friends,
            united by a passion for crafting unforgettable experiences. With
            over 6 years of combined experience, we’re not just tour operators;
            we’re your adventure architects, weaving journeys as diverse as our
            land itself.
          </p>
          <p>
            At PJ Safaris, we understand that family adventures are woven with
            laughter, wonder, and the occasional meltdown. We’re not just safari
            experts; we’re family travel gurus, crafting experiences that ignite
            curiosity, strengthen bonds, and leave footprints on magnificent
            landscapes.
          </p>
        </div>
      </div>
    </section>

    <section>
<BlogsCard :main-blogs="mainBlogs" :other-blogs="otherBlogs"/>

    </section>
    <div>
      <Patners/>
    </div>
  
    <Footer />
  </div>
</template>

<script setup>
import Footer from "~/components/Footer.vue";

const { data, pending, error } = await useFetch("/api/home");

var imgs = await useFetch("/api/cloudinary");
const packages = computed(() => data.value?.packages || []);
const blogs = computed(()=>data.value?.blogs || [])
const mainBlogs = computed(()=>blogs.value.slice(0,2))
var otherBlogs = computed(()=>blogs.value.slice(2))

let homeImages = imgs.data.value.images ?? [];



useSeoMeta({
title:"Top Holidays Deals | Kenya &amp; International Destinations",
description:"Premium Holiday Deals to Top-Rated Destinations in Kenya &amp; Beyond. Discounted Beach &amp; Safari Packages. Vacation to Exotic places like Dubai. Book Now",
ogTitle:"Top Holidays Deals | Kenya &amp; International Destinations",
ogDescription:"Premium Holiday Deals to Top-Rated Destinations in Kenya &amp; Beyond. Discounted Beach &amp; Safari Packages. Vacation to Exotic places like Dubai. Book Now",
ogImage:"https://res.cloudinary.com/dasrniwpk/image/upload/v1763984726/adventures/hpywfcpb3qa60jynzngm.png",

})
</script>
