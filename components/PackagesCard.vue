<template>
   <div class="w-full grid place-content-center">
       <div
     
      class="mt-4 flex flex-wrap justify-start gap-4"
    >
      <div
        v-for="jeepPackage in packages"
        :key="jeepPackage.id"
        class="
          grow-0 shrink-0
          basis-full sm:basis-[48%] md:basis-[31%]
          bg-white dark:bg-gray-800
          rounded-xl shadow-md hover:shadow-xl
          transition-all duration-300 p-3 cursor-pointer
          flex flex-col 
        "
      >
        <a href="">
          <img
            :src="jeepPackage.PackagePhoto"
            alt=""
            class="w-full h-52 object-cover rounded mb-4"
          />

          <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {{ jeepPackage.packageTitle }}
          </h3>
        </a>

        <div class="flex justify-between items-center mt-auto pt-2">
          <p class="text-m font-medium text-gray-700 dark:text-gray-400">
            From
            <span class="font-bold">
              {{ jeepPackage.PackageCharge }}
              {{ jeepPackage.PackageChargeCurrency }}
            </span>
          </p>

          <a
            href=""
            class="text-sm  text-pr hover:underline"
          >
            View Package
          </a>
        </div>
      </div>
    </div>
   </div> 
</template>

<script setup>
defineProps({
packages:{
type:Array,
required:true
}
})
</script>