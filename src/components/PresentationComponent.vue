<template>
  <div class="talk-item">
    <div class="title-with-buttons">
      <h2>{{ talk.title }}</h2>
      <div class="talk-links">
        <ButtonComponent
          v-if="talk.file"
          text="Beamer"
          :onclick="() => openUrl(talk.file)"
        />
      </div>
    </div>
    <div class="text-container">
      <p v-if="talk.conference">{{ talk.conference }}</p>
    </div>
  </div>
</template>

<script setup>
import ButtonComponent from "./ButtonComponent.vue";

const props = defineProps({
  talk: {
    type: Object,
    default(rawProps) {
      return {};
    },
  },
});

function openUrl(link) {
  window.open(link, "_blank");
}
</script>
