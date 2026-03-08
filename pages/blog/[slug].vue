<template>
  <div>
    <Header />

    <div
      class="flex flex-col lg:flex-row justify-center items-start gap-8 w-full max-w-[1300px] mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-8 m-2 sm:m-5"
    >
      <div
        class="flex flex-col gap-6 flex-[2] w-full lg:max-w-[850px] self-start"
      >
        <h1 class="text-3xl font-bold">{{ blog.blog_title }}</h1>

        <div class="w-full">
          <img
            :src="blog.blog_photo"
            :alt="blog.slug"
            class="w-full max-h-[400px] object-cover rounded-sm"
          />
        </div>

        <div
          class="prose flex flex-col gap-2"
          v-html="blog.blog_description"
        ></div>
      </div>

      <aside class="w-full lg:flex-1 lg:max-w-[350px] self-start">
        <RecommendationBlogs :blogs="relatedBlogs"/>
      </aside>
    </div>
    <Footer/>
  </div>
</template>

<script setup>
let route = useRoute();

let slug = route.params.slug;
let { data, pending, error } = await useFetch("/api/blog", {
  query: { slug },
});
let blog = ref(data.value.blog[0]);
let relatedBlogs = ref(data.value.related_blogs ?? [])

</script>
