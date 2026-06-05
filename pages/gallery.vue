<template>
  <div>
    <Header />

    <!-- Hero Section -->
    <div
      class="relative flex justify-center items-center min-h-screen w-full bg-cover bg-center bg-scroll md:bg-fixed"
      :style="{
        backgroundImage: `url(/images/fold3/Amboseli.jpeg)`,
      }"
    >
      <div
        class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50"
      ></div>
      <div class="relative z-10 text-center px-4">
        <h1
          class="text-white text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-lg"
        >
          Wildlife encounters, coastal escapes, city scenes, and guest memories.<br class="hidden md:block" />
          Around Africa
        </h1>
        <p class="text-white/80 text-lg md:text-xl font-light drop-shadow">
          Discover the most stunning locations across the African continent
        </p>
      </div>
    </div>

    <!-- Photo Stories Section -->
    <section
      class="py-20 px-4 md:px-8 bg-gradient-to-b from-white via-gray-50 to-white"
    >
      <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="mb-16">
          <div class="mb-6">
            <p
              class="text-pr text-sm font-bold tracking-widest uppercase mb-2"
            >
              <UIcon name="material-symbols:planet-rounded"/> Photo Stories by Category
            </p>
            <div
              class="w-12 h-1 bg-gradient-to-r from-amber-pr to-amber-pr rounded-full"
            ></div>
          </div>

          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start"
          >
            <div>
              <h2
                class="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-gray-900 mb-4"
              >
                Choose a category and explore
              </h2>
              <p class="text-2xl md:text-3xl font-light text-gray-700">
                the kind of scenery you want in your safari plan.
              </p>
            </div>
            <div class="space-y-4">
              <p class="text-gray-600 text-lg leading-relaxed">
                Wildlife, beaches, cities, lodges, culture, and landscape photos
                are grouped so you can quickly find the style of travel that
                matches your next Olanka itinerary.
              </p>
              <div class="flex flex-wrap gap-2 pt-4">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700"
                >
                  📸 22 High-Quality Images
                </span>
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700"
                >
                  🌍 Featured Locations
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Category Filters -->
        <div class="mb-14 pb-8 border-b border-gray-200">
          <p
            class="text-gray-600 text-sm font-semibold mb-4 uppercase tracking-wide"
          >
            Filter by category
          </p>
          <div class="flex flex-wrap gap-2 md:gap-3">
            <button
              v-for="category in categories"
              :key="category.name"
              @click="selectedCategory = category.name"
              :class="[
                'px-4 md:px-5 py-2 md:py-3 rounded-full font-semibold text-sm transition-all duration-300 transform hover:-translate-y-1',
                selectedCategory === category.name
                  ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-xl shadow-gray-900/30'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md',
              ]"
            >
              {{ category.name }}
              <span class="ml-1.5 opacity-70 font-medium">{{
                category.count
              }}</span>
            </button>
          </div>
        </div>

        <!-- Gallery Grid -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <div
            v-for="(image, index) in filteredImages"
            :key="image.id"
            class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105"
            @click="openLightbox(index)"
          >
            <!-- Image Container -->
            <div class="relative h-80 overflow-hidden bg-gray-900">
              <img
                :src="image.thumbnail"
                :alt="image.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                loading="lazy"
              />

              <!-- Gradient Overlays -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"
              ></div>
              <div
                class="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>
            </div>

            <!-- Content Overlay -->
            <div
              class="absolute inset-0 flex flex-col justify-between p-5 md:p-6 text-white"
            >
              <!-- Top: Category Badge -->
              <div class="flex justify-between items-start">
                <span
                  class="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full shadow-lg"
                >
                  {{ image.category }}
                </span>
                <svg
                  class="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                  ></path>
                </svg>
              </div>

              <!-- Bottom: Title, Description, Location -->
              <div
                class="space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
              >
                <h3
                  class="text-2xl md:text-3xl font-bold leading-tight drop-shadow-lg"
                >
                  {{ image.title }}
                </h3>
                <p
                  class="text-gray-100 text-sm md:text-base leading-relaxed drop-shadow-md hidden group-hover:block transition-all duration-300"
                >
                  {{ image.description }}
                </p>
                <div
                  class="flex items-center space-x-2 text-gray-200 text-xs md:text-sm font-semibold uppercase tracking-wider pt-2"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                    />
                  </svg>
                  <span>{{ image.location }}</span>
                </div>
              </div>
            </div>

            <!-- Border Animation -->
            <div
              class="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-amber-400 transition-colors duration-500 pointer-events-none opacity-0 group-hover:opacity-100"
            ></div>
          </div>
        </div>

        <!-- No Results -->
        <div v-if="filteredImages.length === 0" class="text-center py-20">
          <svg
            class="w-16 h-16 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          <p class="text-gray-500 text-lg font-medium">
            No images found in this category.
          </p>
        </div>
      </div>
    </section>

    <!-- HeadlessUI Lightbox Modal -->
    <TransitionRoot :show="isLightboxOpen" as="template">
      <Dialog
        as="div"
        @close="closeLightbox"
        class="fixed inset-0 z-50 overflow-y-auto"
      >
        <div class="flex min-h-screen items-center justify-center">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogBackdrop
              class="fixed inset-0 bg-black/95 backdrop-blur-sm"
            />
          </TransitionChild>

          <!-- Close Button -->
          <button
            @click="closeLightbox"
            class="absolute top-6 right-6 z-50 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-md border border-white/20"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          <!-- Main Content -->
          <div
            class="h-full flex flex-col md:flex-row items-center justify-center px-4 md:px-8 py-8 md:py-0 w-full max-w-6xl"
          >
            <!-- Left Navigation -->
            <button
              v-if="currentImageIndex > 0"
              @click="previousImage"
              class="absolute left-6 top-1/2 transform -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-md border border-white/20"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>

            <!-- Image Section -->
            <div
              class="w-full md:w-2/3 flex items-center justify-center mb-8 md:mb-0"
            >
              <div class="relative max-w-4xl w-full">
                <img
                  v-if="selectedImage"
                  :src="selectedImage.src"
                  :alt="selectedImage.title"
                  class="w-full h-auto max-h-[60vh] md:max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />
                <div
                  v-else
                  class="w-full h-96 md:h-[70vh] bg-gray-800 rounded-lg animate-pulse"
                ></div>
              </div>
            </div>

            <!-- Right Navigation -->
            <button
              v-if="currentImageIndex < filteredImages.length - 1"
              @click="nextImage"
              class="absolute right-6 top-1/2 transform -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-md border border-white/20"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>

            <!-- Info Section -->
            <div
              v-if="selectedImage"
              class="w-full md:w-1/3 md:pl-8 text-white space-y-6"
            >
              <!-- Category Badge -->
              <div>
                <span
                  class="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold uppercase px-4 py-2 rounded-full shadow-lg"
                >
                  {{ selectedImage.category }}
                </span>
              </div>

              <!-- Title -->
              <div>
                <h2 class="text-3xl md:text-4xl font-bold mb-2 leading-tight">
                  {{ selectedImage.title }}
                </h2>
                <div
                  class="w-12 h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                ></div>
              </div>

              <!-- Description -->
              <div class="space-y-2">
                <p class="text-gray-300 text-base leading-relaxed">
                  {{ selectedImage.description }}
                </p>
              </div>

              <!-- Location -->
              <div class="pt-6 border-t border-white/10">
                <p class="text-gray-400 text-sm uppercase tracking-wider mb-2">
                  📍 Location
                </p>
                <p class="text-white text-lg font-semibold">
                  {{ selectedImage.location }}
                </p>
              </div>

              <!-- Image Counter -->
              <div
                class="flex items-center justify-between pt-6 border-t border-white/10"
              >
                <p class="text-gray-400 text-sm">
                  Image
                  <span class="text-amber-400 font-bold">{{
                    currentImageIndex + 1
                  }}</span>
                  of
                  <span class="text-amber-400 font-bold">{{
                    filteredImages.length
                  }}</span>
                </p>
                <div class="flex gap-2">
                  <button
                    v-for="(_, idx) in filteredImages"
                    :key="idx"
                    @click="goToImage(idx)"
                    :class="[
                      'w-2 h-2 rounded-full transition-all duration-300',
                      idx === currentImageIndex
                        ? 'bg-amber-400 w-8'
                        : 'bg-gray-600 hover:bg-gray-400',
                    ]"
                  ></button>
                </div>
              </div>

              <!-- Keyboard Instructions -->
              <div class="text-xs text-gray-500 pt-4">
                <p>💡 Use arrow keys or buttons to navigate</p>
              </div>
            </div>
          </div>

          <!-- Bottom Progress Bar -->
          <div class="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <div
              class="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300"
              :style="{
                width: `${((currentImageIndex + 1) / filteredImages.length) * 100}%`,
              }"
            ></div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import {
  Dialog,
  DialogBackdrop,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

const selectedCategory = ref("ALL PHOTOS");
const isLightboxOpen = ref(false);
const selectedImage = ref(null);
const currentImageIndex = ref(0);

const categories = [
  { name: "ALL PHOTOS", count: 22 },
  { name: "SAFARI", count: 3 },
  { name: "WILDLIFE", count: 5 },
  { name: "BEACHES", count: 2 },
  { name: "CULTURE", count: 2 },
  { name: "VIEWS", count: 8 },
  { name: "ACCOMMODATIONS", count: 2 },
];

const images = [
  {
    id: 1,
    title: "Maasai Culture",
    description:
      "Immerse yourself in the rich traditions of the Maasai people. Experience their vibrant culture and ancestral way of life in this stunning portrait of African heritage.",
    category: "CULTURE",
    location: "MAASAI LAND",
    thumbnail: "/images/fold2/maasai-dest.jpeg",
    src: "/images/fold2/maasai-dest.jpeg",
  },
  {
    id: 2,
    title: "Golden Hour Sunset",
    description:
      "Witness the spectacular golden hour as the sun dips below the horizon, painting the sky in magnificent shades of orange and amber across the African landscape.",
    category: "VIEWS",
    location: "AFRICAN PLAINS",
    thumbnail: "/images/fold2/sun.jpeg",
    src: "/images/fold2/sun.jpeg",
  },
  {
    id: 3,
    title: "Serene Beach Paradise",
    description:
      "Discover pristine white sand beaches with crystal-clear turquoise waters. A perfect escape combining beach serenity with the warm hospitality of Kenya's coastal regions.",
    category: "BEACHES",
    location: "COASTAL KENYA",
    thumbnail: "/images/fold2/WhatsApp Image 2026-05-30 at 9.20.00 AM (1).jpeg",
    src: "/images/fold2/WhatsApp Image 2026-05-30 at 9.20.00 AM (1).jpeg",
  },
  {
    id: 4,
    title: "Scenic Landscape",
    description:
      "Panoramic views of Africa's most breathtaking natural landscapes. Rolling hills, vast plains, and stunning natural formations create a tapestry of natural beauty.",
    category: "VIEWS",
    location: "AFRICAN WILDERNESS",
    thumbnail: "/images/fold2/WhatsApp Image 2026-05-30 at 9.20.00 AM (2).jpeg",
    src: "/images/fold2/WhatsApp Image 2026-05-30 at 9.20.00 AM (2).jpeg",
  },
  {
    id: 5,
    title: "Nature's Wonder",
    description:
      "Marvel at the natural wonders of Africa. From breathtaking vistas to hidden gems, each view tells a story of the continent's diverse and rich landscape.",
    category: "VIEWS",
    location: "AFRICAN NATURE",
    thumbnail: "/images/fold2/WhatsApp Image 2026-05-30 at 9.20.00 AM (3).jpeg",
    src: "/images/fold2/WhatsApp Image 2026-05-30 at 9.20.00 AM (3).jpeg",
  },
  {
    id: 6,
    title: "Amboseli National Park",
    description:
      "Experience the iconic Amboseli National Park with its vast elephants and pristine wilderness. A true safari adventure awaits in this magnificent ecosystem.",
    category: "SAFARI",
    location: "AMBOSELI",
    thumbnail: "/images/fold3/Amboseli.jpeg",
    src: "/images/fold3/Amboseli.jpeg",
  },
  {
    id: 7,
    title: "Majestic Cheetah",
    description:
      "Encounter the grace and speed of Africa's fastest predator. Witness the Cheetah in its natural habitat, a symbol of African wildlife excellence and power.",
    category: "WILDLIFE",
    location: "SAVANNA",
    thumbnail: "/images/fold3/Cheetah.jpeg",
    src: "/images/fold3/Cheetah.jpeg",
  },
  {
    id: 8,
    title: "Elephant at Amboseli",
    description:
      "Stand in awe of Africa's largest land mammals. These gentle giants roam the Amboseli plains, creating unforgettable moments for wildlife enthusiasts.",
    category: "WILDLIFE",
    location: "AMBOSELI",
    thumbnail: "/images/fold3/elephant-amboseli.jpeg",
    src: "/images/fold3/elephant-amboseli.jpeg",
  },
  {
    id: 9,
    title: "Luxury Accommodations",
    description:
      "Experience world-class hospitality in African luxury lodges. Premium accommodations that blend comfort with the authentic safari experience.",
    category: "ACCOMMODATIONS",
    location: "KENYA",
    thumbnail: "/images/fold3/hotels-new.jpeg",
    src: "/images/fold3/hotels-new.jpeg",
  },
  {
    id: 10,
    title: "Lions in Action",
    description:
      "Witness the raw power and majesty of African lions in their natural habitat. An unforgettable encounter with the kings of the savanna.",
    category: "WILDLIFE",
    location: "SERENGETI",
    thumbnail: "/images/fold3/lions-devouring-meat.jpeg",
    src: "/images/fold3/lions-devouring-meat.jpeg",
  },
  {
    id: 11,
    title: "Mountain Lion Vista",
    description:
      "Panoramic views combining mountains and wildlife. Experience the dramatic landscapes where Africa's most iconic predators roam freely.",
    category: "VIEWS",
    location: "MOUNTAIN RANGES",
    thumbnail: "/images/fold3/mt-lion.jpeg",
    src: "/images/fold3/mt-lion.jpeg",
  },
  {
    id: 12,
    title: "Underwater Adventure",
    description:
      "Explore the vibrant marine world beneath the waves. Scuba diving reveals Africa's hidden aquatic treasures and colorful coral ecosystems.",
    category: "BEACHES",
    location: "MOMBASA",
    thumbnail: "/images/fold3/scuba-diving.jpeg",
    src: "/images/fold3/scuba-diving.jpeg",
  },
  {
    id: 13,
    title: "Coastal Beauty",
    description:
      "Discover the pristine beauty of Africa's coastlines. Where land meets sea in perfect harmony, creating moments of pure tranquility.",
    category: "VIEWS",
    location: "COASTAL REGIONS",
    thumbnail: "/images/fold3/WhatsApp Image 2026-05-30 at 9.19.56 AM (1).jpeg",
    src: "/images/fold3/WhatsApp Image 2026-05-30 at 9.19.56 AM (1).jpeg",
  },
  {
    id: 14,
    title: "Safari Expedition",
    description:
      "Join an exciting safari expedition across Africa's most renowned wildlife reserves. Professional guides lead you through thrilling wildlife encounters.",
    category: "SAFARI",
    location: "WILDLIFE RESERVES",
    thumbnail: "/images/fold3/WhatsApp Image 2026-05-30 at 9.19.57 AM (3).jpeg",
    src: "/images/fold3/WhatsApp Image 2026-05-30 at 9.19.57 AM (3).jpeg",
  },
  {
    id: 15,
    title: "Heritage Stays",
    description:
      "Experience authentic African hospitality in heritage accommodations. Blend of traditional charm and modern comfort in perfect locations.",
    category: "ACCOMMODATIONS",
    location: "TRADITIONAL LODGES",
    thumbnail: "/images/fold3/accomodations.jpeg",
    src: "/images/fold3/accomodations.jpeg",
  },
  {
    id: 16,
    title: "Wildlife Habitat",
    description:
      "Explore the diverse habitats where Africa's wildlife thrives. From grasslands to forests, each ecosystem tells its own unique story.",
    category: "WILDLIFE",
    location: "NATIONAL PARKS",
    thumbnail: "/images/fold3/WhatsApp Image 2026-05-30 at 9.19.58 AM (2).jpeg",
    src: "/images/fold3/WhatsApp Image 2026-05-30 at 9.19.58 AM (2).jpeg",
  },
  {
    id: 17,
    title: "Landscape Vista",
    description:
      "Sweeping landscape views that showcase Africa's incredible natural diversity and scale. Views that will take your breath away.",
    category: "VIEWS",
    location: "HORIZONS",
    thumbnail: "/images/fold3/WhatsApp Image 2026-05-30 at 9.19.59 AM (2).jpeg",
    src: "/images/fold3/WhatsApp Image 2026-05-30 at 9.19.59 AM (2).jpeg",
  },
  {
    id: 18,
    title: "Wildebeest Migration",
    description:
      "Witness one of nature's greatest spectacles. The annual wildebeest migration showcases the raw power and drama of African wildlife.",
    category: "WILDLIFE",
    location: "SERENGETI",
    thumbnail: "/images/fold3/wildebeest.jpeg",
    src: "/images/fold3/wildebeest.jpeg",
  },
  {
    id: 19,
    title: "Nature's Panorama",
    description:
      "Wide-angle views of Africa's most stunning panoramas. Each frame is a masterpiece of natural landscape photography.",
    category: "VIEWS",
    location: "SCENIC OVERLOOKS",
    thumbnail: "/images/fold2/WhatsApp Image 2026-05-30 at 9.20.00 AM (1).jpeg",
    src: "/images/fold2/WhatsApp Image 2026-05-30 at 9.20.00 AM (1).jpeg",
  },
  {
    id: 20,
    title: "Cultural Treasure",
    description:
      "Dive deep into African cultural heritage. Experience traditions, crafts, and customs that have been preserved through generations.",
    category: "CULTURE",
    location: "CULTURAL CENTERS",
    thumbnail: "/images/fold2/WhatsApp Image 2026-05-30 at 9.20.00 AM (3).jpeg",
    src: "/images/fold2/WhatsApp Image 2026-05-30 at 9.20.00 AM (3).jpeg",
  },
  {
    id: 21,
    title: "Golden Plains",
    description:
      "Experience the vast golden plains of Africa where wildlife roams freely and nature rules supreme. Perfect for photography enthusiasts.",
    category: "VIEWS",
    location: "PLAINS",
    thumbnail: "/images/fold2/sun.jpeg",
    src: "/images/fold2/sun.jpeg",
  },
  {
    id: 22,
    title: "Pristine Beaches",
    description:
      "Relax on beautiful untouched beaches with pristine white sand. A tropical paradise waiting to be discovered along Africa's coastlines.",
    category: "BEACHES",
    location: "COASTAL PARADISE",
    thumbnail: "/images/fold3/scuba-diving.jpeg",
    src: "/images/fold3/scuba-diving.jpeg",
  },
];

const filteredImages = computed(() => {
  if (selectedCategory.value === "ALL PHOTOS") {
    return images;
  }
  return images.filter((img) => img.category === selectedCategory.value);
});

const openLightbox = (index) => {
  selectedImage.value = filteredImages.value[index];
  currentImageIndex.value = index;
  isLightboxOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  isLightboxOpen.value = false;
  selectedImage.value = null;
  document.body.style.overflow = "auto";
};

const nextImage = () => {
  if (currentImageIndex.value < filteredImages.value.length - 1) {
    currentImageIndex.value++;
    selectedImage.value = filteredImages.value[currentImageIndex.value];
  }
};

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
    selectedImage.value = filteredImages.value[currentImageIndex.value];
  }
};

const goToImage = (index) => {
  currentImageIndex.value = index;
  selectedImage.value = filteredImages.value[index];
};

const handleKeyboard = (e) => {
  if (!isLightboxOpen.value) return;

  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") previousImage();
  if (e.key === "Escape") closeLightbox();
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyboard);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyboard);
  document.body.style.overflow = "auto";
});
</script>
