<template>
  <main
    class="min-h-screen w-full bg-zinc-900 flex items-center justify-center flex-col gap-16 px-5 py-10"
  >
    <div
      class="relative w-full flex flex-col gap-10 items-center justify-center"
    >
      <h2 class="font-semibold text-white text-xl">Finder.ai</h2>
      <div
        class="relative z-10 w-full max-w-screen-lg flex items-center justify-center gap-5 flex-col mt-10"
      >
        <h1
          class="text-5xl md:text-6xl text-center font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text"
        >
          Find the Perfect Spot, Instantly
        </h1>
        <p class="text-lg md:text-xl text-gray-300">
          Powered by AI. Just tell us what you're craving — we'll handle the
          rest.
        </p>
      </div>

      <div class="relative z-10 w-full max-w-screen-md">
        <p class="font-semibold my-3">What are we searching today?</p>
        <form @submit.prevent="handleSubmit" class="relative flex gap-3 w-full">
          <span
            class="absolute top-1/2 left-0 -translate-y-1/2 translate-x-1/2"
          >
            <LucideSparkles class="text-yellow-400" />
          </span>
          <input
            v-model.trim="message"
            type="text"
            placeholder="Cheap ramen near New York that's open now."
            class="pl-12 pr-8 py-3 bg-zinc-800 text-white placeholder:text-gray-500 border border-purple-700 flex-1 rounded-sm outline-none"
          />
          <button
            type="submit"
            class="hidden sm:block py-3 px-8 bg-white font-semibold text-black rounded-sm"
          >
            Search
          </button>
        </form>
      </div>
      <!-- Decorative -->
      <div
        class="absolute left-0 top-0 z-0 aspect-video w-[500px] -rotate-45 rounded-full bg-blue-600/20 blur-[80px] will-change-[filter]"
      />
      <div
        class="absolute bottom-0 right-0 z-0 aspect-video w-[500px] rounded-full bg-purple-600/20 blur-[80px] will-change-[filter]"
      />
    </div>
    <div class="relative z-10 flex-1 w-full md:p-5 max-w-screen-xl">
      <p class="font-bold text-gray-300 text-lg">Results</p>
      <p
        v-if="searchResults.length === 0 && !isLoading"
        class="m-5 pl-5 border-l-2 border-l-purple-600"
      >
        No results found. Let us now what you want.
      </p>
      <div
        v-else-if="isLoading"
        class="flex items-center flex-col gap-5 justify-center py-10"
      >
        <div class="flex items-center justify-center">
          <div
            class="animate-spin inline-block w-12 h-12 border-4 border-current border-t-transparent text-purple-600 rounded-full"
            role="status"
            aria-label="loading"
          >
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <p>Loading...</p>
      </div>
      <ul
        v-else
        class="m-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <li
          v-for="result in searchResults"
          :key="result.fsq_id"
          class="border flex flex-col text-sm font-semibold gap-3 border-zinc-800 rounded-sm bg-gradient-to-br from-blue-900/10 to-purple-950/10"
        >
          <h3 class="text-xl px-5 mt-5 font-semibold text-white">
            {{ result.name }}
          </h3>
          <div class="px-5 gap-2 flex items-center justify-start">
            <LucideMapPinCheckInside class="text-purple-600 h-5" />
            <p class="truncate">{{ result.location || "N/A" }}</p>
          </div>
          <div class="px-5 gap-2 flex items-center justify-start">
            <LucideCalendarClock class="text-purple-600 h-5" />
            <p class="truncate">{{ result.hours || "N/A" }}</p>
          </div>
          <div class="px-5 gap-2 flex items-center justify-start">
            <div class="flex gap-2 flex-1 items-center justify-start">
              <LucideStar class="text-purple-600 h-5" />
              <p class="truncate">{{ result.rating || "N/A" }} / 10</p>
            </div>
            <div class="flex gap-2 flex-1 items-center justify-start">
              <LucideCircleDollarSign class="text-purple-600 h-5" />
              <p class="truncate">{{ result.price || "N/A" }}</p>
            </div>
          </div>
          <hr class="border-zinc-800 my-3" />

          <div class="flex px-5 gap-2 flex-1 items-center justify-start">
            <LucidePhone class="text-purple-600 h-5" />
            <p class="truncate">{{ result.tel || "N/A" }}</p>
          </div>
          <div class="flex px-5 mb-5 gap-2 flex-1 items-center justify-start">
            <LucideLink class="text-purple-600 h-5" />
            <a
              :href="result.website"
              target="_blank"
              class="text-blue-600 truncate"
            >
              {{ result.website || "N/A" }}
            </a>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>

<script lang="ts" setup>
import type { SearchResult } from "~/types/SearchResult";

const message = ref("");
const searchResults = ref<SearchResult[]>([]);
const config = useRuntimeConfig();
const isLoading = ref(false);
const loadingTimeout = ref();

const handleSubmit = async () => {
  isLoading.value = true;
  if (message.value === "") {
    return;
  }

  try {
    const response = await $fetch<SearchResult[]>(
      `${config.public.apiBaseUrl}/execute`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          message: message.value,
        }),
      }
    );

    searchResults.value = response;
  } catch (error) {
    console.log(error);
  }

  message.value = "";
  loadingTimeout.value = setTimeout(() => {
    isLoading.value = false;
  }, 1000);
};
onUnmounted(() => {
  if (loadingTimeout.value) {
    clearTimeout(loadingTimeout.value);
  }
});
</script>
