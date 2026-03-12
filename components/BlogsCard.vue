<template>
  <div class="max-w-6xl mx-auto px-4 py-10">
    <div class="text-center mb-16">
      <h2 class="heading-font text-4xl md:text-5xl font-bold text-black mb-4">
        Latest Travel Guides
      </h2>
      <div class="w-24 h-1 bg-[#bf4226] mx-auto"></div>
      <p class="text-gray-600 mt-6 max-w-2xl mx-auto">
        Always Keep yourself in the loop of the latest travel updates in Kenya
        and Africa
      </p>
    </div>

   <div class="w-full flex flex-col md:flex-row gap-6">
 <div class="flex flex-col md:flex-row gap-5 mb-10 w-full lg:w-2/3">
      <NuxtLink
      :to="`/blog/${blog.slug}`"
        v-for="blog in mainBlogs"
        :key="blog.id"
        class="group relative h-[420px] w-full overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300"
      >
        <img
          :src="blog.blog_photo"
          :alt="blog.slug"
          loading="lazy"
          class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div
          class="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-300"
        />

        <div
          class="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <h3
            class="mb-3 max-w-md text-2xl font-bold leading-tight text-white drop-shadow-lg"
          >
            {{ blog.blog_title }}
          </h3>

          <p class="text-sm text-gray-200">Posted:{{ formatter(blog.created_at) }} • Admin</p>

          <span
            class="mt-5 inline-flex items-center gap-1 text-sm font-medium text-white opacity-90 transition-all group-hover:gap-2"
          >
            Read Post
            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </NuxtLink>
    </div>

    <div class="space-y-4 lg:w-1/3">
      <div
    
        v-for="other in otherBlogs"
        :key="other.id"
        class="border-l-4 border-pr pl-4 py-2 hover:bg-gray-50 transition"
      >
        <NuxtLink  :to="`/blog/${other.slug}`" class="text-lg font-medium text-gray-800">{{ other.blog_title }}</NuxtLink>
        <p class="text-sm text-gray-600">Posted:{{ formatter(other.created_at) }} • Admin</p>
      </div>
    </div>
   </div>
  </div>
</template>

<script setup>

let formatter = DateFormatter
defineProps({
  mainBlogs: {
    type: Array,
    required: true,
  },
  otherBlogs: {
    type: Array,
  },
});
</script>
