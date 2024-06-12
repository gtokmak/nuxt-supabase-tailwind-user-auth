<template>
  <div>
    <h2 class="text-2xl font-bold my-4">Dashboard</h2>
    <div class="overflow-auto max-h-[500px]">
      <table class="min-w-full  border-collapse border border-green-600 my-5">
        <thead class="sticky top-0 bg-gray-500 ">
          <tr>
            <th class="border border-gray-300 px-4 py-2">Tarih</th>
            <th class="border border-gray-300 px-4 py-2">Sıcaklık</th>
            <th class="border border-gray-300 px-4 py-2">Nem</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sicaklikNem" :key="item.id" class="border-t">
            <td class="border border-gray-300 px-4 py-2">{{ formatDate(item.created_at) }}</td>
            <td 
              :class="[
                'border border-gray-300 px-4 py-2',
                item.temperature > 30 ? 'bg-red-500 text-white' :
                item.temperature > 25 ? 'bg-yellow-500 text-white' : 
                'bg-blue-200'
              ]">
              {{ item.temperature }}
            </td>
            <td 
              :class="[
                'border border-gray-300 px-4 py-2',
                item.humidity > 70 ? 'bg-green-500 text-white' :
                'bg-green-200'
              ]">
              {{ item.humidity }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>

const sicaklikNem = ref([])

const supabase = useSupabaseClient();

onMounted(async () => {
  await getData()
  TemperatureAndHumidityChanges.subscribe()
})

onUnmounted(() => {
  TemperatureAndHumidityChanges.unsubscribe()
})

const getData = async () => {
  const { data: TemperatureAndHumidity, error } = await supabase
    .from('TemperatureAndHumidity')
    .select()
    .order('created_at', { ascending: false });
  if (!error) {
    sicaklikNem.value = TemperatureAndHumidity
  }
}

const TemperatureAndHumidityChanges = supabase.channel('custom-all-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'TemperatureAndHumidity' },
    async (payload) => {
      await getData()
    }
  )

  const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

</script>

<style scoped>
table {
  width: 100%;
}

th, td {
  text-align: left;
}

thead th {
  position: sticky;
  top: 0;
}

tbody tr:nth-child(odd) {
  background-color: #f9fafb;
}

tbody tr:nth-child(even) {
  background-color: #f1f5f9;
}
</style>
