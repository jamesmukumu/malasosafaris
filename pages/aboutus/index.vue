<template>
  <div>
    <Header />

    <!-- Hero -->
    <div
      class="safaris flex justify-center items-center min-h-screen w-full bg-cover bg-center"
      :style="{
        backgroundImage: 'url(/images/fold3/elephant-amboseli.jpeg)',
      }"
    >
      <h1 class="text-white text-3xl md:text-4xl font-bold text-center">
        About Malaso Africa Safaris
      </h1>
    </div>

    <!-- About Section -->
    <div
      class="max-w-5xl m-6 mt-4 mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row justify-center"
    >
      <div class="md:w-1/2 w-full h-full md:h-auto">
        <img
          src="/images/fold3/lions-devouring-meat.jpeg"
          class="w-full h-full object-cover"
        />
      </div>

      <div
        class="md:w-1/2 w-full p-6 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50"
      >
        <h2 class="text-2xl font-bold text-pr mb-2">Malaso Africa Safaris</h2>
        <h3 class="text-xl font-semibold text-gray-700 mb-4">About us</h3>

        <p class="text-gray-600 leading-relaxed mb-4">
          A decade under the African sun, etched in memories, whispered in the
          wind, and forever imprinted on countless souls. Malaso Africa Safaris
          isn’t just a travel company; it’s a portal to Kenya’s vibrant
          symphony, a canvas where your wildest dreams meet the earth’s untamed
          beauty.
        </p>

        <p class="text-gray-600 leading-relaxed">
          We are the storytellers, weavers of authentic experiences, and
          custodians of this awe-inspiring land. More than just a travel
          company, Malaso Africa Safaris is a family of friends, united by a
          passion for crafting unforgettable experiences. With over 5 years of
          combined expertise in both local and international tours.
        </p>

        <NuxtLink
          to="/contact"
          class="w-40 h-12 flex items-center justify-center bg-pr text-white mt-4"
        >
          Contact Us
        </NuxtLink>
      </div>
    </div>

    <!-- Offer Section -->
    <h1 class="text-center mt-8 text-2xl font-bold">What We Offer</h1>

    <p class="text-center">
      Our team of experienced travel professionals and trusted partners are
      dedicated to supporting you through every step of your journey.<br />
      From personalized trip planning to ensuring an exceptional post-travel
      experience<br />
      , we're here to make your adventure seamless.
    </p>

    <!-- Cards -->
    <div class="mx-auto w-full px-4 py-12">
      <div class="flex flex-col lg:flex-row justify-center gap-6">
        <div
          class="flex flex-col w-full sm:w-1/2 lg:w-1/3 overflow-hidden cursor-pointer rounded-md shadow-lg group"
        >
          <img
            src="/images/home/help-guy.jpg"
            class="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div class="p-4 flex flex-col flex-1">
            <h3 class="text-lg font-semibold">
              Holiday Planning in Kenya & Beyond
            </h3>

            <p class="mt-2 text-sm text-gray-600 flex-1">
              At Malaso Africa Safaris, we turn your dream holiday into a
              perfectly curated reality. Our expert travel planners craft
              personalized itineraries that match your preferences—whether you
              want a relaxing beach getaway, a cultural city tour, or an
              adventure-filled family vacation. We handle everything from
              accommodation and transport to activities and guided excursions,
              ensuring a seamless travel experience. With our deep knowledge of
              Kenya and Africa’s top destinations, we deliver holidays that
              exceed expectations and create memories that last a lifetime.
            </p>
          </div>
        </div>

        <div
          class="flex flex-col w-full sm:w-1/2 lg:w-1/3 overflow-hidden cursor-pointer rounded-md shadow-lg group"
        >
          <img
            src="/images/fold3/wildebeest.jpeg"
            class="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div class="p-4 flex flex-col flex-1">
            <h3 class="text-lg font-semibold">
              Exclusive Safaris & Luxury Wildlife Experiences
            </h3>
            <p class="mt-2 text-sm text-gray-600 flex-1">
              Malaso Africa Safaris specializes in exclusive safari experiences
              designed for travelers who desire comfort, authenticity, and
              unforgettable wildlife encounters. From luxury lodge stays in the
              Maasai Mara to private conservancy adventures in Amboseli and
              Tsavo, we offer curated safari packages that bring you closer to
              Africa’s most iconic landscapes and wildlife. Our partnerships
              with top-rated safari camps and guides ensure safety, comfort, and
              a truly immersive journey into Kenya’s natural wonders.
            </p>
          </div>
        </div>

        <div
          class="flex flex-col w-full sm:w-1/2 lg:w-1/3 overflow-hidden cursor-pointer rounded-md shadow-lg group"
        >
          <img
            src="/images/fold3/hotels-new.jpeg"
            class="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div class="p-4 flex flex-col flex-1">
            <h3 class="text-lg font-semibold">
              International Trips & Global Travel Packages
            </h3>
            <p class="mt-2 text-sm text-gray-600 flex-1">
              Beyond Africa, Malaso Africa Safaris opens the world to you with
              well-organized international trips. Whether you’re planning a
              romantic escape to the Maldives, a European adventure, or a
              business tour in Asia, we provide fully customized global travel
              packages. Our team manages flights, visas, accommodation, and
              curated activities to guarantee a smooth and enjoyable travel
              experience. With Malaso Africa Safaris, your global journeys are
              handled with expertise and unmatched attention to detail.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Safari Banner -->
    <div class="bg-pr text-white p-8 space-y-6 font-sans">
      <p
        v-for="(line, index) in visibleLines"
        :key="index"
        class="text-lg md:text-xl"
      >
        {{ line }}
      </p>
    </div>

    <Patners />

    <Footer />
  </div>
</template>

<script setup>
const home = ref("");

const lines = [
  "Tailored Adventures for Every Family Beat",
  "At Malaso Africa Safaris, we understand that family adventures are woven with laughter, wonder, and the occasional meltdown.",
  "We're not just safari experts; we're family travel gurus, crafting experiences that ignite curiosity, strengthen bonds, and leave little footprints on magnificent landscapes.",
];

const visibleLines = ref([]);

onMounted(() => {
  home.value = window.location.origin;

  lines.forEach((line, i) => {
    setTimeout(() => {
      visibleLines.value.push(line);
    }, i * 3000);
  });
});
</script>
