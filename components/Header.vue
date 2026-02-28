<template>
  <header class="w-full sticky top-0 left-0 z-50 bg-white shadow-md">
    <div class="bg-[#bf4226] text-white py-2 border-b border-[#bf4226]">
      <div
        class="container mx-auto px-4 flex justify-between items-center text-sm"
      >
        <div class="flex items-center space-x-6">
          <div class="flex items-center space-x-2">
            <i class="fa-solid fa-phone text-lg"></i>
            <span>+254 706 526 681</span>
          </div>
          <div class="hidden md:flex items-center space-x-2">
            <i class="fa-regular fa-envelope text-lg"></i>
            <a href="mailto:info@pjsafaris.com" class="text-white"
              >info@pjsafaris.com</a
            >
          </div>
        </div>

        <div class="flex items-center space-x-5 text-white">
          <i
            class="fa-brands fa-facebook text-xl cursor-pointer transition"
          ></i>
          <i
            class="fa-brands fa-instagram text-xl cursor-pointer transition"
          ></i>
          <i class="fa-brands fa-twitter text-xl cursor-pointer transition"></i>
          <i
            class="fa-brands fa-linkedin text-xl cursor-pointer transition"
          ></i>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-6 py-4 flex items-center justify-between">
      <a href="/">
        <img
          src="https://res.cloudinary.com/dasrniwpk/image/upload/v1763984726/adventures/hpywfcpb3qa60jynzngm.png"
          alt="Logo"
          class="h-12 w-auto object-contain"
        />
      </a>

      <nav class="hidden lg:flex items-center gap-12 text-base font-medium">
        <a href="/" class="text-black hover:text-pr transition"> Home </a>
        <a href="/destinations" class="text-black hover:text-pr transition">
          Destinations
        </a>
        <a
          href="/adventure/category"
          class="text-black hover:text-pr transition"
        >
          Adventures
        </a>

        <div class="relative">
          <a
            href="/package/category"
            class="flex items-center text-black hover:text-pr transition"
          >
            Safaris
          </a>
        </div>

        <div class="relative">
          <a
            href="/hotels"
            class="flex items-center text-black hover:text-pr transition"
          >
            Hotels
          </a>
        </div>

        <a href="/about/us" class="text-black hover:text-pr transition">
          About Us
        </a>
      </nav>

      <button class="lg:hidden text-black text-3xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </button>
    </div>
  </header>
</template>

<script styled></script>
