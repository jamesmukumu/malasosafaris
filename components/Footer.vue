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
            />

            <button
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
          <h1 class="font-semibold text-xl text-white">Destinations</h1>
          <div class="flex flex-col items-start mt-5 space-y-2">
            <a
              href="/destination/Tsavo-West"
              class="transition-colors duration-300 text-white hover:underline"
            >
              Tsavo West
            </a>
            <a
              href="/destination/Lake-Naivasha"
              class="transition-colors duration-300 text-white hover:underline"
            >
              Naivasha
            </a>
            <a
              href="/destination/Maasai-Mara"
              class="transition-colors duration-300 text-white hover:underline"
            >
              Maasai Mara
            </a>
            <a
              href="/destination/Amboseli"
              class="transition-colors duration-300 text-white hover:underline"
            >
              Amboseli
            </a>

            <a
              href="/destination/Samburu"
              class="transition-colors duration-300 text-white hover:underline"
            >
              Samburu
            </a>
          </div>
        </div>

        <div>
          <p class="font-semibold text-xl text-white">Quick Links</p>
          <div class="flex flex-col items-start mt-5 space-y-2">
            <a
              target="_blank"
              href="/package/category/Maasai-Mara-Packages"
              class="transition-colors text-white duration-300 hover:underline"
            >
              Kenya Safari Packages
            </a>
            <a
              target="_blank"
              href="/package/category/Maasai-Mara-Packages"
              class="transition-colors text-white duration-300 hover:underline"
            >
              Maasai Mara Packages
            </a>

            <a
              target="_blank"
              href="/package/category"
              class="transition-colors text-white duration-300 hover:underline"
            >
              Amboseli National Park Packages
            </a>
            <a
              target="_blank"
              href="/attractions"
              class="transition-colors text-white duration-300 hover:underline"
            >
              Attractions
            </a>
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
            <a
              target="_blank"
              href="/about/us"
              class="transition-colors text-white duration-300 hover:underline"
            >
              About us
            </a>
            <a
              target="_blank"
              href="/contact"
              class="transition-colors text-white duration-300 hover:underline"
            >
              Contact us
            </a>

            <a
              target="_blank"
              href=""
              class="transition-colors text-white duration-300 hover:underline"
            >
              Careers
            </a>
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
              +254 759 857 032
            </a>
            <a
              href="mailto:info@pjsafaris.site"
              class="text-white transition-colors duration-300 hover:underline"
            >
              info@pjsafaris.site
            </a>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center justify-between sm:flex-row">
        <a href="/">
          <img
            class="w-auto h-7"
            src="https://res.cloudinary.com/dasrniwpk/image/upload/v1763984726/adventures/hpywfcpb3qa60jynzngm.png"
            alt="logo"
          />
        </a>
        <p class="mt-4 text-sm sm:mt-0 text-white">
          © Copyright {{ yr }}.
          <a class="underline text-white" href="/" target="blank">
            PJ Safari's
          </a>
          All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
let yr = new Date().getFullYear();
</script>
