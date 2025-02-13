<template>
  <div class="course-item">
    <div class="title-with-buttons">
      <h2>{{ publi.title }}</h2>
      <div class="course-links">
        <ButtonComponent
          v-if="publi.file"
          text="PDF"
          :onclick="() => openUrl(publi.file)"
        />
        <ButtonComponent v-if="publi.citation" text="Cite" />
        <ButtonComponent
          v-if="publi.abstract"
          text="Abstract"
          :onclick="() => toggleAbstract()"
        />
      </div>
    </div>
    <div class="text-container">
      <p
        :id="`publi-${publi.id}`"
        class="course-abstract ellipsis"
        v-if="publi.abstract"
      >
        {{ publi.abstract }}
      </p>
    </div>
    <div class="course-meta">
      <span>{{ publi.authors }}</span>
    </div>
  </div>
</template>

<script setup>
import ButtonComponent from "./ButtonComponent.vue";

const props = defineProps({
  publi: {
    type: Object,
    default(rawProps) {
      return {};
    },
  },
});

function openUrl(link) {
  window.open(link, "_blank");
}

function toggleAbstract() {
  const elmt = document.getElementById(`publi-${props.publi.id}`);
  elmt.classList.contains("ellipsis")
    ? elmt.classList.remove("ellipsis")
    : elmt.classList.add("ellipsis");
}
</script>
