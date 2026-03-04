<template>
  <div class="w-full grid place-content-center">
    <h2
      class="heading-font text-4xl md:text-5xl text-center font-bold text-black mb-4"
    >
      {{ title }}
    </h2>
    <div class="w-24 h-1 bg-[#bf4226] mx-auto"></div>
    <div class="mt-4 flex flex-wrap justify-center gap-4">
      <div
        v-for="pck in packages"
        :key="pck.id"
        class="grow-0 shrink-0 basis-full sm:basis-[48%] md:basis-[31%] bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-3 cursor-pointer flex flex-col"
      >
        <a href="">
          <img
            :src="pck.package_photo"
            alt=""
            class="w-full h-52 object-cover rounded mb-4"
          />

          <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {{ pck.package_title }}
          </h3>
          <div
            v-html="pck.package_overview"
            class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
          ></div>
        </a>

        <div class="flex justify-between items-center mt-auto pt-2">
          <p class="text-m font-medium text-gray-700 dark:text-gray-400">
            From
            <span class="font-bold">
              {{ PriceFormatter(pck.package_charge) }}

              {{ pck.package_charge_currency }}
            </span>
          </p>

          <a href="" class="text-sm text-pr hover:underline"> View Package </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { priceFormatter } from "#imports";

defineProps({
  packages: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
let PriceFormatter = priceFormatter;
</script>
