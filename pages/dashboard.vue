<template>
  <div>
    <h2 class="text-2xl font-bold my-4">Gösterge Paneli</h2>
    <highchart :options="chartOptions" />

    <div class="overflow-auto max-h-[500px]">
      <table v-if="tempAndHumdStore.loading" class="min-w-full border-collapse border border-green-600 my-5">
        <thead class="sticky top-0 bg-gray-500">
          <tr>
            <th class="border border-gray-300 px-4 py-2">Tarih</th>
            <th class="border border-gray-300 px-4 py-2">Sıcaklık</th>
            <th class="border border-gray-300 px-4 py-2">Nem</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tempAndHumdStore.temperatureAndHumidity" :key="item.id" class="border-t">
            <td class="border border-gray-300 px-4 py-2">{{ formatDate(item.created_at) }}</td>
            <td :class="[
              'border border-gray-300 px-4 py-2',
              item.temperature > 26 ? 'bg-red-500 text-white' :
                item.temperature > 20 ? 'bg-yellow-500 text-white' :
                  'bg-blue-200'
            ]">
              {{ item.temperature }}
            </td>
            <td :class="[
              'border border-gray-300 px-4 py-2',
              item.humidity > 45 ? 'bg-green-500 text-white' :
                'bg-green-200'
            ]">
              {{ item.humidity }}
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="flex justify-center items-center">
        <MyLoader />
        <p class="ml-4">Veriler yükleniyor...</p>
      </div>
      <p v-if="tempAndHumdStore.temperatureAndHumidity_error" class="text-red-500 mt-4">
        Hata: {{ tempAndHumdStore.temperatureAndHumidity_error }}
      </p>
    </div>
  </div>
</template>

<script setup>

const chartOptions = ref({});

// Store
const tempAndHumdStore = useTemperatureAndHumidity();

onMounted(() => {
  tempAndHumdStore.subscribeToChanges();
  console.log(tempAndHumdStore.temperatureAndHumidity?.map(item => item.temperature));
});

onUnmounted(() => {
  tempAndHumdStore.unsubscribeFromChanges();
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const updateChartOptions = () => {
  const sortedData = tempAndHumdStore.temperatureAndHumidity?.slice().slice(0, 30).reverse();

  chartOptions.value = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Sıcaklık ve Nem Değişimleri'
    },
    xAxis: {
      categories: sortedData?.map(item => formatDate(item.created_at))
    },
    yAxis: {
      title: {
        text: 'Değer'
      }
    },
    series: [
      {
        name: 'Sıcaklık',
        data: sortedData?.map(item => parseFloat(item.temperature))
      },
      {
        name: 'Nem',
        data: sortedData?.map(item => parseFloat(item.humidity))
      }
    ]
  };
};

// Ensure chart options are updated whenever data changes
watch(
  () => tempAndHumdStore.temperatureAndHumidity,
  () => updateChartOptions(),
  { immediate: true }
);

</script>

<style scoped>
table {
  width: 100%;
}

th,
td {
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
