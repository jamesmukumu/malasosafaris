<template>
  <div>
    <Header />

    <!-- HERO -->
    <div
      class="flex justify-center items-center min-h-screen w-full bg-cover bg-center"
      style="background-image: url(&quot;/images/sopa-lodge.jpeg&quot;)"
    >
      <h1 class="text-white text-3xl md:text-4xl font-bold text-center">
        Explore the Latest Travel Updates
      </h1>
    </div>

    <div class="max-w-[900px] mx-auto px-4 my-8">
      <div v-if="blogs.length">
        <NuxtLink
          v-for="blog in blogs"
          :key="blog.id"
          :to="`/blog/${blog.slug}`"
          class="flex flex-col md:flex-row gap-8 my-4 p-4 bg-white rounded-lg shadow-md"
        >
          <div class="w-full md:w-[400px] h-[250px] flex-shrink-0">
            <img
              :src="blog.blog_photo"
              :alt="blog.blog_title"
              class="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div class="flex flex-col justify-between flex-1">
            <h2 class="text-xl font-semibold line-clamp-2">
              {{ blog.blog_title }}
            </h2>
            <NuxtLink
              :to="`/blog/${blog.slug}`"
              class="mt-5 inline-flex items-center justify-center px-6 py-3 bg-pr text-white font-semibold rounded-md"
            >
              Read Blog
            </NuxtLink>
          </div>
        </NuxtLink>
      </div>

      <div
        v-else
        class="text-center py-12 rounded-lg bg-gray-50 border border-dashed border-gray-200"
      >
        <h3 class="text-2xl font-semibold">No blog posts yet</h3>
        <p class="mt-3 text-gray-600">
          Please check back soon for travel updates and articles.
        </p>
      </div>
    </div>

    <!-- PAGINATION -->
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

const limit = 3;

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

/* -------------------------
  Fetch blogs from API based on page
-------------------------- */
const { data } = await useFetch(() => `/api/blogs?page=${currentPage.value}`, {
  default: () => ({ rows: [], count: 0 }),
});

/* -------------------------
   Extract reactive data
-------------------------- */
const blogs = computed(() => data.value?.rows ?? []);
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
  if (page === 1) return "/blogs";
  return `/blogs/${page}`;
}

let Title = "PJ Safaris Travel Posts";
let Descp =
  "Get information on Masai mara safaris, wildlife guides, travel planning advice, and the latest updates on the Masai Mara. Read expert blogs to make your safari unforgettable";
useSeoMeta({
  title: Title,
  description: Descp,
  ogTitle: Title,
  ogDescription: Descp,
  ogImage:
    "https://res.cloudinary.com/dasrniwpk/image/upload/v1763984726/adventures/hpywfcpb3qa60jynzngm.png",
});
</script>
