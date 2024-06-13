// stores/auth.ts
import { defineStore } from "pinia";

export const useTemperatureAndHumidity = defineStore(
  "TemperatureAndHumidity",
  () => {
    const supabase = useSupabaseClient();
    const temperatureAndHumidity = ref([]);
    const temperatureAndHumidity_error = ref(null);
    const loading = ref(true);
    let channel = null;

    const getData = async () => {
      loading.value = false;
      try {
        const { data: TemperatureAndHumidity, error } = await supabase
          .from("TemperatureAndHumidity")
          .select()
          .order("created_at", { ascending: false });
        if (error) {
          temperatureAndHumidity_error.value = error.message;
          throw error;
        }
        temperatureAndHumidity.value = TemperatureAndHumidity;
      } catch (error) {
        temperatureAndHumidity_error.value = error.message;
      } finally {
        loading.value = true;
      }
    };

    getData();

    const subscribeToChanges = () => {
      if (channel) {
        return;
      }
      channel = supabase
        .channel("custom-all-channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "TemperatureAndHumidity" },
          async () => {
            await getData();
            console.log("TemperatureAndHumidity change");
          }
        )
        .subscribe();
    };

    const unsubscribeFromChanges = () => {
      if (channel) {
        channel.unsubscribe();
        channel = null;
      }
    };

    return {
      getData,
      temperatureAndHumidity,
      temperatureAndHumidity_error,
      loading,
      subscribeToChanges,
      unsubscribeFromChanges,
    };
  }
);
