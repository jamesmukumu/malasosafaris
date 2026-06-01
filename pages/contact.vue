<template>
  <div class="w-full overflow-x-hidden">
    <Header />

    <!-- Hero Text -->
    <div class="bg-white py-16 px-6 md:px-12 lg:px-24 text-center">
      <h1 class="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
        Need to contact us?
      </h1>
      <p class="mt-4 text-lg md:text-xl text-gray-600">
        Use one of the options below. Our team is always happy to help.
      </p>
    </div>

    <!-- Main Section -->
    <div class="max-w-6xl mx-auto px-6 md:px-12 lg:px-0 py-12">
      <div class="flex flex-col lg:flex-row items-start gap-12">

        <!-- Form -->
        <div class="flex-1 w-full">
          <BookingForm message="Hello Contact us" />
        </div>

        <!-- Contact Info -->
        <div class="flex-1 w-full">
          <h2 class="text-3xl font-bold mb-6">
            Our Contacts
          </h2>

          <ul class="space-y-4 text-gray-700 text-lg">
            <li>
              <strong>Tel No:</strong> 
+254 756 892 686
            </li>
            <li>
              <strong>Mobile:</strong> 
+254 756 892 686
            </li>
         
            <li>
              <strong>Hours:</strong> Mon–Sun: 24 Hours
            </li>
          </ul>

          <h2 class="text-3xl font-bold mt-10 mb-6">
            Engage Us
          </h2>

          <ul class="space-y-4 text-gray-700 text-lg">
            <li>
              <strong>Email:</strong>
              <a href="mailto:info@malasosafaris..com" class="text-blue-600 hover:underline ml-2">
                info@malasosafaris.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Locate Us -->
    <h1 class="text-center text-4xl md:text-5xl font-extrabold my-8">
      Locate Us
    </h1>

    <!-- Map -->
    <div class="h-[80vh] w-full">
      <LMap
        ref="map"
        :zoom="8"
        :center="[-0.2869673502170328,36.06714631178425]"
        :use-global-leaflet="false"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&amp;copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
          layer-type="base"
          name="OpenStreetMap"
        />

        <LCircle
          :lat-lng="[-0.2869673502170328,36.06714631178425]"
          :radius="4500"
          :color="'red'"
        />
      </LMap>
    </div>
    <Footer/>
  </div>
</template>