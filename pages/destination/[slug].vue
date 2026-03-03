<template>
<div>
<Header/>



</div>


</template>




<script setup>
let route = useRoute()
let slug = route.params.slug
let {data,pending,error} = await useFetch("/api/destination",{
query:{slug}
})
console.log(data.value)

</script>