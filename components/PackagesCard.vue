<template>
   <div class="w-full flex justify-center p-6 overflow-y-hidden">
       <div
     
      class="mt-4 w-full   grid gap-6 sm:grid-cols-2 lg:grid-cols-3 "
    >
      <div
        v-for="pck in packages"
        :key="pck.id"
        class="
        flex relative cursor-pointer flex-col bg-white shadow-lg rounded-lg overflow-hidden
                         hover:shadow-xl transition
                         grow-0 basis-[300px] md:basis-[320px] lg:basis-[350px]
        "
      >
        <NuxtLink :to="`/tour/${pck.package_slug}`">
        <div class="aspect-[4/3] overflow-hidden">
            <img
            :src="pck.package_photo"
            :alt="pck.package_slug"
            class="w-full h-full object-cover hover:scale-105 transition duration-700"
          />
        </div>

          <h3 class="text-xl font-semibold text-gray-800 dark:text-white m-3">
            {{ pck.package_title }}
          </h3>
               <div
                v-html="pck.package_overview"
                class="text-sm text-gray-600 dark:text-gray-300 m-3 line-clamp-3"
              ></div>
        </NuxtLink>

        <div class="flex justify-between items-center mt-auto pt-2">
          <p class="text-m font-medium text-gray-700 dark:text-gray-400">
            From
            <span class="font-bold">
              {{ PriceFormatter(pck.package_charge) }}

              {{ pck.package_charge_currency }}
            </span>
          </p>

          <NuxtLink
          :to="`/tour/${pck.package_slug}`"
            class="text-sm  text-pr hover:underline"
          >
            View Package
          </NuxtLink>
        </div> 
      </div>
    </div>
   </div> 
</template>

<script setup>
import { priceFormatter } from '#imports';

defineProps({
packages:{
type:Array,
required:true
}
})
let PriceFormatter = priceFormatter


</script>