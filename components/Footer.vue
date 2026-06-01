<template>
  <footer class="bg-pr">
    <!-- <Toast ref={toastRef} position="top-right"/> -->
    <div class="container px-6 py-12 mx-auto">
      <div class="md:flex md:-mx-3 md:items-center md:justify-between">
        <h1
          class="text-xl font-semibold tracking-tight text-white md:mx-3 xl:text-2xl"
        >
          Join Us Now to get latest travel updates.
        </h1>

        <div class="sm:col-span-2">
          <h1
            class="max-w-lg text-xl font-semibold tracking-tight text-white xl:text-2xl"
          >
            Subscribe our newsletter to get travel updates.
          </h1>

          <div
            class="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row"
          >
            <input
              name="newsletter"
              id="email"
              type="text"
              class="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
              placeholder="Email Address"
              v-model="email"
            />

            <button
              @click="SaveEmail"
              class="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <hr class="my-6 border-whit md:my-10" />

      <div
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <div>
          <a href="/">
            <img
              class="w-auto h-7"
              src="/images/home/malaso-logo.png"
              alt="logo"
            />
          </a>
          <h1 class="font-semibold text-xl text-white">Destinations</h1>
          <div class="flex flex-col items-start mt-5 space-y-2">
            <NuxtLink
              to="/destination/Tsavo-West"
              class="transition-colors duration-300 text-white hover:underline"
            >
              Tsavo West
            </NuxtLink>
            <NuxtLink
              to="/destination/Lake-Naivasha"
              class="transition-colors duration-300 text-white hover:underline"
            >
              Naivasha
            </NuxtLink>
            <NuxtLink
              to="/destination/Maasai-Mara"
              class="transition-colors duration-300 text-white hover:underline"
            >
              Maasai Mara
            </NuxtLink>
            <NuxtLink
              to="/destination/Amboseli"
              class="transition-colors duration-300 text-white hover:underline"
            >
              Amboseli
            </NuxtLink>

            <NuxtLink
              to="/destination/Samburu"
              class="transition-colors duration-300 text-white hover:underline"
            >
              Samburu
            </NuxtLink>
          </div>
        </div>

        <div>
          <p class="font-semibold text-xl text-white">Quick Links</p>
          <div class="flex flex-col items-start mt-5 space-y-2">
            <NuxtLink
              to="/package/category/Maasai-Mara-Packages"
              class="transition-colors text-white duration-300 hover:underline"
            >
              Kenya Safari Packages
            </NuxtLink>
            <NuxtLink
              to="/package/category/Maasai-Mara-Packages"
              class="transition-colors text-white duration-300 hover:underline"
            >
              Maasai Mara Packages
            </NuxtLink>

            <NuxtLink
              to="/package/category"
              class="transition-colors text-white duration-300 hover:underline"
            >
              Amboseli National Park Packages
            </NuxtLink>
            <NuxtLink
              to="/attractions"
              class="transition-colors text-white duration-300 hover:underline"
            >
              Attractions
            </NuxtLink>
            <NuxtLink
              to="/blogs"
              class="transition-colors text-white duration-300 hover:underline"
            >
              Travel Posts
            </NuxtLink>
          </div>
        </div>

        <div>
          <h1 class="text-xl font-semibold text-white">Get to know us</h1>
          <div class="flex flex-col items-start mt-5 space-y-2">
            <NuxtLink
              to="/aboutus"
              class="transition-colors text-white duration-300 hover:underline"
            >
              About us
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="transition-colors text-white duration-300 hover:underline"
            >
              Contact us
            </NuxtLink>
          </div>
        </div>

        <div>
          <h1 class="text-xl font-semibold text-white">Connect with us</h1>
          <div class="flex items-center space-x-5 text-white">
            <i
              class="fa-brands fa-facebook text-xl hover:text-pr transition"
            ></i>
            <i
              class="fa-brands fa-instagram text-xl hover:text-pr transition"
            ></i>
            <i
              class="fa-brands fa-twitter text-xl hover:text-pr transition"
            ></i>
            <i
              class="fa-brands fa-linkedin text-xl hover:text-pr transition"
            ></i>
          </div>
          <div class="flex flex-col items-start mt-5 space-y-2">
            <a
              href="tel:+254705769896"
              class="text-white transition-colors duration-300 hover:underline"
            >
              +254 756 892 686
            </a>
            <a
              href="mailto:info@malasoafricasafaris.com"
              class="text-white transition-colors duration-300 hover:underline"
            >
              info@malasoafricasafaris.com
            </a>
          </div>
        </div>
      </div>

      <div
        class="flex text-center flex-col items-center justify-center sm:flex-row"
      >
        <p class="mt-4 text-sm sm:mt-0 text-white">
          © Copyright {{ yr }}.
          <a class="underline text-white" href="/" target="blank">
            Malaso Africa Safaris
          </a>
          All Rights Reserved.
        </p>
      </div>

      <!-- <p class="mt-4 text-sm sm:mt-0 text-white">
          A craft of
          <a class="underline text-white font-black" href="https://www.jamesmukumu.co.ke" target="blank">
            JamesMukumu
          </a>
          
        </p> -->
    </div>
  </footer>
</template>

<script setup>
let yr = new Date().getFullYear();
let email = ref("");
let toast = useToast();
async function SaveEmail() {
  if (email.value == "" || !email.value) {
    toast.add({
      title: "Email Address must be given",
      description: "Please Provide a valid email address",
      color: "error",
    });
    return;
  }
  try {
    let resp = await $fetch("/api/newsletter", {
      body: {
        email: email.value,
      },
      method: "POST",
    });
    toast.add({
      title: "Success",
      description: "Added to newsletters successfully",
    });
  } catch (err) {
    toast.add({
      title: "Error",
      description: "Something Went Wrong",
      color: "error",
    });
  }
}
</script>
