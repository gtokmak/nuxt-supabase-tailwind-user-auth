// stores/auth.ts
import { defineStore } from "pinia";



export const useAuthStore = defineStore("auth", ()=>{
    const supabase = useSupabaseClient();
    const user = ref(null)
    const user_error = ref(null)
    const loading = ref(true)
 
  
    const signUp = async(email, password)=> {
      try {
        loading.value = false;
        user_error.value = null;
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
          user_error.value = error.message;
          throw error;
        }
      } finally {
        loading.value = true;
      }
    }

    const signIn = async(email, password)=> {
      try {
        console.log("signIn");
        loading.value = false;
        user_error.value = null;
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        if (error) {
          user_error.value = error.message;
          throw error;
        }
        user.value = data.user;
        
      }catch (error){
        throw error;
      } finally {
        loading.value = true;
      }
    }

    const signOut = async()=> {
      try {
        loading.value = false;
        user_error.value = null;
        const { error } = await supabase.auth.signOut();
        if (error) {
          user_error.value = error.message;
          throw error;
        }
        user.value = null;
      } finally {
        loading.value = true;
      }
    }

    const fetchUser = async()=> {
      try {
        loading.value = false;
        user_error.value = null;
        const user = supabase.auth.user();
        if (!user) {
          user_error.value = "No user found";
        }
        user.value = user;
      } finally {
        loading.value = true;
      }
    }

    return {
      user,
      user_error,
      loading,
      signIn,
      signUp,
      signOut,
      fetchUser,



    }
});
