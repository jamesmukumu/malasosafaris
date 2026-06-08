<template>
  <div>
    <Header />
    <div
      class="safaris flex justify-center items-center min-h-screen w-full bg-cover bg-center"
      :style="{ backgroundImage: `url(${pck.package_category_image})` }"
    >
      <h1 class="text-white text-3xl md:text-4xl font-bold text-center">
        {{ pck.package_category_name }}
      </h1>
    </div>

    <section class="py-4 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-20">
          <h2
            v-html="pck.package_description"
            class="text-4xl md:text-5xl font-light text-gray-900 tracking-wide"
          ></h2>

          <p class="mt-6 text-lg leading-relaxed text-gray-600">
            Experience the perfect blend of coastal luxury and authentic African
            wilderness with Malaso Africa Safaris. From Kenya’s pristine shores
            to its world-renowned safari destinations, we curate tailor-made
            journeys that capture the best of both worlds.
          </p>

          <div class="w-32 h-[1px] bg-pr mt-3 mx-auto"></div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            :to="`/tour/${Pck.package_slug}`"
            :key="Pck.id"
            v-for="Pck in pck.packages"
            class="flex relative cursor-pointer flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition grow-0 basis-[300px] md:basis-[320px] lg:basis-[350px]"
          >
            <div class="aspect-[4/3] overflow-hidden">
              <img
                :src="Pck.package_photo"
                :alt="Pck.package_slug"
                class="w-full h-full object-cover hover:scale-105 transition duration-700"
              />
            </div>
            <div class="p-6 flex flex-col flex-grow">
              <h3 class="text-2xl font-light text-gray-900 mb-3">
                {{ Pck.package_title }}
              </h3>
              <div
                v-html="Pck.package_overview"
                class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
              ></div>
            </div>
            <div className="flex justify-between items-center mt-auto pt-2">
              <p
                className="text-m font-medium text-gray-700 dark:text-gray-400"
              >
                From {{ Pck.package_charge_currency }}
                <span className="font-bold">{{
                  pricer(Pck.package_charge)
                }}</span>
              </p>

              <span className="text-sm font-semibold text-pr hover:underline">
                View Package
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script setup>
let route = useRoute();
let slug = route.params.slug;
let { data, pending, error } = await useFetch("/api/package_category", {
  query: { slug },
});
let pck = ref(data.value.rows[0] ?? []);

let pricer = priceFormatter;

let Title = pck.value.package_category_name;
let Descp = pck.value.package_overview;
useSeoMeta({
  title: Title,
  description: Descp,
  ogTitle: Title,
  ogDescription: Descp,
  ogImage:
    "https://res.cloudinary.com/dasrniwpk/image/upload/v1763984726/adventures/hpywfcpb3qa60jynzngm.png",
});
</script>
