<template>
  <div class="w-full overflow-x-hidden">
    <Header />

    <div class="w-full overflow-x-hidden bg-white">
      <div
        class="flex flex-col lg:flex-row justify-between items-start gap-8 w-full max-w-[1300px] mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-8 m-2 sm:m-5"
      >
        <div
          class="flex flex-col gap-6 flex-[2] min-w-0 max-w-full overflow-x-hidden"
        >
          <h1 class="text-3xl text-center font-bold">
            {{ hotel.hotel_name }}
          </h1>

          <div class="w-full max-w-full overflow-hidden">
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
                  :items="hotel.hotel_photos"
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
          </div>

          <div
            class="prose max-w-full flex flex-col gap-2 overflow-hidden"
            v-html="hotel.hotel_description"
          />

          <h1 class="text-xl font-semibold">How to Get There:</h1>

          <div
            class="prose max-w-full flex flex-col gap-2 overflow-hidden"
            v-html="hotel.location_description"
          />
        </div>

        <aside
          class="w-full overflow-x-hidden lg:flex-1 lg:max-w-[450px] xl:max-w-[500px]"
        >
          <BookingsCard
            :hotel="hotel"
            :message="`Hello MalasoAfrica Safaris, i would wish to get a quote/book ${hotel.hotel_name}`"
          />
        </aside>
      </div>
    </div>
    <div>
      <PckCard
        :packages="hotel.packages"
        :title="`Tours in ${hotel.hotel_name}`"
      />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import BookingsCard from "~/components/BookingsCard.vue";
import Header from "~/components/Header.vue";
import PckCard from "~/components/PckCard.vue";

let route = useRoute();
let { slug } = route.params;
let { data, pending, error } = await useFetch("/api/hotel", {
  query: { slug },
});

let hotel = ref(data.value[0]);

let Title = hotel.value.hotel_name;
let Descp = hotel.value.hotel_overview;
useSeoMeta({
  title: Title,
  description: Descp,
  ogTitle: Title,
  ogDescription: Descp,
  ogImage: "/og-image_v2.png",
});
</script>
