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
        <ButtonComponent
          v-if="publi.citation"
          text="Cite"
          :onclick="
            () => {
              showModal = true;
            }
          "
        />
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

  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>Cite this publication</h3>
      </template>
      <template #body>
        <pre class="code">{{ publi.citation }}</pre>
      </template>
      <template #footer>
        <div class="modal-buttons">
          <ButtonComponent
            :onclick="() => copyToClipboard(publi.citation)"
            text="Copy"
          >
            <component :is="ClipboardIcon"></component>
          </ButtonComponent>
        </div>
      </template>
    </modal>
  </Teleport>
</template>

<script setup>
import ButtonComponent from "./ButtonComponent.vue";
import Modal from "./Modal.vue";
import { ref } from "vue";
import ClipboardIcon from "@/assets/icons/ClipboardIcon.vue";

const props = defineProps({
  publi: {
    type: Object,
    default(rawProps) {
      return {};
    },
  },
});

console.log(props.publi.citation);

const showModal = ref(false);

function openUrl(link) {
  window.open(link, "_blank");
}

function toggleAbstract() {
  const elmt = document.getElementById(`publi-${props.publi.id}`);
  elmt.classList.contains("ellipsis")
    ? elmt.classList.remove("ellipsis")
    : elmt.classList.add("ellipsis");
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}
</script>
