<template>
  <div>
    <Header />
    <div
      class="safaris flex justify-center items-center min-h-screen w-full bg-cover bg-center"
      style="
        background-image: url(https://res.cloudinary.com/dasrniwpk/image/upload/v1760433626/Sarova-Mara-Game-Camp-Swimming-Pool_u8jax4.jpg);
      "
    >
      <h1 class="text-white text-3xl md:text-4xl font-bold text-center">
        Explore top Accomodations in Kenya
      </h1>
    </div>

    <!-- section for hotels card -->

    <section class="py-4 bg-white" v-if="!pending">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-20">
          <h2
            class="text-4xl md:text-5xl font-light text-gray-900 tracking-wide"
          >
            Top Accommodations with PJ Safaris
          </h2>

          <p class="mt-6 text-lg leading-relaxed text-gray-600">
            At PJ Safaris, we understand that the right accommodation transforms
            a safari or corporate journey into an unforgettable experience.
            That’s why we partner with top-rated hotels, luxury lodges, boutique
            camps, and business-friendly resorts across Kenya and Africa to
            offer our guests world-class comfort, convenience, and value.
          </p>

          <div class="w-32 h-[1px] bg-pr mt-3 mx-auto"></div>
        </div>

        <div class="flex flex-wrap justify-center gap-6 items-stretch">
          <NuxtLink
          to="/login"
            v-for="hotel in hotels"
            :key="hotel.id"
            class="flex relative cursor-pointer flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition grow-0 basis-[300px] md:basis-[320px] lg:basis-[350px]"
          >
            <div class="aspect-[4/3] overflow-hidden">
              <img
                :src=hotel.hotel_thumbnail
                :alt=hotel.slug
                class="w-full h-full object-cover hover:scale-105 transition duration-700"
              />
            </div>
            <div class="p-6 flex flex-col flex-grow">
              <h3 class="text-2xl font-light text-gray-900 mb-3">
                {{ hotel.hotel_name }}
              </h3>
              <div
                v-html="hotel.hotel_overview"
                class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
              ></div>
            </div>
          
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
var { data:hotels, pending } = await useFetch("/api/hotels");


</script>
