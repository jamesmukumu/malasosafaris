<template>
  <div>
    <Header />

    <div
      class="safaris flex justify-center items-center min-h-screen w-full bg-cover bg-center"
      style="
        background-image: url(https://res.cloudinary.com/dasrniwpk/image/upload/v1765534493/mahale-mountains-national-park1_nhyl4h.jpg);
      "
    >
      <h1 class="text-white text-3xl md:text-4xl font-bold text-center">
        Attractions For The Eye Around Africa
      </h1>
    </div>
    <section class="py-4 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-20">
          <h2
            class="text-4xl md:text-5xl font-light text-gray-900 tracking-wide"
          >
            Discover Africa’s Top Attractions with PJ Safari's
          </h2>

          <p class="mt-6 text-lg leading-relaxed text-gray-600">
            Experience the sights that make Africa extraordinary—Malaso Africa
            Safaris style.
          </p>

          <div class="w-32 h-[1px] bg-pr mt-3 mx-auto"></div>
        </div>

        <div
          v-if="attractions.length"
          class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <NuxtLink
            :to="`/attraction/${attraction.attraction_slug}`"
            :key="attraction.id"
            v-for="attraction in attractions"
            class="flex relative cursor-pointer flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition grow-0 basis-[300px] md:basis-[320px] lg:basis-[350px]"
          >
            <div class="aspect-[4/3] overflow-hidden">
              <img
                :src="attraction.attraction_photo"
                :alt="attraction.attraction_name"
                class="w-full h-full object-cover hover:scale-105 transition duration-700"
              />
            </div>
            <div class="p-6 flex flex-col flex-grow">
              <h3 class="text-2xl font-light text-gray-900 mb-3">
                {{ attraction.attraction_name }}
              </h3>
              <div
                v-html="attraction.attraction_overview"
                class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
              ></div>
            </div>
            <span
              class="absolute top-2 right-2 bg-pr text-white text-m px-2 py-1 rounded"
            >
              {{ attraction.destination_title }}
            </span>
          </NuxtLink>
        </div>

        <div
          v-else
          class="max-w-2xl mx-auto rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center"
        >
          <h3 class="text-2xl font-semibold text-gray-900">
            No attractions available
          </h3>
          <p class="mt-3 text-gray-600">
            Please check back soon for new attractions and points of interest.
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

const currentPage = computed({
  get() {
    const p = parseInt(route.params.idx);
    return !p || p < 1 ? 1 : p;
  },
  set(value) {
    if (value === 1) {
      router.push("/attractions"); // keep page 1 clean
    } else {
      router.push(`/attractions/${value}`);
    }
  },
});

const { data, pending, error } = await useFetch(
  () => `/api/attractions?page=${currentPage.value}`,
  {
    default: () => ({ rows: [], count: 0 }),
  },
);

/* -------------------------
   Extract reactive data
-------------------------- */
const attractions = computed(() => data.value?.rows ?? []);
const total = computed(() => data.value?.count ?? 0);

/* -------------------------
   Calculate max pages
-------------------------- */
const maxPage = computed(() => Math.ceil(total.value / limit));

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
  if (page === 1) return "/attractions";
  return `/attractions/${page}`;
}

let Title = "Discover Africa’s Top Attractions with Malaso Africa Safaris";
let Descp =
  "Experience the breathtaking sights and unforgettable adventures that make Africa extraordinary with Malaso Africa Safaris, a leading tours and travel company in Kenya. Discover iconic safari destinations, diverse wildlife, stunning landscapes, and rich cultural experiences across Kenya and East Africa. From thrilling game drives in world-famous national parks to relaxing beach getaways and expertly guided tours, Malaso Africa Safaris creates personalized travel experiences for every type of traveler. Our team is dedicated to delivering exceptional service, carefully planned itineraries, and authentic African adventures that showcase the beauty of the continent. Whether you are planning a luxury safari, family holiday, honeymoon, or group adventure, Malaso Africa Safaris ensures a seamless and memorable journey from start to finish. Explore Africa the Malaso Africa Safaris way and create lasting memories with trusted local experts who understand the true spirit of African travel";
useSeoMeta({
  title: Title,
  description: Descp,
  ogTitle: Title,
  ogDescription: Descp,
  ogImage:
    "https://res.cloudinary.com/dasrniwpk/image/upload/v1763984726/adventures/hpywfcpb3qa60jynzngm.png",
});
</script>
