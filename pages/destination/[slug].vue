<template>
  <div>
    <Header />
    <div
      class="flex flex-col lg:flex-row justify-center items-start gap-8 w-full max-w-[1300px] mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-8 m-2 sm:m-5"
    >
      <div
        class="flex flex-col gap-6 flex-[2] w-full lg:max-w-[850px] self-start"
      >
        <h1 class="text-3xl text-center font-bold">
          {{ destination.destination_title }}
        </h1>

        <div class="w-full">
          <div class="custom-gallery w-full">
            <UCarousel
              v-slot="{ item }"
              loop
              arrows
              :autoplay="{ delay: 2000 }"
              wheel-gestures
              :prev="{ variant: 'solid' }"
              :next="{ variant: 'solid' }"
              :items="destinationImages"
              :ui="{
                item: 'basis-full sm:basis-1/2 lg:basis-1/3 p-2',
                prev: 'sm:start-4',
                next: 'sm:end-4',
                container: 'w-full',
              }"
            >
              <div class="w-full aspect-square overflow-hidden rounded-xl">
                <img
                  :src="item"
                  class="w-full h-full object-cover"
                  alt="gallery image"
                />
              </div>
            </UCarousel>
          </div>
        </div>

        <div
          class="prose flex flex-col gap-2"
          v-html="destination.destination_description"
        />
      </div>

      <aside class="w-full lg:flex-1 lg:max-w-[350px] self-start">
        <!-- hotels -->
        <RecommendationHotels :hotels="destination.hotels" />
      </aside>
    </div>
    <section>
      <!-- packages -->
      <PckCard
        :packages="destination.packages"
        :title="`Popular Trips in ${destination.destination_title}`"
      />
    </section>
    <Footer />
  </div>
</template>

<script setup>
import RecommendationHotels from "~/components/RecommendationHotels.vue";

let route = useRoute();
let slug = route.params.slug;
let { data, pending, error } = await useFetch("/api/destination", {
  query: { slug },
});
let destination = ref(data.value[0]);
let destinationImages = ref(data.value[0].destination_photos);
</script>
