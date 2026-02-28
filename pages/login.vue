<template>
    <Header/>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    
    <div class="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
      
      <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        Welcome Back
      </h1>
       <div class="m-2" v-if="errorMessage.errorPresent">
          <UAlert title="Error" close :description="errorMessage.errorMsg" color="error" />

       </div>
      <form class="space-y-5">

       
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Email or Phone Number
          </label>
          <input
            type="text"
            placeholder="Enter your email or phone number"
            v-model="formData.email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-transparent transition"
          />
        </div>

     
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            v-model="formData.pass"
            placeholder="Enter your password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-transparent transition"
          />
        </div>

      
<div class="w-full flex justify-center">
<UButton @click="submissionHandler" :loading="loading">Button</UButton>
</div>
      </form>

    </div>

  </div>
</template>



<script setup>
let router = useRouter()
let loading = ref(false)
let errorMessage = ref({
errorPresent:false,
errorMsg:""
})
var formData = reactive({
email:"",
pass:""
})

let submissionHandler = async()=>{
loading.value = true
  try{
let payload = {
"credential":formData.email,
"password":formData.pass
}
var resp = await $fetch("/api/login",{
body:payload,
method:"POST"
})
if(resp.message != "Success Login"){

loading.value = false
errorMessage.value.errorMsg = resp.message
errorMessage.value.errorPresent = true
}else{
router.push("/")
}
}catch(err){
console.log(err)
}

}


</script>