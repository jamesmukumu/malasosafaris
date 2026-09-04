<template>
  <div>
    <Header />
    <div
      class="safaris flex justify-center items-center min-h-screen w-full bg-cover bg-center"
      style="background-image: url(&quot;/images/angama.jpeg&quot;)"
    >
      <h1 class="text-white text-3xl md:text-4xl font-bold text-center">
        Explore top Accomodations in Kenya
      </h1>
    </div>

    <section class="py-4 bg-white" v-if="!pending">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-20">
          <h2
            class="text-4xl md:text-5xl font-light text-gray-900 tracking-wide"
          >
            Top Accommodations with Malaso Africa Safaris
          </h2>

          <p class="mt-6 text-lg leading-relaxed text-gray-600">
            At Malaso Africa Safaris, we understand that the right accommodation
            transforms a safari or corporate journey into an unforgettable
            experience. That’s why we partner with top-rated hotels, luxury
            lodges, boutique camps, and business-friendly resorts across Kenya
            and Africa to offer our guests world-class comfort, convenience, and
            value.
          </p>

          <div class="w-32 h-[1px] bg-pr mt-3 mx-auto"></div>
        </div>

        <div
          v-if="hotels.length"
          class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <NuxtLink
            :to="`/hotel/${hotel.slug}`"
            v-for="hotel in hotels"
            :key="hotel.id"
            class="flex relative cursor-pointer flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition grow-0 basis-[300px] md:basis-[320px] lg:basis-[350px]"
          >
            <div class="aspect-[4/3] overflow-hidden">
              <img
                :src="hotel.hotel_thumbnail"
                :alt="hotel.slug"
                class="w-full h-full object-cover hover:scale-105 transition duration-700"
              />
            </div>
            <div class="p-6 flex flex-col flex-grow">
              <h3 class="text-2xl font-light text-gray-900 mb-3">
                {{ hotel.hotel_name }}
              </h3>
              <div
                v-html="hotel.hotel_overview"
                class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
              ></div>

              <span
                v-if="hotel.ratings == 5"
                class="absolute top-2 right-2 bg-green-600 text-white text-m px-2 py-1 rounded"
              >
                Top Pick <Icon name="material-symbols:kid-star-outline" />
              </span>
            </div>
          </NuxtLink>
        </div>

        <div
          v-else
          class="max-w-2xl mx-auto rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center"
        >
          <h3 class="text-2xl font-semibold text-gray-900">
            No accommodations available yet
          </h3>
          <p class="mt-3 text-gray-600">
            Please check back soon for updated hotels and lodges.
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
      router.push("/hotels"); // keep page 1 clean
    } else {
      router.push(`/hotels/${value}`);
    }
  },
});

/* -------------------------
   Fetch blogs from API based on page
-------------------------- */
const { data, pending } = await useFetch(
  () => `/api/hotels?page=${currentPage.value}`,
  {
    default: () => ({ hotels: [], count: 0 }),
  },
);

/* -------------------------
   Extract reactive data
-------------------------- */
const hotels = computed(() => data.value?.hotels ?? []);
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
  if (page === 1) return "/hotels";
  return `/hotels/${page}`;
}

let Title =
  "Hotels | Discover  1000+ hotels in Kenya and East Africa. Book your favourite hotels in Masai Mara, Nairobi, Nakuru Mombasa and Nanyuki and get an exclusive experience for your safari in kenya";
let Descp =
  "Discover the best safari destinations in Kenya and Afrca with Malaso Africa Safaris. Explore unforgettable wildlife experiences, luxury safari lodges, beach escapes, and tailor-made tour packages across Maasai Mara, Diani, Amboseli, Serengeti, Zanzibar, and more.";
useSeoMeta({
  title: Title,
  description: Descp,
  ogTitle: Title,
  ogDescription: Descp,
  ogImage: "/og-image_v2.png",
});
</script>
