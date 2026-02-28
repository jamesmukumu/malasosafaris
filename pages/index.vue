<template>
  <div>
    <Header />

    <section class="bg-white py-12">
      <div
        class="container mx-auto px-6 flex flex-col md:flex-row items-center"
      >
        <div class="md:w-1/2 md:pr-12">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-800 leading-snug">
            PJ Safari`s Royalty Program
          </h1>
          <p class="mt-4 text-lg text-gray-600">
At PJ Safaris, we truly appreciate the travelers who continue to choose us for their adventures. Our Royalty Program is our way of saying thank you to our loyal customers.

As a member, you’ll enjoy special offers, exclusive benefits, and personalized service designed to make every safari even more rewarding. We are committed to giving you memorable experiences, seamless travel planning, and extra value every time you journey with us.

With PJ Safaris, your loyalty means more — and every trip is a chance to experience something special.
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
            class="w-full "
          />
        </div>
      </div>
    </section>
    <h1 class="text-3xl md:text-4xl font-bold text-gray-800 leading-snug text-center">
      Top Safari Deals For You
    </h1>

    <div v-if="pending" class="text-center mt-10">Loading packages...</div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center mt-10 text-red-500">
      Something went wrong loading packages.
    </div>

    <!-- Packages -->
    <div v-else>
      <PackagesCard :packages="jeepPackages" />
    </div>
    <Footer/>
  </div>
</template>

<script setup>
import Footer from '~/components/Footer.vue';

const { data, pending, error } = await useFetch("/api/home");

const jeepPackages = computed(() => data.value?.data || []);
</script>
