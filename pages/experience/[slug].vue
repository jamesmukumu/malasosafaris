<template>
  <div class="bg-white overflow-x-hidden">
    <Header />

    <!-- HERO -->
    <div
      class="flex justify-center items-center h-[65vh] md:min-h-screen w-full bg-cover bg-center"
      :style="{ backgroundImage: `url(${adventure?.adventure_photo})` }"
    >
      <h1 class="text-white text-3xl md:text-4xl font-bold text-center">
        {{ adventure?.name }}
        (
        {{ adventure?.adventure_charge_currency }}
        <span class="font-bold">
          {{ adventure?.adventure_charges }}
        </span>
        )
      </h1>
    </div>

    <section class="max-w-7xl mx-auto px-6 mt-12">
      <h2
        class="text-4xl md:text-5xl text-center font-light text-gray-900 mb-10"
      >
        {{ adventure?.name }}
      </h2>

      <!-- TAB BUTTONS -->
      <div class="flex justify-center gap-4 mb-10 flex-wrap">
        <UButton
          class="cursor-pointer"
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          :variant="activeTab === tab.value ? 'solid' : 'outline'"
        >
          {{ tab.label }}
        </UButton>
      </div>

      <!-- TAB CONTENT -->

      <!-- OVERVIEW -->
      <div v-if="activeTab === 'overview'">
        <div
          class="text-lg text-gray-700 leading-relaxed"
          v-html="adventure?.adventure_overview"
        />

        <UCard class="mt-10">
          <h3 class="text-2xl font-bold text-center text-pr mb-6">
            Inclusions & Exclusions
          </h3>

          <div class="overflow-x-auto">
            <table class="min-w-full table-auto border-collapse">
              <thead>
                <tr class="bg-gray-100">
                  <th class="text-left text-teal-800 font-semibold p-3 border">
                    Price Includes
                  </th>

                  <th class="text-left text-red-800 font-semibold p-3 border">
                    Price Excludes
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(row, index) in inclusionsRows" :key="index">
                  <td class="p-3 border">
                    {{ row.inclusion }}
                  </td>

                  <td class="p-3 border">
                    {{ row.exclusion }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </UCard>

        <h3 class="text-2xl font-bold mt-10">Special Notes</h3>

        <div
          class="mt-4 text-lg text-gray-700 leading-relaxed"
          v-html="adventure?.special_notes"
        />
      </div>

      <!--Book  -->

      <section v-if="activeTab == 'book'">
        <BookingForm
          :message="`Hello MalasoAfrica Safaris, i would wish to join ${adventure?.name}`"
        />
      </section>

      <!-- PLAN -->
      <div v-if="activeTab === 'plan'">
        <div
          class="text-lg text-gray-700 leading-relaxed"
          v-html="adventure?.adventure_description"
        />
      </div>

      <!-- PHOTOS -->
      <div v-if="activeTab === 'photos'">
        <UCarousel
          v-if="adventure?.adventure_photos?.length"
          v-slot="{ item }"
          loop
          arrows
          :autoplay="{ delay: 2000 }"
          wheel-gestures
          :items="adventure.adventure_photos"
          :ui="{
            item: 'basis-full sm:basis-1/2 lg:basis-1/3 p-2',
            prev: 'sm:start-4',
            next: 'sm:end-4',
          }"
        >
          <div class="aspect-square overflow-hidden rounded-xl">
            <img
              :src="item"
              class="w-full h-full object-cover"
              :alt="adventure.slug"
            />
          </div>
        </UCarousel>
      </div>

      <!-- BOOK -->
      <div v-if="activeTab === 'book'">
        <div>
          <!-- <BookingsCard/> -->
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
const route = useRoute();
const slug = route.params.slug;

const { data } = await useFetch("/api/experience", {
  query: { slug },
});

const adventure = computed(() => data.value?.rows?.[0] || {});

const activeTab = ref("overview");

const tabs = [
  { label: "Overview", value: "overview" },
  { label: "Plan", value: "plan" },
  { label: "Photos", value: "photos" },
  { label: "Book", value: "book" },
];

const inclusionsRows = computed(() => {
  const inclusions = adventure.value?.adventure_inclusions
    ? adventure.value.adventure_inclusions.split(",")
    : [];

  const exclusions = adventure.value?.adventure_exclusions
    ? adventure.value.adventure_exclusions.split(",")
    : [];

  const max = Math.max(inclusions.length, exclusions.length);

  return Array.from({ length: max }).map((_, i) => ({
    inclusion: inclusions[i] || "",
    exclusion: exclusions[i] || (i === 1 ? "Nothing not mentioned" : ""),
  }));
});

let Title = adventure.value?.name;
let Descp = adventure.value?.adventure_overview;
useSeoMeta({
  title: Title,
  description: Descp,
  ogTitle: Title,
  ogDescription: Descp,
  ogImage: "/og-image_v2.png",
});
</script>
