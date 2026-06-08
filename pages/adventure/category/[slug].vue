<template>
  <div>
    <Header />
    <template v-if="adventure">
      <div
        class="safaris flex justify-center items-center min-h-screen w-full bg-cover bg-center"
        :style="{
          backgroundImage: `url(${adventure.adventure_category_image})`,
        }"
      >
        <h1 class="text-white text-3xl md:text-4xl font-bold text-center">
          {{ adventure.adventure_category_name }}
        </h1>
      </div>
    </template>

    <section class="py-4 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-20">
          <h2
            v-html="adventure.aventure_category_description"
            class="text-4xl md:text-5xl font-light text-gray-900 tracking-wide"
          ></h2>

          <p class="mt-6 text-lg leading-relaxed text-gray-600">
            Experience the perfect blend of coastal luxury and authentic African
            wilderness with PJ Safaris. From Kenya’s pristine shores to its
            world-renowned safari destinations, we curate tailor-made journeys
            that capture the best of both worlds.
          </p>

          <div class="w-32 h-[1px] bg-pr mt-3 mx-auto"></div>
        </div>

        <div
          v-if="adventure && adventure.adventures?.length"
          class="flex flex-wrap gap-6 items-stretch"
        >
          <NuxtLink
            :to="`/experience/${adv.slug}`"
            :key="adv.id"
            v-for="adv in adventure.adventures"
            class="flex relative cursor-pointer flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition grow-0 basis-[300px] md:basis-[320px] lg:basis-[350px]"
          >
            <div class="aspect-[4/3] overflow-hidden">
              <img
                :src="adv.adventure_photo"
                :alt="adv.slug"
                class="w-full h-full object-cover hover:scale-105 transition duration-700"
              />
            </div>
            <div class="p-6 flex flex-col flex-grow">
              <h3 class="text-2xl font-light text-gray-900 mb-3">
                {{ adv.name }}
              </h3>
              <div
                v-html="adv.adventure_overview"
                class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
              ></div>
            </div>
            <div className="flex justify-between items-center mt-auto pt-2">
              <p
                className="text-m font-medium text-gray-700 dark:text-gray-400"
              >
                From {{ adv.adventure_charge_currency }}
                <span className="font-bold">{{
                  pricer(adv.adventure_charges)
                }}</span>
              </p>

              <span className="text-sm font-semibold text-pr hover:underline">
                View Adventure
              </span>
            </div>
          </NuxtLink>
        </div>

        <div
          v-else
          class="max-w-2xl mx-auto rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center"
        >
          <h3 class="text-2xl font-semibold text-gray-900">
            No adventures found
          </h3>
          <p class="mt-3 text-gray-600">
            This adventure category has no adventures published yet.
          </p>
          <NuxtLink
            to="/adventure/category"
            class="mt-6 inline-flex rounded-md bg-pr px-5 py-3 text-white"
            >Back to categories</NuxtLink
          >
        </div>
      </div>
    </section>
    <template v-if="!adventure">
      <div
        class="max-w-3xl mx-auto my-16 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center"
      >
        <h1 class="text-3xl font-bold text-gray-900">Category not found</h1>
        <p class="mt-3 text-gray-600">
          The requested adventure category is unavailable or unpublished.
        </p>
        <NuxtLink
          to="/adventure/category"
          class="mt-6 inline-flex rounded-md bg-pr px-5 py-3 text-white"
          >Back to categories</NuxtLink
        >
      </div>
    </template>

    <Footer />
  </div>
</template>

<script setup>
const route = useRoute();
const slug = route.params.slug;
const { data, pending, error } = await useFetch("/api/adventure_category", {
  query: { slug },
  default: () => ({ rows: [] }),
});
const adventure = computed(() => data.value?.rows?.[0] ?? null);

const pricer = priceFormatter;

const Title = computed(
  () => adventure.value?.adventure_category_name ?? "Adventures",
);
const Descp = computed(
  () => adventure.value?.adventure_overview ?? "Explore our adventures",
);
useSeoMeta({
  title: Title,
  description: Descp,
  ogTitle: Title,
  ogDescription: Descp,
  ogImage:
    "https://res.cloudinary.com/dasrniwpk/image/upload/v1763984726/adventures/hpywfcpb3qa60jynzngm.png",
});
</script>
