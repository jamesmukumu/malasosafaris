<template>
  <div>
    <Header />

    <div
      class="safaris flex justify-center items-center min-h-screen w-full bg-cover bg-center"
        :style="{
      backgroundImage: `url(${bgUrl})`
    }"
    >
      <h1 class="text-white text-3xl md:text-4xl font-bold text-center">
        Enjoy both bush and beach tours with Malaso Safaris
      </h1>
    </div>

    <section class="py-4 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-20">
          <h2
            class="text-4xl md:text-5xl font-light text-gray-900 tracking-wide"
          >
          Discover Africa’s Top Bush and Beach Tours with Malaso Safaris
          </h2>

          <p class="mt-6 text-lg leading-relaxed text-gray-600">
            Discover the best tailor made safaris in Kenya and Africa with Malaso Safaris. Explore unforgettable wildlife experiences, luxury safari lodges, beach escapes, and tailor-made tour packages across Maasai Mara, Diani, Amboseli, Serengeti, Zanzibar, and more.
          </p>

          <div class="w-32 h-[1px] bg-pr mt-3 mx-auto"></div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            :to="`/package/category/${package_category.package_category_name.trim().replace(/\s+/g, '-')}`"
            :key="package_category.id"
            v-for="package_category in package_categories"
            class="flex relative cursor-pointer flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition grow-0 basis-[300px] md:basis-[320px] lg:basis-[350px]"
          >
            <div class="aspect-[4/3] overflow-hidden">
              <img
                :src="package_category.package_category_image"
                :alt="package_category.package_category_name"
                class="w-full h-full object-cover hover:scale-105 transition duration-700"
              />
            </div>
            <div class="p-6 flex flex-col flex-grow">
              <h3 class="text-2xl font-light text-gray-900 mb-3">
                {{ package_category.package_category_name }}
              </h3>
              <div
                v-html="package_category.package_description"
                class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
              ></div>
            </div>
            <span
              class="absolute top-2 right-2 bg-pr text-white text-m px-2 py-1 rounded"
            >
              {{ package_category.packages_count }}
              {{
                package_category.packages_count > 1
                  ? "Safaris"
                  : "Safari"
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
let { data, pending, error } = await useFetch("/api/packages_category");
let package_categories = ref(data.value.rows ?? []);


let Title = 'Kenya Safari Packages | Masai Mara, Amboseli & Diani'
let Descp = 'Choose from our exciting safari packages across Kenya, including Masai Mara, Amboseli, and Lake Naivasha. From luxury lodges to budget-friendly adventures, find the perfect safari for you.'
useSeoMeta({
title:Title,
description:Descp,
ogTitle:Title,
ogDescription:Descp,
ogImage:"https://res.cloudinary.com/dasrniwpk/image/upload/v1763984726/adventures/hpywfcpb3qa60jynzngm.png",

})

let bgUrl = "http://localhost:3000/images/fold3/mt-lion.jpeg"
</script>
