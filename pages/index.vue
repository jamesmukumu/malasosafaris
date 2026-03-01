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
    next: 'right-4'
    }"
  >
    <div class="relative w-full">

      <!-- Image -->
      <img
        :src="item.url"
        class="w-full h-[500px] object-cover"
      />

      <!-- Centered Button -->
      <div class="absolute inset-0 flex items-center justify-center">
        <NuxtLink to="/" class="bg-pr text-white px-6 py-3 rounded-lg shadow-lg hover:bg-pr transition">
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
            PJ Safari`s Royalty Program
          </h1>
          <p class="mt-4 text-lg text-gray-600">
            At PJ Safaris, we truly appreciate the travelers who continue to
            choose us for their adventures. Our Royalty Program is our way of
            saying thank you to our loyal customers. As a member, you’ll enjoy
            special offers, exclusive benefits, and personalized service
            designed to make every safari even more rewarding. We are committed
            to giving you memorable experiences, seamless travel planning, and
            extra value every time you journey with us. With PJ Safaris, your
            loyalty means more — and every trip is a chance to experience
            something special.
          </p>
          <NuxtLink
            to="/login"
            type="button"
            class="inline-block mt-6 px-6 py-3 bg-pr hover:bg-pr text-white font-semibold rounded-lg shadow transition"
          >
            Join Us
          </NuxtLink>
        </div>
        <div class="mt-8 md:mt-0 md:w-1/2 flex justify-center">
          <img
            src="https://res.cloudinary.com/dasrniwpk/image/upload/v1764569574/packages/gl7jr0qvgtpdpxwxtipk.webp"
            alt="Parent holding baby"
            class="w-full"
          />
        </div>
      </div>
    </section>
     <h2 class="heading-font text-4xl md:text-5xl text-center font-bold text-black mb-4">
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
      <PackagesCard :packages="jeepPackages" />
    </div>

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
    <Footer />
  </div>
</template>

<script setup>
import Footer from "~/components/Footer.vue";


const { data, pending, error } = await useFetch("/api/home");
var imgs = await useFetch("/api/cloudinary")
const jeepPackages = computed(() => data.value?.data || []);
let homeImages = imgs.data.value.images ?? []



</script>
