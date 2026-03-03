<template>
  <section class="px-4 py-8 w-full">
    <h1 class="text-3xl font-bold text-center mb-8">Related Travel Posts</h1>

    <div class="flex flex-col w-full">
      <div
        v-for="blog in blogs"
        :key="blog.slug"
        class="flex mt-2 flex-col w-full cursor-pointer rounded-lg bg-white shadow-md hover:shadow-lg transition duration-300 ease-in-out overflow-hidden"
      >
        <div class="w-full mt-2">
          <img
            :src="blog.blog_photo"
            :alt="blog.slug"
            class="w-full max-h-[300px] object-cover"
          />
        </div>

        <div class="flex flex-col items-center p-4 space-y-4">
          <h2 class="text-xl font-semibold text-center">
            {{ blog.blog_title }}
          </h2>

          <NuxtLink
            :to="`/blog/${blog.slug}`"
            class="inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-md bg-pr shadow-sm transition hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            Read Blog
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  blogs: {
    type: Array,
    required: true,
  },
});
</script>
