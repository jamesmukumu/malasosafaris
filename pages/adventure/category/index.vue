<template>
  <div>
    <Header />

    <div
      class="safaris flex justify-center items-center min-h-screen w-full bg-cover bg-center"
      style="
        background-image: url(https://res.cloudinary.com/dasrniwpk/image/upload/v1765111813/top-mountain-with-trees_kshg3c.jpg);
      "
    >
      <h1 class="text-white text-3xl md:text-4xl font-bold text-center">
        Your gateway to the perfect bush-and-beach adventure
      </h1>
    </div>

    <section class="py-4 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-20">
          <h2
            class="text-4xl md:text-5xl font-light text-gray-900 tracking-wide"
          >
            Uncover Africa’s Most Breathtaking Bush and Beach Experiences with
            PJ Safaris.
          </h2>

          <p class="mt-6 text-lg leading-relaxed text-gray-600">
            Discover the best tailor-made adventures in Kenya and across Africa
            with PJ Safaris. From thrilling mountain climbs and immersive
            wildlife encounters to luxury lodges, beach escapes, and custom-made
            itineraries across the Maasai Mara, Diani, Amboseli, Serengeti,
            Zanzibar, and beyond — your perfect journey starts here.
          </p>

          <div class="w-32 h-[1px] bg-pr mt-3 mx-auto"></div>
        </div>

        <div class="flex flex-wrap gap-6 items-stretch">
          <NuxtLink
            :to="`/adventure/category/${adventure_category.adventure_slug}`"
            :key="adventure_category.id"
            v-for="adventure_category in adventures_categories"
            class="flex relative cursor-pointer flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition grow-0 basis-[300px] md:basis-[320px] lg:basis-[350px]"
          >
            <div class="aspect-[4/3] overflow-hidden">
              <img
                :src="adventure_category.adventure_category_image"
                :alt="adventure_category.adventure_slug"
                class="w-full h-full object-cover hover:scale-105 transition duration-700"
              />
            </div>
            <div class="p-6 flex flex-col flex-grow">
              <h3 class="text-2xl font-light text-gray-900 mb-3">
                {{ adventure_category.adventure_category_name }}
              </h3>
              <div
                v-html="adventure_category.aventure_category_description"
                class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
              ></div>
            </div>
            <span
              class="absolute top-2 right-2 bg-pr text-white text-m px-2 py-1 rounded"
            >
              {{ adventure_category.adventures_count }}
              {{
                adventure_category.adventures_count > 1
                  ? "Adventures"
                  : "Adventure"
              }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
let { data, pending, error } = await useFetch("/api/adventures_category");
let adventures_categories = ref(data.value.rows ?? []);



let Title = "Enjoy Thrilling Adventures Across Africa | Mountain Climbing, Amboseli & Diani"
let Descp = "Choose from our exciting adventrues packages across Kenya and Africa in General, including Mountain Climbing, Snorkelling, and Deep Sea Diving. From luxury lodges to budget-friendly adventures, find the perfect adventure for you."
useSeoMeta({
title:Title,
description:Descp,
ogTitle:Title,
ogDescription:Descp,
ogImage:"https://res.cloudinary.com/dasrniwpk/image/upload/v1763984726/adventures/hpywfcpb3qa60jynzngm.png",

})
</script>
