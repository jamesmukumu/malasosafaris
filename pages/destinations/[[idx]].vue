<template>
  <div>
    <Header />

    <div
      class="safaris flex justify-center items-center min-h-screen w-full bg-cover bg-center"
      :style="{ backgroundImage: 'url(/images/fold2/maasai-dest.jpeg)' }"
    >
      <h1 class="text-white text-3xl md:text-4xl font-bold text-center">
        Explore top safari destinations in Kenya
      </h1>
    </div>
    <section class="py-4 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-20">
          <h2
            class="text-4xl md:text-5xl font-light text-gray-900 tracking-wide"
          >
            Discover Africa’s Top Travel Destinations with Malaso Africa Safaris
          </h2>

          <p class="mt-6 text-lg leading-relaxed text-gray-600">
            Discover the best safari destinations in Kenya and Africa with
            Malaso Africa Safaris. Explore unforgettable wildlife experiences,
            luxury safari lodges, beach escapes, and tailor-made tour packages
            across Maasai Mara, Diani, Amboseli, Serengeti, Zanzibar, and more.
          </p>

          <div class="w-32 h-[1px] bg-pr mt-3 mx-auto"></div>
        </div>

        <div v-if="destinations.length" class="w-full flex justify-center">
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <NuxtLink
              :to="`/destination/${destination.destination_slug}`"
              v-for="destination in destinations"
              :key="destination.id"
              class="flex relative cursor-pointer flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition grow-0 basis-[300px] md:basis-[320px] lg:basis-[350px]"
            >
              <div class="aspect-[4/3] overflow-hidden">
                <img
                  :src="destination.destination_photo"
                  :alt="destination.destination_slug"
                  class="w-full h-full object-cover hover:scale-105 transition duration-700"
                />
              </div>
              <div class="p-6 flex flex-col flex-grow">
                <h3 class="text-2xl font-light text-gray-900 mb-3">
                  {{ destination.destination_title }}
                </h3>
                <div
                  v-html="destination.destination_overview"
                  class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
                ></div>
              </div>
              <span
                class="absolute top-2 right-2 bg-pr text-white text-m px-2 py-1 rounded"
              >
                {{ destination.packages_count }}
                {{ destination.packages_count > 1 ? "Safaris" : "Safari" }}
              </span>
            </NuxtLink>
          </div>
        </div>

        <div
          v-else
          class="max-w-2xl mx-auto rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center"
        >
          <h3 class="text-2xl font-semibold text-gray-900">
            No destinations available yet
          </h3>
          <p class="mt-3 text-gray-600">
            Please check back soon for updated travel destinations.
          </p>
        </div>
      </div>
    </section>

    <div v-if="total > limit" class="flex justify-center my-10">
      <UPagination
        v-model:page="currentPage"
        :items-per-page="limit"
        :total="total"
        :to="toLink"
        :sibling-count="1"
        show-edges
        color="green"
        variant="solid"
      />
    </div>
    <Footer />
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();

const limit = 6;

/* -------------------------
   Writable current page from route param
-------------------------- */
const currentPage = computed({
  get() {
    const p = parseInt(route.params.idx);
    return !p || p < 1 ? 1 : p;
  },
  set(value) {
    if (value === 1) {
      router.push("/destinations");
    } else {
      router.push(`/blogs/${value}`);
    }
  },
});

const { data } = await useFetch(
  () => `/api/destinations?page=${currentPage.value}`,
  {
    default: () => ({ rows: [], count: 0 }),
  },
);

const destinations = computed(() => data.value?.rows ?? []);
const total = computed(() => data.value?.count ?? 0);

/* -------------------------
   Calculate max pages
-------------------------- */
const maxPage = computed(() => Math.ceil(total.value / limit));

/* -------------------------
   Throw error if page is invalid
-------------------------- */
if (
  isNaN(currentPage.value) ||
  currentPage.value < 1 ||
  (total.value > 0 && currentPage.value > maxPage.value)
) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

/* -------------------------
   Link generator using route params
-------------------------- */
function toLink(page) {
  if (page === 1) return "/destinations";
  return `/destinations/${page}`;
}

useSeoMeta({
  title: "Discover Africa’s Top Travel Destinations with Malaso Africa Safaris",
  description:
    "Discover the best safari destinations in Kenya and Africa with Malaso Africa Safaris. Explore unforgettable wildlife experiences, luxury safari lodges, beach escapes, and tailor-made tour packages across Maasai Mara, Diani, Amboseli, Serengeti, Zanzibar, and more.",
  ogTitle:
    "Discover Africa’s Top Travel Destinations with Malaso Africa Safaris",
  ogDescription:
    "Discover the best safari destinations in Kenya and Africa with Malaso Africa Safaris. Explore unforgettable wildlife experiences, luxury safari lodges, beach escapes, and tailor-made tour packages across Maasai Mara, Diani, Amboseli, Serengeti, Zanzibar, and more.",
  ogImage: "/og-image_v2.png",
});
</script>
