<template>
 <div class="w-full mx-auto bg-white rounded-xl shadow-md p-6 md:p-10">

      <h2 class="text-2xl font-semibold text-center mb-8">
        Book Now
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-5">

        <!-- FIRST + LAST -->
        <div class="flex flex-col md:flex-row gap-4">
          <div class="w-full">
            <input
              v-model="form.firstName"
              placeholder="First Name"
              class="w-full border rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <p v-if="errors.firstName" class="text-red-500 text-xs mt-1">
              {{ errors.firstName }}
            </p>
          </div>

          <div class="w-full">
            <input
              v-model="form.lastName"
              placeholder="Last Name"
              class="w-full border rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <p v-if="errors.lastName" class="text-red-500 text-xs mt-1">
              {{ errors.lastName }}
            </p>
          </div>
        </div>

        <!-- EMAIL + PHONE -->
        <div class="flex flex-col md:flex-row gap-4">
          <div class="w-full">
            <input
              v-model="form.email"
              type="email"
              placeholder="Email Address"
              class="w-full border rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <p v-if="errors.email" class="text-red-500 text-xs mt-1">
              {{ errors.email }}
            </p>
          </div>

          <div class="w-full">
            <input
              v-model="form.phone"
              placeholder="Phone"
              class="w-full border rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <p v-if="errors.phone" class="text-red-500 text-xs mt-1">
              {{ errors.phone }}
            </p>
          </div>
        </div>

        <!-- CHECKIN + CHECKOUT -->
        <div class="flex flex-col md:flex-row gap-4">
          <div class="w-full">
            <label for="check-in" class="block text-xs mb-1 text-gray-600">Check In</label>
            <input
            id="check-in"
              v-model="form.checkIn"
              type="date"
              :min="today"
              class="w-full border rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div class="w-full">
            <label for="check-out" class="block text-xs mb-1 text-gray-600">Check Out</label>
            <input
            id="check-out"
              v-model="form.checkOut"
              type="date"
              :min="today"
              class="w-full border rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <!-- ADULTS + CHILDREN -->
        <div class="flex flex-col md:flex-row gap-4">
          <input
            v-model="form.adults"
            type="number"
            placeholder="Adults"
            class="w-full border rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />

          <input
            v-model="form.children"
            type="number"
            placeholder="Children"
            class="w-full border rounded-md px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <!-- NATIONALITY -->
        <div>
                    <label for="nationality" class="block text-sm font-medium text-gray-700 mb-1">
    Citizenship
  </label>
          <select
          id="nationality"
            v-model="form.Nationality"
            class="w-full border rounded-md px-3 py-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Citizenship</option>
            <option value="Kenyan">Kenyan Resident</option>
            <option value="East African Resident">East African Resident</option>
            <option value="Non Resident">Non Resident</option>
          </select>

          <p v-if="errors.Nationality" class="text-red-500 text-xs mt-1">
            {{ errors.Nationality }}
          </p>
        </div>

        <!-- MESSAGE -->
        <div>
          <textarea
          
            v-model="form.message"
            rows="4"
            placeholder="Your Message"
            class="w-full border rounded-md px-3 py-2.5 text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <p v-if="errors.message" class="text-red-500 text-xs mt-1">
            {{ errors.message }}
          </p>
        </div>

        <!-- SUBMIT -->
        <div class="pt-2">
          <button
            type="submit"
            :disabled="save"
            class="w-full md:w-auto bg-pr hover:bg-pr cursor-pointer text-white text-sm font-medium px-8 py-2.5 rounded-md transition disabled:opacity-50"
          >
            {{ save ? 'Booking...' : 'Submit' }}
          </button>
        </div>

      </form>
    </div>




</template>





<script setup>
const save = ref(false)
let props = defineProps({
message:{
type:String,
required:true
}
})


const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  checkIn: '',
  checkOut: '',
  adults: '',
  children: '',
  Nationality: '',
  message:  props.message
})

const errors = reactive({})

/* -----------------------
   Validation
----------------------- */
function validate() {
  errors.firstName = form.firstName ? '' : 'First name is required'
  errors.lastName = form.lastName ? '' : 'Last name is required'
  errors.email =
    form.email && form.email.includes('@')
      ? ''
      : 'Valid email is required'
  errors.phone = form.phone ? '' : 'Phone number is required'
  errors.Nationality = form.Nationality ? '' : 'Nationality is required'
  errors.message = form.message ? '' : 'Message is required'

  return !Object.values(errors).some(e => e)
}


async function handleSubmit() {
  if (!validate()) return

  save.value = true

  const payload = {
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    phone: form.phone,
    Nationality: form.Nationality,
    message: form.message,
    AdultsCount:form.adults,
    KidsAges:form.children,
    StartStayDate:form.checkIn,
    EndStayDate:form.checkOut

  }
let toast = useToast()
  try {
    const resp = await useFetch('/api/enquiry', {
      method: 'POST',
      body: payload
    })
console.log(resp)
toast.add({
title:"Enquriy Added",
description:"Enquiry Received Successfully"
})
  } catch (err) {
    console.error(err)
    toast.add({
title:"Failed",
description:"Something Went Wrong",
color:"error"
})
  }

  save.value = false
}


</script>