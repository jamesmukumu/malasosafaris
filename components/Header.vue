<template>
  <header class="w-full sticky top-0 left-0 z-50 bg-white shadow-md">
    <!-- Top Bar -->
    <div class="bg-[#A87B49] text-white py-2">
      <div
        class="container mx-auto px-4 flex justify-between items-center text-sm"
      >
        <div class="flex items-center space-x-6">
          <div class="flex items-center space-x-2">
            <i class="fa-solid fa-phone text-lg"></i>
            <span>+254 756 892 686</span>
          </div>
          <div class="hidden md:flex items-center space-x-2">
            <i class="fa-regular fa-envelope text-lg"></i>
            <a href="mailto:info@malasosafaris.site">info@malasosafaris.com</a>
          </div>
        </div>

        <div class="flex items-center space-x-5">
          <i class="fa-brands fa-facebook text-xl cursor-pointer"></i>
          <i class="fa-brands fa-instagram text-xl cursor-pointer"></i>
          <i class="fa-brands fa-twitter text-xl cursor-pointer"></i>
          <i class="fa-brands fa-linkedin text-xl cursor-pointer"></i>
        </div>
      </div>
    </div>

    <!-- Main Nav -->
    <div class="container mx-auto px-6 py-4 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-3 shrink-0 group">
        <img
          src="/images/home/malaso-logo.png"
          alt="Malaso Safaris logo"
          class="h-18 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <div class="leading-tight hidden sm:block">
          <div
            class="text-lg md:text-xl font-extrabold tracking-[0.18em] uppercase text-[#A87B49]"
          >
            Malaso
          </div>
          <div
            class="text-xs md:text-sm font-semibold tracking-[0.32em] uppercase text-gray-700/80"
          >
            Safaris
          </div>
        </div>
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav
        class="hidden lg:flex flex-1 items-center gap-6 text-base font-medium flex-wrap justify-center"
      >
        <NuxtLink to="/" class="hover:text-pr">Home</NuxtLink>
        <NuxtLink to="/destinations" class="hover:text-pr"
          >Safari Packages</NuxtLink
        >
        <NuxtLink to="/package/category" class="hover:text-pr"
          >Beach Packages</NuxtLink
        >
        <NuxtLink to="/destinations" class="hover:text-pr"
          >Destinations</NuxtLink
        >
        <NuxtLink to="/hotels" class="hover:text-pr">Hotels</NuxtLink>
        <NuxtLink to="/adventure/category" class="hover:text-pr"
          >Activities</NuxtLink
        >
        <NuxtLink to="/gallery" class="hover:text-pr">Gallery</NuxtLink>
        <NuxtLink to="/blogs" class="hover:text-pr">Blogs</NuxtLink>
        <NuxtLink to="/aboutus" class="hover:text-pr">About Us</NuxtLink>

        <NuxtLink
          to="/contact"
          class="ml-4 px-4 py-2 rounded bg-[#A87B49] hover:bg-[#8f5f3d] transition text-base font-semibold text-white"
        >
          Book Now
        </NuxtLink>
      </nav>

      <!-- Hamburger -->
      <button @click="toggleMenu" class="lg:hidden text-2xl">
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>
  </header>

  <!-- Overlay -->
  <div
    v-if="isOpen"
    @click="toggleMenu"
    class="fixed inset-0 bg-black/50 z-40 transition-opacity"
  ></div>

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300',
      isOpen ? 'translate-x-0' : 'translate-x-full',
    ]"
  >
    <div class="flex justify-between items-center p-6 border-b">
      <h2 class="text-lg font-semibold">Menu</h2>
      <button @click="toggleMenu" class="text-2xl">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <ul class="flex flex-col p-6 space-y-6 text-lg font-medium">
      <li><NuxtLink to="/" @click="toggleMenu">Home</NuxtLink></li>
      <li><NuxtLink to="/package/category">Safaris</NuxtLink></li>
      <li><NuxtLink to="/hotels">Hotels</NuxtLink></li>
      <li><NuxtLink to="/destinations">Destinations</NuxtLink></li>
      <li><NuxtLink to="/adventure/category">Adventures</NuxtLink></li>
      <li><NuxtLink to="/attractions">Attractions</NuxtLink></li>
      <li><NuxtLink to="/blogs">Blogs</NuxtLink></li>
      <NuxtLink
        to="/contact"
        class="px-6 py-2 rounded bg-pr hover:bg-pr transition text-sm font-semibold text-white"
      >
        Contact Us
      </NuxtLink>
    </ul>
  </aside>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>
