<template>
  <div>
    <section class="px-4 py-8 w-full">
      <h1 class="text-3xl font-bold text-center mb-8">See Hotels</h1>

      <div class="flex flex-col w-full">
        <NuxtLink
        :to="`/hotel/${hotel.slug}`"
          v-for="hotel in hotels"
          :key="hotel.id"
          class="flex flex-col w-full cursor-pointer mt-2 rounded-lg bg-white shadow-md hover:shadow-lg transition duration-300 ease-in-out overflow-hidden"
        >
          <div class="w-full">
            <img
              :src="hotel.hotel_thumbnail"
              :alt="hotel.slug"
              class="w-full max-h-[400px] object-cover"
            />
          </div>

          <div class="flex flex-col items-center p-4 space-y-4">
            <h2 class="text-xl font-semibold text-center">
              {{ hotel.hotel_name }}
            </h2>

            <span
              
              class="inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-md bg-pr shadow-sm transition hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              See Hotel
            </span>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
defineProps({
  hotels: {
    type: Array,
    required: true,
  },
});
</script>
