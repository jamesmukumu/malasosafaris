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

        <div class="w-full flex justify-center">
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
      </div>
    </section>

    <div class="flex justify-center my-10">
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
      router.push("/blogs"); // keep page 1 clean
    } else {
      router.push(`/blogs/${value}`);
    }
  },
});

const { data } = await useFetch(
  () => `/api/destinations?page=${currentPage.value}`,
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
  currentPage.value > maxPage.value
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
  title: "Discover Africa’s Top Travel Destinations with PJ Safaris",
  description:
    "Discover the best safari destinations in Kenya and Africa with PJ Safaris. Explore unforgettable wildlife experiences, luxury safari lodges, beach escapes, and tailor-made tour packages across Maasai Mara, Diani, Amboseli, Serengeti, Zanzibar, and more.",
  ogTitle: "Discover Africa’s Top Travel Destinations with PJ Safaris",
  ogDescription:
    "Discover the best safari destinations in Kenya and Africa with PJ Safaris. Explore unforgettable wildlife experiences, luxury safari lodges, beach escapes, and tailor-made tour packages across Maasai Mara, Diani, Amboseli, Serengeti, Zanzibar, and more.",
  ogImage:
    "https://res.cloudinary.com/dasrniwpk/image/upload/v1763984726/adventures/hpywfcpb3qa60jynzngm.png",
});
</script>
